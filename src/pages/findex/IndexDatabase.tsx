import { message } from "antd";
import { Data, IndexedEntry } from "cloudproof_js";
import { Button } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { addToIndex } from "../../actions/javascript/addToIndex";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { EmployeeTable, IndexedTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const IndexDatabase = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("addToIndex", activeLanguageList);
  // states
  const { findexInstance, indexedEntries, setIndexedEntries } = useFindexStore((state) => state);
  const { clearEmployees } = useCovercryptStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleIndexDatabase = async (): Promise<void> => {
    try {
      if (findexInstance) {
        const indexedEntries: IndexedEntry[] = clearEmployees.map((employee) => ({
          indexedValue: Data.fromNumber(employee.uuid),
          keywords: [
            (employee.first as string).toLowerCase(),
            (employee.last as string).toLowerCase(),
            (employee.email as string).toLowerCase(),
            (employee.country as string).toLowerCase(),
            (employee.salary as string).toString(),
          ],
        }));
        setIndexedEntries(indexedEntries);
        await addToIndex(findexInstance, indexedEntries);
        message.success("Employees table has been indexed.");
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          Populating the index is done using the add API. It takes as argument a list of associations that maps values to sets of keywords.
          Each value passed as input can then be retrieved using any associated keyword.
        </p>
        <p>This API returns the keywords that have been added to the index (meaning that no value where associated to these before).</p>
        <p>In this example we will index employees’ database:</p>
        <EmployeeTable data={clearEmployees} />
        <Button
          disabled={findexInstance == null}
          onClick={findexInstance ? () => handleIndexDatabase() : undefined}
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
          runCode={findexInstance ? handleIndexDatabase : undefined}
          codeOutputList={
            indexedEntries
              ? {
                  java: JSON.stringify(indexedEntries, undefined, 2),
                  javascript: JSON.stringify(indexedEntries, undefined, 2),
                  python: JSON.stringify(indexedEntries, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default IndexDatabase;
