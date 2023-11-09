import { message } from "antd";
import { Button, Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { createCovercryptKeyPair } from "../../actions/javascript/createCovercryptKeyPair";
import { createDecryptionKey } from "../../actions/javascript/createDecryptionKey";
import { createPolicy } from "../../actions/javascript/createPolicy";
import { encryptDataInKms } from "../../actions/javascript/encryptDataInKms";
import { wrapKeyInCertificate } from "../../actions/javascript/wrapKeyInCertificate";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable, EncryptedTable } from "../../component/Table";
import { ClientOne, ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore, usePkiStore } from "../../store/store";
import { ACCESS_POLICY, POLICY_AXIS } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const EncryptDataPki = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("encryptDataLocally", activeLanguageList);
  // states
  const { encryptedEmployeesPki, setClientOneUdkUid, setEncryptedEmployeesPki, setWrappedPk2 } = usePkiStore((state) => state);
  const { clearEmployees } = useCovercryptStore((state) => state);
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const clientOneActions = async (): Promise<void> => {
    try {
      if (kmsToken) {
        // generate policy + key pair
        const policy = await createPolicy(POLICY_AXIS);
        const keyPair = await createCovercryptKeyPair(kmsToken, policy);
        // generate decryption key
        const decryptionKey = await createDecryptionKey(kmsToken, keyPair.masterSecretKeyUId, ACCESS_POLICY);
        setClientOneUdkUid(decryptionKey);
        // encrypt table
        const encryptedEmployees = await Promise.all(
          clearEmployees.map(async (employee) => {
            const encryptedMarketing = await encryptDataInKms(
              JSON.stringify({
                first: employee.first,
                last: employee.last,
                country: employee.country,
              }),
              kmsToken,
              `department::Marketing && country::${employee.country}`,
              keyPair.masterPublicKeyUId
            );
            const encryptedHr = await encryptDataInKms(
              JSON.stringify({
                email: employee.email,
                salary: employee.salary,
              }),
              kmsToken,
              `department::HR && country::${employee.country}`,
              keyPair.masterPublicKeyUId
            );
            return { key: employee.uuid, marketing: encryptedMarketing, hr: encryptedHr };
          })
        );
        const { certBytes, privateKeyBytes } = wrapKeyInCertificate();

        setEncryptedEmployeesPki(encryptedEmployees);
        setWrappedPk2({ certBytes, privateKeyBytes });

        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>

        <ul>
          <li>
            <ClientOne /> generating a <b>Covercrypt Policy</b> and a <b>Covercrypt master Key pair</b> <code>sk_1/pk_1</code>
          </li>
          <li>
            <ClientOne /> generating a <b>Covercrypt User Decryption Key</b> <code>sk_a</code> that he wants to share with <ClientTwo />
          </li>
          <li>
            <ClientOne /> encrypt an Employee Table using <b>Covercrypt</b> elements
          </li>
          <li>
            <ClientTwo /> has a key pair <code>sk_2/pk_2</code> and its public key is signed as a <b>certificate</b>
          </li>
        </ul>
        <h3>Clear employee database:</h3>
        <EmployeeTable data={clearEmployees} covercrypt />
        <Button disabled={kmsToken == null} onClick={kmsToken ? clientOneActions : undefined} style={{ width: "100%", margin: "20px 0" }}>
          Encrypt database
        </Button>
        {encryptedEmployeesPki && (
          <>
            <h3 style={{ marginTop: 10 }}>Encrypted employee database:</h3>
            <EncryptedTable data={encryptedEmployeesPki} style={{ marginTop: 10 }} />
          </>
        )}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={kmsToken ? clientOneActions : undefined}
          codeOutputList={
            encryptedEmployeesPki
              ? {
                  java: JSON.stringify(encryptedEmployeesPki, undefined, 2),
                  javascript: JSON.stringify(encryptedEmployeesPki, undefined, 2),
                  python: JSON.stringify(encryptedEmployeesPki, undefined, 2),
                  flutter: JSON.stringify(encryptedEmployeesPki, undefined, 2),
                  cpp: JSON.stringify(encryptedEmployeesPki, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptDataPki;
