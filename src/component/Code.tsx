import { useState } from "react";
import { IoCheckmarkSharp, IoPlayCircleOutline } from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSulphurpoolDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useBoundStore } from "../store/store";
import { Language, LanguageList } from "../utils/types";
import LanguageTabs from "./LanguageTabs";

type CodeHihlighterProps = {
  activeLanguageList: Language[];
  codeInputList: LanguageList;
  codeOutputList?: LanguageList;
  codeLanguage?: string;
  runCode?: () => void;
};

const CodeDemo: React.FC<CodeHihlighterProps> = ({ codeInputList, codeOutputList, activeLanguageList, codeLanguage, runCode }) => {
  const language = useBoundStore((state) => state.language);

  const onClickRun = (): void => {
    if (runCode != null) {
      runCode();
    }
  };

  return (
    <div className="code-demo">
      <LanguageTabs activeLanguageList={activeLanguageList} />

      <CodeHihlighter codeInput={codeInputList[language]} language={codeLanguage ? codeLanguage : language} />
      <button onClick={runCode != null ? onClickRun : undefined} className="flat-btn primary" disabled={runCode == null}>
        Run code <IoPlayCircleOutline />
      </button>

      {codeOutputList && codeOutputList[language] && (
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
