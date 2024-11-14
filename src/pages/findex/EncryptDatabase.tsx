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
import { encryptDatabase } from "../../actions/javascript/encryptDatabase";

const activeLanguageList: Language[] = ["javascript"];

const EncryptDatabase = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("encryptDatabase", activeLanguageList);
  // states
  const { clearDatabase, setEncryptedDb } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const [encEmp, setEncEmp] = useState<findexDatabaseEmployee[] | undefined>(undefined);

  const handleIndexDatabase = async (): Promise<void> => {
    try {
      const key = new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ]);
      const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

      const byteTable: findexDatabaseEmployeeBytes[] = await encryptDatabase(clearDatabase, key, iv);
      setEncryptedDb({
        byteTable: byteTable,
        key,
        iv: iv,
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
          codeOutputList={
            encEmp
              ? {
                  java: JSON.stringify(encEmp, undefined, 2),
                  javascript: JSON.stringify(encEmp, undefined, 2),
                  python: JSON.stringify(encEmp, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptDatabase;
