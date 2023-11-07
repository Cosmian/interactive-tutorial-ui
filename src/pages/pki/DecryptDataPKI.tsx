import { Button, Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { decryptDataInKms } from "../../actions/javascript/decryptDataInKms";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { ClientOne, ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { Employee } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

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
      const clearMarketing: Employee[] = await Promise.all(
        encryptedEmployeesPki.map(async (row) => {
          try {
            const marketing = await decryptDataInKms(row.marketing, kmsTwoToken, unwrappedUdkUid);
            const decryptedMarketing = JSON.parse(marketing);
            return decryptedMarketing;
          } catch {
            // do nothing
            console.error("no access policy for this entry");
          }
        })
      );
      const clearHR: Employee[] = await Promise.all(
        encryptedEmployeesPki.map(async (row) => {
          try {
            const hr = await decryptDataInKms(row.hr, kmsTwoToken, unwrappedUdkUid);
            const decryptedHr = JSON.parse(hr);
            return decryptedHr;
          } catch {
            // do nothing
            console.error("no access policy for this entry");
          }
        })
      );

      const clearEmployee = clearMarketing.map((row, key) => {
        return {
          uuid: key,
          first: row?.first != null ? row.first : "–",
          last: row?.last != null ? row.last : "–",
          country: row?.country != null ? row.country : "–",
          email: clearHR[key]?.email != null ? clearHR[key].email : "–",
          salary: clearHR[key]?.salary != null ? clearHR[key].salary : "–",
        };
      });

      setClearEmployeesPki(clearEmployee as Employee[]);
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

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
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default DecryptDataPKI;
