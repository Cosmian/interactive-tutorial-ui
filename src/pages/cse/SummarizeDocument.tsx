import { Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { summarizeDocumentContent } from "../../actions/javascript/summarizeDocumentContent";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCseStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const { TextArea } = Input;

const activeLanguageList: Language[] = ["javascript"];
const INITIAL_TEXT =
  "Client-side encryption is the cryptographic technique of encrypting data on the sender's side, before it is transmitted to a server such as a cloud storage service. Client-side encryption features an encryption key that is not available to the service provider, making it difficult or impossible for service providers to decrypt hosted data. Client-side encryption allows for the creation of applications whose providers cannot access the data its users have stored, thus offering a high level of privacy. Those applications are sometimes marketed under the misleading term 'zero-knowledge'.";

const SummarizeDocument = (): JSX.Element => {
  const { loadingCode, codeContent } = useFetchCodeContent("summarizeDocumentContent", activeLanguageList);

  const [textInput, setTextInput] = useState(INITIAL_TEXT);
  const { kmsToken, steps, setSteps } = useBoundStore((state) => state);
  const { summarizeApiResponse, setSummarizeApiResponse } = useCseStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const handleSendDocument = async (): Promise<void> => {
    try {
      if (kmsToken) {
        const res = await summarizeDocumentContent(textInput, kmsToken);
        if (!(res instanceof Error)) {
          setSummarizeApiResponse(res);
          message.success("Text sent successfully");
        }
        updateNavigationSteps(steps, setSteps);
        navigate("#");
      }
    } catch (error) {
      setSummarizeApiResponse({ summary: undefined });
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
          Document content is parsed from the browser using Cosmian AI chrome extension, and sent to the microservice in order to summarize
          it (using AI model running on TEE).
        </p>
        <p style={{ marginTop: "2em", fontWeight: "bold" }}>Document:</p>
        <TextArea value={textInput} rows={7} onChange={(e) => setTextInput(e.target.value)} />
        {summarizeApiResponse && (
          <>
            <p style={{ marginTop: "2em", fontWeight: "bold" }}>Computed summary:</p>
            <div>{summarizeApiResponse.summary}</div>
          </>
        )}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={textInput ? handleSendDocument : undefined}
          codeOutputList={
            summarizeApiResponse && summarizeApiResponse.summary
              ? {
                  javascript: JSON.stringify(summarizeApiResponse.summary, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default SummarizeDocument;
