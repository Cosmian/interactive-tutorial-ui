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
import { byteEmployeeToString } from "../../utils/utils";
import { AesGcm } from "cloudproof_js";
import { encryptedEmployeesDatabase, findexClearEmployeesDatabase } from "../../utils/findexConfig";
const activeLanguageList: Language[] = ["java", "javascript", "python"];

const SearchInDatabase = (): JSX.Element => {
  const [keyWords, setKeyWords] = useState("France");
  const [byteResults, setByteResults] = useState<encryptedEmployeesDatabase[] | undefined>(undefined);
  const [decrypted, setDecrypted] = useState<findexClearEmployeesDatabase[] | undefined>(undefined);

  const { loadingCode, codeContent } = useFetchCodeContent("searchWords", activeLanguageList);
  const { findexInstance, indexedEntries, decryptedSearchResults, setDecryptedSearchResults, encryptedDatabase } = useFindexStore(
    (state) => state
  );
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const currentItem = findCurrentNavigationItem(steps);

  const handleSearch = async (): Promise<void> => {
    try {
      if (findexInstance && keyWords && encryptedDatabase) {
        setDecrypted(undefined);
        const keywordsList: string[] = keyWords.toLowerCase().replace(/ /g, "").split(",");
        const res = await searchWords(findexInstance, keywordsList);
        const resEmployees = res
          .map((result) => encryptedDatabase.encryptedBytesDatabase.find((employee) => result === employee.uuid))
          .filter((employee): employee is encryptedEmployeesDatabase => employee !== undefined);
        setByteResults(resEmployees);
        if (resEmployees) setDecryptedSearchResults(resEmployees.map(byteEmployeeToString));
      }
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  const handleDecrypt = async (): Promise<void> => {
    if (!encryptedDatabase || !decryptedSearchResults || !byteResults) return;
    const { Aes256Gcm } = await AesGcm();
    const { key, nonce, authenticatedData } = encryptedDatabase;

    setDecrypted(
      await Promise.all(
        byteResults.map((e) =>
          Object.keys(e)
            .filter((k) => k !== "uuid")
            .reduce((acc, k) => {
              const index = k as keyof Omit<typeof e, "uuid">;
              return {
                ...acc,
                [index]: new TextDecoder().decode(Aes256Gcm.decrypt(e[index], key, nonce, authenticatedData)),
              };
            }, {} as findexClearEmployeesDatabase)
        )
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
        <Button onClick={handleSearch} disabled={indexedEntries == null} style={{ marginTop: 20, width: "100%", marginBottom: 20 }}>
          Search in database
        </Button>
        {decryptedSearchResults && (
          <>
            <EmployeeTable style={{ marginTop: 30 }} data={decryptedSearchResults} />
            <Button onClick={handleDecrypt} disabled={!decryptedSearchResults} style={{ marginTop: 20, marginBottom: 20, width: "100%" }}>
              Decrypt result{decryptedSearchResults.length > 1 && "s"}
            </Button>
            {decrypted && <EmployeeTable data={decrypted} />}
          </>
        )}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={indexedEntries ? () => handleSearch() : undefined}
          codeOutputList={
            decryptedSearchResults
              ? {
                  java: JSON.stringify(decryptedSearchResults, undefined, 2),
                  javascript: JSON.stringify(decryptedSearchResults, undefined, 2),
                  python: JSON.stringify(decryptedSearchResults, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SearchInDatabase;
