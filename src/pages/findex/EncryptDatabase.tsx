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
import { message } from "antd";
import { encryptDatabase } from "../../actions/javascript/encryptDatabase";
import { byteEmployeeToString } from "../../utils/utils";
import { encryptedEmployeesDatabase, findexClearEmployeesDatabase } from "../../utils/findexConfig";

const activeLanguageList: Language[] = ["javascript"];

const EncryptDatabase = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("encryptDatabase", activeLanguageList);
  // states
  const { clearDatabase, encryptedDatabase, setEncryptedDatabase } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleIndexDatabase = async (): Promise<void> => {
    try {
      const getRandomBytes = (size: number): Uint8Array => {
        const array = new Uint8Array(size);
        window.crypto.getRandomValues(array);
        return array;
      };
      const key = getRandomBytes(32);
      const nonce = getRandomBytes(12);
      const authenticatedData = getRandomBytes(20);

      const encryptedBytesDatabase: encryptedEmployeesDatabase[] = await encryptDatabase(clearDatabase, key, nonce, authenticatedData);
      setEncryptedDatabase({
        encryptedBytesDatabase,
        key,
        nonce,
        authenticatedData,
      });
      message.success("Employees database has been encrypted.");
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  const decodedEmployeeDatabase: findexClearEmployeesDatabase[] | undefined =
    encryptedDatabase?.encryptedBytesDatabase.map(byteEmployeeToString);
  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          To ensure data confidentiality at every step, it is a good practice to encrypt all content of a database before uploading it to
          the public cloud. In this example, we will encrypt the employees database using the AES-GCM algorithm using the Cosmian{" "}
          <a href="https://github.com/Cosmian/cloudproof_js">cloudproof_js</a>. The library provides a Typescript-friendly API to use the{" "}
          <a href="https://github.com/Cosmian/cloudproof_rust">Cosmian's Cloudproof Encryption</a> suite, written in Rust. You can choose
          any encryption scheme that best suits your requirements.
        </p>
        <EmployeeTable data={clearDatabase} />
        <Button onClick={handleIndexDatabase} style={{ width: "100%", margin: "20px 0" }}>
          Encrypt database
        </Button>
        {decodedEmployeeDatabase && <EmployeeTable data={decodedEmployeeDatabase} />}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={handleIndexDatabase}
          codeOutputList={
            encryptedDatabase?.encryptedBytesDatabase && decodedEmployeeDatabase
              ? {
                  java: JSON.stringify(decodedEmployeeDatabase, undefined, 2),
                  javascript: JSON.stringify(decodedEmployeeDatabase, undefined, 2),
                  python: JSON.stringify(decodedEmployeeDatabase, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptDatabase;
