import { Input, message } from "antd";
import { Button, Spinner } from "cosmian_ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchWords } from "../../actions/javascript/searchWords";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore, useFindexStore } from "../../store/store";
import { Employee } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const SearchInDatabase = (): JSX.Element => {
  const [keyWords, setKeyWords] = useState("Susan");
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("searchWords", activeLanguageList);
  // states
  const { findexKey, label, indexedEntries, resultEmployees, setResultEmployees, callbacks } = useFindexStore((state) => state);
  const { clearEmployees } = useCovercryptStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSearchInDatabase = async (): Promise<void> => {
    try {
      if (findexKey && label && callbacks && keyWords) {
        const kewordsList = keyWords.replace(/ /g, "").toLowerCase().split(",");
        const res = await searchWords(findexKey, label, kewordsList, callbacks.fetchEntries, callbacks.fetchChains);
        const resEmployees = res.map((result) => clearEmployees.find((employee) => result.toNumber() === employee.uuid));
        setResultEmployees(resEmployees as Employee[]);
      }
      updateNavigationSteps(steps, setSteps);
      navigate("#");
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
        <p>Querying the index is performed using the search function.</p>
        <Input defaultValue={keyWords} onChange={(e) => setKeyWords(e.target.value)} />
        <Button onClick={handleSearchInDatabase} disabled={indexedEntries == null} style={{ marginTop: 20, width: "100%" }}>
          Search in database
        </Button>
        {resultEmployees && <EmployeeTable style={{ marginTop: 30 }} data={resultEmployees} />}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={indexedEntries ? () => handleSearchInDatabase() : undefined}
          codeOutputList={
            resultEmployees
              ? {
                  java: JSON.stringify(resultEmployees, undefined, 2),
                  javascript: JSON.stringify(resultEmployees, undefined, 2),
                  python: JSON.stringify(resultEmployees, undefined, 2),
                  flutter: JSON.stringify(resultEmployees, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SearchInDatabase;
