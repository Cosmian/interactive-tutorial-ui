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
import { findexDatabaseEmployee, findexDatabaseEmployeeBytes } from "../../utils/covercryptConfig";
import { encryptDatabase } from "../../actions/javascript/encryptDatabase";
import { AesGcm } from "cloudproof_js";

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
      const getRandomBytes = (size: number): Uint8Array => {
        const array = new Uint8Array(size);
        window.crypto.getRandomValues(array);
        return array;
      };
      const key = new Uint8Array([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ]);
      const nonce = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const authenticatedData = getRandomBytes(20) as Buffer;

      const runTest = async () => {
        const key = new Uint8Array(32);
        const nonce = new Uint8Array(12);
        const { Aes256Gcm } = await AesGcm();
        const plaintextSize = 20;
        const plaintext = getRandomBytes(plaintextSize) as Buffer;
        const ciphertext = Aes256Gcm.encrypt(plaintext, key, nonce, authenticatedData);
        const cleartext = Aes256Gcm.decrypt(ciphertext, key, nonce, authenticatedData);

        // eslint-disable-next-line eqeqeq
        console.log("test result", plaintext == cleartext, plaintext, cleartext);
      };

      runTest();

      const byteTable: findexDatabaseEmployeeBytes[] = await encryptDatabase(clearDatabase, key, nonce, authenticatedData);
      setEncryptedDb({
        byteTable,
        key,
        nonce,
        authenticatedData,
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
      message.success("Employees table has been encrypted.");
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
        <p>
          To ensure data confidentiality at every step, it is a good practice to encrypt all content of a database before uploading it to
          the public cloud. In this example, we will encrypt the employees database using the AES-GCM algorithm using the Cosmian{" "}
          <a href="https://github.com/Cosmian/cloudproof_js">cloudproof_js</a>. The library provides a Typescript-friendly API to use the{" "}
          <a href="https://github.com/Cosmian/cloudproof_rust">Cosmian's Cloudproof Encryption</a> suite, written in Rust. You are free to
          use any other encryption solution according to your needs.
        </p>
        <EmployeeTable data={clearDatabase} />
        <Button onClick={handleIndexDatabase} style={{ width: "100%", margin: "20px 0" }}>
          Encrypt the database
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
