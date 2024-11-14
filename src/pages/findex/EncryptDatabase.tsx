import { Button } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";
import { useState } from "react";
import { message } from "antd";
import aes from "js-crypto-aes";
import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const EncryptDatabase = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("addToIndex", activeLanguageList);
  // states
  const { clearDatabase, setEncryptedDb } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const [encEmp, setEncEmp] = useState<findexDatabaseEmployee[]>([]);

  const handleIndexDatabase = async (): Promise<void> => {
    try {
      const key = new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ]);
      const nonce = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

      const toField = async (field?: string | number): Promise<Uint8Array> => {
        return await aes.encrypt(new TextEncoder().encode(field?.toString() ?? ""), key, {
          name: "AES-CBC",
          iv: nonce,
        });
      };

      const byteTable: findexDatabaseEmployeeBytes[] = await Promise.all(
        clearDatabase.map(async (employee) => ({
          ...employee,
          first: await toField(employee?.first),
          last: await toField(employee?.last),
          email: await toField(employee?.email),
          country: await toField(employee?.country),
          salary: await toField(employee?.salary),
        }))
      );
      setEncryptedDb({
        byteTable: byteTable,
        key,
        nonce,
      });
      setEncEmp(
        byteTable.map((employee) => ({
          uuid: employee.uuid,
          first: new TextDecoder().decode(employee?.first),
          last: new TextDecoder().decode(employee?.last),
          email: new TextDecoder().decode(employee?.email),
          country: new TextDecoder().decode(employee?.country),
          salary: new TextDecoder().decode(employee?.salary),
        }))
      );
      message.success("Employees table has been indexed.");
      updateNavigationSteps(steps, setSteps);
      navigate("#");
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
        <p>encrypt the clear employees</p>
        <EmployeeTable data={clearDatabase} />
        <Button onClick={handleIndexDatabase} style={{ width: "100%", margin: "20px 0" }}>
          encrypt
        </Button>
        {encEmp && <EmployeeTable data={encEmp} />}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={handleIndexDatabase}
          //   codeOutputList={
          //     indexedEntries
          //       ? {
          //           java: JSON.stringify(indexedEntries, undefined, 2),
          //           javascript: JSON.stringify(indexedEntries, undefined, 2),
          //           python: JSON.stringify(indexedEntries, undefined, 2),
          //         }
          //       : undefined
          //   }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptDatabase;
