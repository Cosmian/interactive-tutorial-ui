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
import { Employee, findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
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
  const [resultBytes, setResultBytes] = useState<(findexDatabaseEmployeeBytes | undefined)[] | undefined>(undefined);
  const handleSearchInDatabase = async (): Promise<void> => {
    try {
      if (findexInstance && keyWords && encryptedDatabase) {
        const keywordsList: string[] = keyWords.replace(/ /g, "").split(",");
        const res = await searchWords(findexInstance, keywordsList);
        const resEmployees = res.map((result) => encryptedDatabase.table.find((employee) => result === employee.uuid));

        setResultEmployees(resEmployees as Employee[]);
        const resBytes: (findexDatabaseEmployeeBytes | undefined)[] = res.map((result) =>
          encryptedDatabase.byteTable.find((employee) => result === employee.uuid)
        );
        setResultBytes(resBytes);
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

    const toField = async (field: Uint8Array): Promise<string> => {
      console.log("field is ", field);
      const decryptedField = await aes.decrypt(field, encryptedDatabase.key, {
        name: "AES-CBC",
        iv: encryptedDatabase.nonce,
      });
      return new TextDecoder().decode(decryptedField);
    };

    // console.log(await toField("HelloStranger"));

    setDecyphered(
      await Promise.all(
        resultBytes.map(
          async (employee) =>
            ({
              uuid: employee?.uuid || -1,
              first: employee?.first ? await toField(employee.first) : undefined,
              last: employee?.last ? await toField(employee.last) : undefined,
              country: employee?.country ? await toField(employee.country) : undefined,
              email: employee?.email ? await toField(employee.email) : undefined,
              salary: employee?.salary ? await toField(employee.salary) : undefined,
            } as findexDatabaseEmployee)
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
