import { message } from "antd";
import { IndexedEntry, Location } from "cloudproof_js";
import { Button, Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { upsertData } from "../../actions/javascript/upsertData";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable, IndexedTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const IndexDatabase = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("upsertData", activeLanguageList);
  // states
  const { findexKey, label, indexedEntries, setIndexedEntries, callbacks } = useFindexStore((state) => state);
  const { clearEmployees } = useCovercryptStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

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
        <h1>{currentItem?.label}</h1>
        <p>
          To perform insertions or updates (a.k.a upserts), supply an array of IndexedEntry. This structure maps an IndexedValue to a list
          of Keywords.
        </p>
        <p>In this example we will index employees’ database:</p>
        <EmployeeTable data={clearEmployees} />
        <Button
          disabled={findexKey == null || label == null || callbacks == null}
          onClick={findexKey && label && callbacks ? () => handleIndexDatabase() : undefined}
          style={{ width: "100%", margin: "20px 0" }}
        >
          Index database
        </Button>
        {indexedEntries && <IndexedTable data={indexedEntries} />}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={findexKey && label && callbacks ? handleIndexDatabase : undefined}
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
