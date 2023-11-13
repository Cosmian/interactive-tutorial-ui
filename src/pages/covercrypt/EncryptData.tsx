import { message } from "antd";
import { Button, Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { encryptDataLocally } from "../../actions/javascript/encryptDataLocally";
import { retrieveKeyPair } from "../../actions/javascript/retrieveKeyPair";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable, EncryptedTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const EncryptData = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("encryptDataLocally", activeLanguageList);
  // states

  const { encryptedEmployees, clearEmployees, keyPairUids, policy, setEncryptedEmployees } = useCovercryptStore((state) => state);
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleEncryptEmployees = async (): Promise<void> => {
    try {
      if (policy && kmsToken && keyPairUids) {
        const { masterPublicKeyBytes } = await retrieveKeyPair(kmsToken, keyPairUids);
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
        <h1>{currentItem?.label}</h1>
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
        <Button
          disabled={keyPairUids == null}
          onClick={keyPairUids ? handleEncryptEmployees : undefined}
          style={{ width: "100%", margin: "20px 0" }}
        >
          Encrypt database
        </Button>

        {encryptedEmployees && <EncryptedTable data={encryptedEmployees} />}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={keyPairUids ? handleEncryptEmployees : undefined}
          codeOutputList={
            encryptedEmployees
              ? {
                  java: JSON.stringify(encryptedEmployees, undefined, 2),
                  javascript: JSON.stringify(encryptedEmployees, undefined, 2),
                  python: JSON.stringify(encryptedEmployees, undefined, 2),
                  flutter: JSON.stringify(encryptedEmployees, undefined, 2),
                  cpp: JSON.stringify(encryptedEmployees, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptData;
