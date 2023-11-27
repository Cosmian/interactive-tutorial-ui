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

const Decrypt = (): JSX.Element => {
  const { loadingCode, codeContent } = useFetchCodeContent("decryptWithAes", activeLanguageList);

  const { steps, setSteps } = useBoundStore((state) => state);
  const { summarizeApiResponse, keyBytes, clearSummary, setClearSummary } = useCseStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const handleDecryptSummary = async (): Promise<void> => {
    if (summarizeApiResponse && keyBytes) {
      try {
        const clearText = await decryptWithAes(summarizeApiResponse.encrypted_summary, keyBytes, summarizeApiResponse.nonce);
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
        {summarizeApiResponse && summarizeApiResponse.encrypted_summary && (
          <>
            <p style={{ marginTop: "2em" }}>Encrypted summary:</p>
            <TextArea value={summarizeApiResponse.encrypted_summary} rows={4} />
          </>
        )}
        <p style={{ marginTop: "2em" }}>
          Summary is decrypted using <b>aes</b> library.
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
          runCode={summarizeApiResponse && keyBytes ? handleDecryptSummary : undefined}
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

export default Decrypt;
