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
import aes from "js-crypto-aes";

import ContentSkeleton from "../../component/ContentSkeleton";
import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import { byteEmployeeToString } from "../../utils/utils";
const activeLanguageList: Language[] = ["java", "javascript", "python"];

const SearchInDatabase = (): JSX.Element => {
  const [keyWords, setKeyWords] = useState("Susan");
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
        console.log("res is ", res);
        console.log("encryptedDatabase.byteTable is ", encryptedDatabase.byteTable);
        const resEmployees = res
          .map((result) => encryptedDatabase.byteTable.find((employee) => result === employee.uuid))
          .filter((employee): employee is findexDatabaseEmployeeBytes => employee !== undefined);
        setResultBytes(resEmployees);
        if (!resEmployees) return;
        console.log("resEmployees is ", resEmployees);

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
        resultBytes.map(async (byteEmployee) => {
          const decypheredEmployee: findexDatabaseEmployee = {
            uuid: byteEmployee.uuid,
            country: undefined,
            email: undefined,
            first: undefined,
            last: undefined,
            salary: undefined,
          };
          for (const key of Object.keys(decypheredEmployee)) {
            if (key !== "uuid" && ["first", "last", "country", "email", "salary"].indexOf(key) > -1) {
              // @ts-expect-error typescript compiler does not understand that key is a key of decypheredEmployee and at the same time. Making it understand causes very long boilerplate.
              decypheredEmployee[key as keyof typeof decypheredEmployee] = new TextDecoder().decode(
                await aes.decrypt(
                  // @ts-expect-error same as above, the check is done in the if statement at runtime, so no need to worry.
                  byteEmployee[key as keyof typeof resultBytes],
                  encryptedDatabase.key,
                  {
                    name: "AES-CBC",
                    iv: encryptedDatabase.nonce,
                  }
                )
              );
            }
          }
          return decypheredEmployee;
        })
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
        <EmployeeTable style={{ marginTop: 30 }} data={resultEmployees || []} />
        <Button onClick={handleDecypher} disabled={!resultEmployees} style={{ marginTop: 20, width: "100%" }}>
          Decypher serach result
        </Button>
        <EmployeeTable style={{ marginTop: 30 }} data={decyphered || []} />
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
