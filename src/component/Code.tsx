import { useState } from "react";
import { IoCheckmarkSharp, IoPlayCircleOutline } from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSulphurpoolDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useBoundStore } from "../store/store";
import { Language } from "../utils/types";
import LanguageTabs from "./LanguageTabs";

type CodeHihlighterProps = {
  dactivatedLanguageList?: Language[];
  codeInputList: LanguageList;
  codeOutputList?: LanguageList;
  codeLanguage?: string;
};
type LanguageList = {
  java?: string;
  javascript?: string;
  python?: string;
  flutter?: string;
  "c++"?: string;
};
const CodeDemo: React.FC<CodeHihlighterProps> = ({ codeInputList, codeOutputList, dactivatedLanguageList, codeLanguage }) => {
  const [result, setResult] = useState(false);
  const language = useBoundStore((state) => state.language);

  return (
    <div className="code-demo">
      <LanguageTabs dactivatedLanguageList={dactivatedLanguageList} />

      <CodeHihlighter codeInput={codeInputList[language]} language={codeLanguage ? codeLanguage : language} />
      {codeOutputList != null && (
        <button onClick={() => setResult(true)} className="flat-btn primary">
          Run code <IoPlayCircleOutline />
        </button>
      )}
      {result && codeOutputList && codeOutputList[language] && (
        <CodeHihlighter codeInput={codeOutputList[language]} language={codeLanguage ? codeLanguage : language} />
      )}
    </div>
  );
};

export default CodeDemo;

export const CodeHihlighter: React.FC<{ codeInput: string | undefined; language: string }> = ({ codeInput, language }) => {
  const [copied, setCopied] = useState(false);

  if (codeInput == null) return <></>;

  const handleCopy = (): void => {
    navigator.clipboard.writeText(codeInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="code-highlighter">
      <button onClick={handleCopy} className="copy-btn">
        {copied ? (
          <>
            Copied <IoCheckmarkSharp style={{ marginBottom: -2 }} />
          </>
        ) : (
          "Copy"
        )}
      </button>
      <SyntaxHighlighter
        language={language ? language : "typescript"}
        style={atelierSulphurpoolDark}
        customStyle={{ textAlign: "left", padding: 20 }}
        wrapLongLines={true}
        showLineNumbers={false} // disable line numbers to wrap long lines
      >
        {codeInput}
      </SyntaxHighlighter>
    </div>
  );
};
