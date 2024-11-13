import { Input, message } from "antd";
import { Button } from "cosmian_ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchWords } from "../../actions/javascript/searchWords";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";
import aes from "js-crypto-aes";

import ContentSkeleton from "../../component/ContentSkeleton";
import { Employee, findexDatabaseEmployee } from "../../utils/covercryptConfig";
const activeLanguageList: Language[] = ["java", "javascript", "python"];

const SearchInDatabase = (): JSX.Element => {
  const [keyWords, setKeyWords] = useState("2422");
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("searchWords", activeLanguageList);
  // states
  const { findexInstance, indexedEntries, resultEmployees, setResultEmployees, encryptedDatabase } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);
  const [decyphered, setDecyphered] = useState<findexDatabaseEmployee[] | undefined>(undefined);
  const handleSearchInDatabase = async (): Promise<void> => {
    try {
      if (findexInstance && keyWords && encryptedDatabase) {
        let keywordsList: string[] = keyWords.replace(/ /g, "").split(",");
        console.log(keywordsList);
        console.log(encryptedDatabase);
        keywordsList = await Promise.all(
          keywordsList.map(async (keyword) =>
            new TextDecoder().decode(
              await aes.encrypt(new TextEncoder().encode(keyword), encryptedDatabase.key, {
                name: "AES-GCM",
                iv: encryptedDatabase.nonce,
                tagLength: 16,
              })
            )
          )
        );
        console.log(keywordsList);

        const res = await searchWords(findexInstance, keywordsList);
        const resEmployees = res.map((result) => encryptedDatabase.table.find((employee) => result === employee.uuid));

        setResultEmployees(resEmployees as Employee[]);
      }
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  const handleDecypher = async (): Promise<void> => {
    if (!encryptedDatabase || !resultEmployees) return;

    const toField = async (field: string): Promise<string> => {
      console.log(field);
      return new TextDecoder().decode(
        await aes.decrypt(new TextEncoder().encode(field), encryptedDatabase.key, {
          name: "AES-GCM",
          iv: encryptedDatabase.nonce,
          tagLength: 16,
        })
      );
    };

    console.log(await toField("HelloStranger"));

    // const resEmployees2 = await Promise.all(
    //   resultEmployees.map(async (employee) => {
    //     if (!employee) return null; // Handle potential undefined employees

    //     return {
    //       uuid: employee.uuid!, // Assert uuid is non-null
    //       first: await toField(employee.first),
    //       last: await toField(employee.last),
    //       email: await toField(employee.email),
    //       country: await toField(employee.country),
    //       salary: await toField(employee.salary),
    //     } as findexDatabaseEmployee; // Explicitly cast to expected type
    //   })
    // );
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>Querying the index is performed using the search function.</p>
        <p>The result of the search is a map of the searched keywords to the set of associated data found during the search.</p>
        <Input defaultValue={keyWords} onChange={(e) => setKeyWords(e.target.value)} />
        <Button onClick={handleSearchInDatabase} disabled={indexedEntries == null} style={{ marginTop: 20, width: "100%" }}>
          Search in database
        </Button>
        {resultEmployees && <EmployeeTable style={{ marginTop: 30 }} data={resultEmployees} />}
        <Button onClick={handleDecypher} disabled={!resultEmployees} style={{ marginTop: 20, width: "100%" }}>
          Decypher serach result
        </Button>
        {decyphered && <EmployeeTable style={{ marginTop: 30 }} data={decyphered} />}
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
