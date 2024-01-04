import { Input, message } from "antd";
import { KmsClient } from "cloudproof_js";
import aes from "js-crypto-aes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../actions/javascript/backendConfig";
import { sendEncryptedDocument } from "../../actions/javascript/sendEncryptedDocument";
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

const EncryptAndSend = (): JSX.Element => {
  const { loadingCode, codeContent } = useFetchCodeContent("sendEncryptedDocument", activeLanguageList);

  const [textInput, setTextInput] = useState(INITIAL_TEXT);
  const [encryptedInput, setEncryptedInput] = useState("");
  const { steps, setSteps, kmsToken } = useBoundStore((state) => state);
  const { symmetricKeyUid, summarizeApiResponse, setSummarizeApiResponse, setKeyBytes } = useCseStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  const handleSendEncryptedDocument = async (): Promise<void> => {
    if (symmetricKeyUid) {
      try {
        const textEncoder = new TextEncoder();
        const bytesInput = textEncoder.encode(textInput);
        const iv = new Uint8Array(12);
        self.crypto.getRandomValues(iv);
        const client = new KmsClient(BACKEND_URL, kmsToken);
        const key = await client.getObject(symmetricKeyUid);

        if (key.type === "SymmetricKey") {
          const keyBytes = key.value.keyBlock.bytes();
          setKeyBytes(keyBytes);
          const encText = await aes.encrypt(bytesInput, keyBytes, { name: "AES-GCM", iv });
          setEncryptedInput(btoa(String.fromCodePoint(...encText)));
          const res = await sendEncryptedDocument(bytesInput, keyBytes, symmetricKeyUid, iv);
          if (!(res instanceof Error)) {
            setSummarizeApiResponse(res);
            message.success("Text sent successfully");
          }
          updateNavigationSteps(steps, setSteps);
          navigate("#");
        }
      } catch (error) {
        setSummarizeApiResponse({ nonce: undefined, encrypted_summary: undefined });
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
        <p style={{ marginTop: "2em" }}>Document:</p>
        <TextArea value={textInput} rows={7} onChange={(e) => setTextInput(e.target.value)} />
        {encryptedInput && (
          <>
            <p style={{ marginTop: "2em" }}>Encrypted document:</p>
            <TextArea value={encryptedInput} rows={10} />
          </>
        )}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={symmetricKeyUid ? handleSendEncryptedDocument : undefined}
          codeOutputList={
            summarizeApiResponse
              ? {
                  javascript: JSON.stringify(summarizeApiResponse.encrypted_summary, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default EncryptAndSend;
