import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { fetchPKI } from "../../actions/javascript/fetchPKI";
import { grantGetKeyAccess } from "../../actions/javascript/grantGetKeyAccess";
import { uploadKeyInPKI } from "../../actions/javascript/uploadKeyInPKI";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { ClientOne, ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const SendWrappedDecryptionKey = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("uploadKeyInPKI", activeLanguageList);
  // states
  const { wrappedUdk, wrappedUdk2, setWrappedUdk2, setWrappedUdkUid } = usePkiStore((state) => state);
  const { kmsToken, kmsTwoToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const sendWrappedDecryptionKey = async (): Promise<void> => {
    try {
      if (kmsToken && kmsTwoToken && wrappedUdk) {
        const uid = await uploadKeyInPKI(kmsToken, uuidv4(), wrappedUdk, false);
        setWrappedUdkUid(uid);
        await grantGetKeyAccess(kmsToken, uid, "*");

        const obj = await fetchPKI(kmsTwoToken, uid);
        setWrappedUdk2(obj);

        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          <ClientOne /> sends wrapped Decryption Key in <b>Cosmian KMS</b>, <ClientOne /> grants access to <ClientTwo /> for this key.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={kmsToken && kmsTwoToken && wrappedUdk ? sendWrappedDecryptionKey : undefined}
          codeOutputList={
            wrappedUdk2
              ? {
                  javascript: JSON.stringify(wrappedUdk2, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SendWrappedDecryptionKey;
