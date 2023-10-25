import { message } from "antd";
import { IndexedEntry, Location } from "cloudproof_js";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { upsertData } from "../../actions/javascript/upsertData";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable, IndexedTable } from "../../component/Table";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const IndexDatabase = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("upsertData", activeLanguageList);
  // states
  const findexKey = useBoundStore((state) => state.findexKey);
  const label = useBoundStore((state) => state.label);
  const clearEmployees = useBoundStore((state) => state.clearEmployees);
  const indexedEntries = useBoundStore((state) => state.indexedEntries);
  const setIndexedEntries = useBoundStore((state) => state.setIndexedEntries);
  const callbacks = useBoundStore((state) => state.callbacks);
  const steps = useBoundStore((state) => state.steps);
  const setSteps = useBoundStore((state) => state.setSteps);
  const navigate = useNavigate();

  const handleIndexDatabase = async (): Promise<void> => {
    try {
      if (findexKey && label && callbacks) {
        const indexedEntries = clearEmployees.map((employee) => ({
          indexedValue: Location.fromNumber(employee.uuid),
          keywords: [
            (employee.first as string).toLowerCase(),
            (employee.last as string).toLowerCase(),
            (employee.email as string).toLowerCase(),
            (employee.country as string).toLowerCase(),
            (employee.salary as string).toString(),
          ],
        }));
        setIndexedEntries(indexedEntries as IndexedEntry[]);
        await upsertData(findexKey, label, indexedEntries, callbacks.fetchEntries, callbacks.upsertEntries, callbacks.insertChains);
        message.success("Employees table has been indexed.");
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>Indexing database</h1>
        <p>
          To perform insertions or updates (a.k.a upserts), supply an array of IndexedEntry. This structure maps an IndexedValue to a list
          of Keywords.
        </p>
        <p>In this example we will index employees’ database:</p>
        <EmployeeTable data={clearEmployees} />
        {indexedEntries && <IndexedTable data={indexedEntries} style={{ marginTop: 40 }} />}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={findexKey && label && callbacks ? () => handleIndexDatabase() : undefined}
          codeOutputList={{
            java: JSON.stringify(indexedEntries, undefined, 2),
            javascript: JSON.stringify(indexedEntries, undefined, 2),
            python: JSON.stringify(indexedEntries, undefined, 2),
            flutter: JSON.stringify(indexedEntries, undefined, 2),
          }}
        />
      </Split.Code>
    </Split>
  );
};

export default IndexDatabase;
