import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { decryptDataInKms } from "../../actions/javascript/decryptDataInKms";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { ClientOne, ClientTwo } from "../../component/Tags";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { Employee } from "../../utils/covercryptConfig";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const DecryptDataPKI = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("decryptDataInKms", activeLanguageList);
  // states
  const kmsTwoToken = useBoundStore((state) => state.kmsTwoToken);
  const encryptedEmployeesPki = useBoundStore((state) => state.encryptedEmployeesPki);
  const clearEmployeesPki = useBoundStore((state) => state.clearEmployeesPki);
  const setClearEmployeesPki = useBoundStore((state) => state.setClearEmployeesPki);
  const unwrappedUdkUid = useBoundStore((state) => state.unwrappedUdkUid);
  const setSteps = useBoundStore((state) => state.setSteps);
  const steps = useBoundStore((state) => state.steps);
  const navigate = useNavigate();

  const decryptData = async (): Promise<void> => {
    if (encryptedEmployeesPki && unwrappedUdkUid) {
      const clearMarketing: Employee[] = await Promise.all(
        encryptedEmployeesPki.map(async (row) => {
          try {
            const marketing = await decryptDataInKms(row.marketing, kmsTwoToken, unwrappedUdkUid);
            const decryptedMarketing = JSON.parse(marketing);
            return decryptedMarketing;
          } catch {
            //
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
            //
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
        <h1>Decrypting Employee table</h1>
        <p>
          <ClientTwo /> can decrypt the Employee table with his user decryption key, previously encrypted by <ClientOne /> using Covercrypt
          elements.
        </p>
        {clearEmployeesPki && <EmployeeTable data={clearEmployeesPki} />}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
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
