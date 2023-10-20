import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { encryptDataLocally } from "../../actions/javascript/encryptDataLocally";
import { retrieveKeyPair } from "../../actions/javascript/retrieveKeyPair";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable, EncryptedTable } from "../../component/Table";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const EncryptData = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("encryptDataLocally", activeLanguageList);
  // states
  const clearEmployees = useBoundStore((state) => state.clearEmployees);
  const kmsToken = useBoundStore((state) => state.kmsToken);
  const keyPair = useBoundStore((state) => state.keyPair);
  const policy = useBoundStore((state) => state.policy);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const encryptedEmployees = useBoundStore((state) => state.encryptedEmployees);
  const setEncryptedEmployees = useBoundStore((state) => state.setEncryptedEmployees);
  const navigate = useNavigate();

  const handleEncryptEmployees = async (): Promise<void> => {
    try {
      if (policy && kmsToken && keyPair) {
        const { masterPublicKeyBytes } = await retrieveKeyPair(kmsToken, keyPair);
        const encryptedEmployees = await Promise.all(
          clearEmployees.map(async (employee) => {
            const encryptedMarketing = await encryptDataLocally(
              masterPublicKeyBytes,
              policy,
              `department::Marketing && country::${employee.country}`,
              new TextEncoder().encode(
                JSON.stringify({
                  first: employee.first,
                  last: employee.last,
                  country: employee.country,
                })
              )
            );
            const encryptedHr = await encryptDataLocally(
              masterPublicKeyBytes,
              policy,
              `department::HR && country::${employee.country}`,
              new TextEncoder().encode(
                JSON.stringify({
                  email: employee.email,
                  salary: employee.salary,
                })
              )
            );
            return { key: employee.uuid, marketing: encryptedMarketing, hr: encryptedHr };
          })
        );
        setEncryptedEmployees(encryptedEmployees);
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
        <h1>Encrypting data</h1>
        <p>Data is encrypted using the Public Key and an encryption policy that determines the target partitions of the ciphertext.</p>
        <p>
          Anyone who has access to the Public Key can encrypt data, however, only users possessing user keys with the right access policy
          can decrypt the ciphertext.
        </p>
        <p>A Covercrypt ciphertext is the concatenation of a encrypted header and an encrypted content.</p>
        <ul>
          <li>
            The encrypted content is a plaintext symmetrically encrypted using an ephemeral secret key (i.e. a random key generated on the
            fly).
          </li>
          <li>
            The header is the encapsulation of the ephemeral key for a given encryption policy, concatenated with some optional metadata.
            The metadata, if present, is symmetrically encrypted using the same ephemeral key.
          </li>
        </ul>
        <p>
          Header and encrypted content can be generated separately using the various APIs. Check the inline documentation of the various
          languages and the test suites for details.
        </p>
        <EmployeeTable data={clearEmployees} covercrypt />
        {encryptedEmployees && <EncryptedTable data={encryptedEmployees} style={{ marginTop: 30 }} />}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={keyPair ? () => handleEncryptEmployees() : undefined}
          codeOutputList={
            encryptedEmployees
              ? {
                  java: JSON.stringify(encryptedEmployees, undefined, 2),
                  javascript: JSON.stringify(encryptedEmployees, undefined, 2),
                  python: "result",
                  flutter: "result",
                  cpp: "result",
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptData;
