import { Button } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { decryptDataInKms } from "../../actions/javascript/decryptDataInKms";
import Code from "../../component/Code";
import ContentSkuleton from "../../component/ContentSkuleton";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { ClientOne, ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { Employee } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript", "java", "python"];

const DecryptDataPKI = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("decryptDataInKms", activeLanguageList);
  // states
  const { encryptedEmployeesPki, clearEmployeesPki, setClearEmployeesPki, unwrappedUdkUid } = usePkiStore((state) => state);
  const { kmsTwoToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const decryptData = async (): Promise<void> => {
    if (encryptedEmployeesPki && unwrappedUdkUid) {
      const clearEmployees: Employee[] = await Promise.all(
        encryptedEmployeesPki.map(async (row, key): Promise<Employee> => {
          let decryptedMarketing = undefined;
          let decryptedHR = undefined;
          try {
            const marketing = await decryptDataInKms(row.marketing, kmsTwoToken, unwrappedUdkUid);
            decryptedMarketing = JSON.parse(marketing);
          } catch {
            console.error("no access policy for this entry");
          }
          try {
            const hr = await decryptDataInKms(row.hr, kmsTwoToken, unwrappedUdkUid);
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
      setClearEmployeesPki(clearEmployees);
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    }
  };

  if (loadingCode) return <ContentSkuleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          <ClientTwo /> can decrypt the Employee table with his user decryption key, previously encrypted by <ClientOne /> using Covercrypt
          elements.
        </p>
        <Button
          disabled={unwrappedUdkUid == null}
          onClick={unwrappedUdkUid ? decryptData : undefined}
          style={{ width: "100%", margin: "20px 0" }}
        >
          Decrypt database
        </Button>
        {clearEmployeesPki && <EmployeeTable data={clearEmployeesPki} />}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={unwrappedUdkUid ? decryptData : undefined}
          codeOutputList={
            clearEmployeesPki
              ? {
                  javascript: JSON.stringify(clearEmployeesPki, undefined, 2),
                  java: JSON.stringify(clearEmployeesPki, undefined, 2),
                  python: JSON.stringify(clearEmployeesPki, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default DecryptDataPKI;
