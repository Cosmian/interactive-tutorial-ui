import { message } from "antd";
import { Button, Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { decryptDataLocally } from "../../actions/javascript/decryptDataLocally";
import { retrieveDecryptionKey } from "../../actions/javascript/retrieveDecryptionKey";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { Employee } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const DecryptData = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("decryptDataLocally", activeLanguageList);
  // states
  const { encryptedEmployees, decryptionKeyUid, setDecryptedEmployees, keyPairUids, policy, decryptedEmployees } = useCovercryptStore(
    (state) => state
  );
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const currentItem = findCurrentNavigationItem(steps);

  const handleDecryptData = async (): Promise<void> => {
    try {
      if (encryptedEmployees && kmsToken) {
        const retrievedDecryptionKey = await retrieveDecryptionKey(kmsToken, decryptionKeyUid as string);

        const decryptedEmployees: Employee[] = await Promise.all(
          encryptedEmployees.map(async (row, key): Promise<Employee> => {
            let decryptedMarketing = undefined;
            let decryptedHR = undefined;
            try {
              const marketing = await decryptDataLocally(row.marketing, retrievedDecryptionKey.bytes());
              decryptedMarketing = JSON.parse(marketing);
            } catch {
              console.error("no access policy for this entry");
            }
            try {
              const hr = await decryptDataLocally(row.hr, retrievedDecryptionKey.bytes());
              decryptedHR = JSON.parse(hr);
            } catch {
              console.error("no access policy for this entry");
            }
            return {
              uuid: key,
              first: decryptedMarketing?.first != null ? decryptedMarketing.first : undefined,
              last: decryptedMarketing?.last != null ? decryptedMarketing.last : undefined,
              country: decryptedMarketing?.country != null ? decryptedMarketing.country : undefined,
              email: decryptedHR && decryptedHR[key]?.email != null ? decryptedHR[key].email : undefined,
              salary: decryptedHR && decryptedHR[key]?.salary != null ? decryptedHR[key].salary : undefined,
            };
          })
        );
        setDecryptedEmployees(decryptedEmployees);

        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          The User Decryption Key can only decrypt the <code>(country::Germany) && (department::Marketing)</code> axis.
        </p>
        <Button
          disabled={keyPairUids == null || policy == null}
          onClick={keyPairUids && policy ? handleDecryptData : undefined}
          style={{ width: "100%", margin: "20px 0" }}
        >
          Decrypt database
        </Button>
        {decryptedEmployees && <EmployeeTable data={decryptedEmployees} covercrypt />}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={decryptionKeyUid ? handleDecryptData : undefined}
          codeOutputList={
            decryptedEmployees
              ? {
                  java: JSON.stringify(decryptedEmployees, undefined, 2),
                  javascript: JSON.stringify(decryptedEmployees, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default DecryptData;
