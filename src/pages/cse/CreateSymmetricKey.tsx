import { message } from "antd";
import { KMIPOperations, KmsClient } from "cloudproof_js";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../actions/javascript/backendConfig";
import { createSymmetricKey } from "../../actions/javascript/createSymmetricKey";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCseStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["javascript"];

const CreateSymmetricKey = (): JSX.Element => {
  const { loadingCode, codeContent } = useFetchCodeContent("createSymmetricKey", activeLanguageList);
  const { steps, setSteps, kmsToken } = useBoundStore((state) => state);
  const { symmetricKeyUid, setSymmetricKeyUid } = useCseStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const handleCreateSymmetricKey = async (): Promise<void> => {
    if (kmsToken) {
      try {
        const keyUid = await createSymmetricKey(kmsToken);
        setSymmetricKeyUid(keyUid);
        const client = new KmsClient(BACKEND_URL, kmsToken);
        await client.grantAccess(keyUid, "*", KMIPOperations.get);

        updateNavigationSteps(steps, setSteps);
        navigate("#");
      } catch (error) {
        message.error(typeof error === "string" ? error : (error as Error).message);
        console.error(error);
      }
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>A symmetric key is created and used to encrypt and decrypt the document and its summary.</p>
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={handleCreateSymmetricKey}
          codeOutputList={
            symmetricKeyUid
              ? {
                  javascript: JSON.stringify(symmetricKeyUid, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default CreateSymmetricKey;
