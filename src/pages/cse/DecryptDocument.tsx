import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { decryptWithAes } from "../../actions/javascript/decryptWithAes";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCseStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const { TextArea } = Input;

const activeLanguageList: Language[] = ["javascript"];

const DecryptDocument = (): JSX.Element => {
  const { loadingCode, codeContent } = useFetchCodeContent("decryptWithAes", activeLanguageList);

  const { steps, setSteps } = useBoundStore((state) => state);
  const { response, keyBytes, clearSummary, setClearSummary } = useCseStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const handleDecryptSummary = async (): Promise<void> => {
    if (response && keyBytes) {
      try {
        const clearText = await decryptWithAes(response.encrypted_summary, keyBytes, response.nonce);
        setClearSummary(clearText);
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
        <p>
          Document is encrypted using <b>aes</b> and sent to the microservice in order to summarize it (using flan-t5 model running on TEE).
        </p>
        {clearSummary ? (
          <TextArea value={clearSummary} rows={3} />
        ) : (
          <p>
            <em>Waiting for summary</em>
          </p>
        )}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={response && keyBytes ? handleDecryptSummary : undefined}
          codeOutputList={
            clearSummary
              ? {
                  javascript: JSON.stringify(clearSummary, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default DecryptDocument;
