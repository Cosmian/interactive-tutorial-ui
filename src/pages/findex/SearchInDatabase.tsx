import { Input, message } from "antd";
import { Button } from "cosmian_ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchWords } from "../../actions/javascript/searchWords";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

import ContentSkeleton from "../../component/ContentSkeleton";
import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import { byteEmployeeToString } from "../../utils/utils";
import { AesGcm } from "cloudproof_js";
const activeLanguageList: Language[] = ["java", "javascript", "python"];

const SearchInDatabase = (): JSX.Element => {
  const [keyWords, setKeyWords] = useState("France");
  const [resultBytes, setResultBytes] = useState<findexDatabaseEmployeeBytes[] | undefined>(undefined);
  const [decyphered, setDecyphered] = useState<findexDatabaseEmployee[] | undefined>(undefined);

  const { loadingCode, codeContent } = useFetchCodeContent("searchWords", activeLanguageList);
  const { findexInstance, indexedEntries, resultEmployees, setResultEmployees, encryptedDatabase } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const currentItem = findCurrentNavigationItem(steps);

  const handleSearchInDatabase = async (): Promise<void> => {
    try {
      if (findexInstance && keyWords && encryptedDatabase) {
        setDecyphered(undefined);
        const keywordsList: string[] = keyWords.toLowerCase().replace(/ /g, "").split(",");
        const res = await searchWords(findexInstance, keywordsList);
        const resEmployees = res
          .map((result) => encryptedDatabase.byteTable.find((employee) => result === employee.uuid))
          .filter((employee): employee is findexDatabaseEmployeeBytes => employee !== undefined);
        setResultBytes(resEmployees);
        if (!resEmployees) return;

        const transformedEmployees = resEmployees.map((employee) => byteEmployeeToString(employee));
        setResultEmployees(transformedEmployees);
      }
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  const handleDecypher = async (): Promise<void> => {
    if (!encryptedDatabase || !resultEmployees || !resultBytes) return;
    const { Aes256Gcm } = await AesGcm();
    const { key, nonce, authenticatedData } = encryptedDatabase;

    setDecyphered(
      await Promise.all(
        resultBytes.map(async (byteEmployee) => ({
          uuid: byteEmployee.uuid,
          country: new TextDecoder().decode(Aes256Gcm.decrypt(byteEmployee?.country ?? "", key, nonce, authenticatedData)),
          email: new TextDecoder().decode(Aes256Gcm.decrypt(byteEmployee?.email ?? "", key, nonce, authenticatedData)),
          first: new TextDecoder().decode(Aes256Gcm.decrypt(byteEmployee?.first ?? "", key, nonce, authenticatedData)),
          last: new TextDecoder().decode(Aes256Gcm.decrypt(byteEmployee?.last ?? "", key, nonce, authenticatedData)),
          salary: new TextDecoder().decode(Aes256Gcm.decrypt(byteEmployee?.salary ?? "", key, nonce, authenticatedData)),
        }))
      )
    );
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>Querying the index is performed using the search function.</p>
        <p>The result of the search is a map of the searched keywords to the set of associated data found during the search.</p>
        <Input defaultValue={keyWords} onChange={(e) => setKeyWords(e.target.value)} />
        <Button
          onClick={handleSearchInDatabase}
          disabled={indexedEntries == null}
          id="searchResultsButton"
          itemID="searchResultsButton"
          className="searchResultsButton"
          style={{ marginTop: 20, width: "100%", marginBottom: 20 }}
        >
          Search in database
        </Button>
        {resultEmployees && (
          <>
            <EmployeeTable style={{ marginTop: 30 }} data={resultEmployees} />
            <Button onClick={handleDecypher} disabled={!resultEmployees} style={{ marginTop: 20, marginBottom: 20, width: "100%" }}>
              Decypher search result{resultEmployees.length > 1 && "s"}
            </Button>
            {decyphered && <EmployeeTable data={decyphered} />}
          </>
        )}
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
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SearchInDatabase;
