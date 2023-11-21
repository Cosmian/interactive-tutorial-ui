import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { uploadKeyInPKI } from "../../actions/javascript/uploadKeyInPKI";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { ClientTwo } from "../../component/Tags";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, usePkiStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const ImportAndUnwrapUDK = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("uploadKeyInPKI", activeLanguageList);
  // states
  const { unwrappedUdkUid, wrappedPkCertUid, wrappedUdk2, setUnwrappedUdkUid } = usePkiStore((state) => state);
  const { kmsToken, kmsTwoToken, steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const importAndUnwrapUDK = async (): Promise<void> => {
    try {
      if (kmsToken && wrappedUdk2 && wrappedPkCertUid) {
        const uid = await uploadKeyInPKI(kmsTwoToken, uuidv4(), wrappedUdk2, true, wrappedPkCertUid);
        setUnwrappedUdkUid(uid);
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          <ClientTwo /> imports and unwraps the decryption key <code>Wrap(sk_a)</code> in his KMS (<b>KMS 2</b>).
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={kmsToken && wrappedUdk2 && wrappedPkCertUid ? importAndUnwrapUDK : undefined}
          codeOutputList={
            unwrappedUdkUid
              ? {
                  javascript: JSON.stringify(unwrappedUdkUid, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default ImportAndUnwrapUDK;
