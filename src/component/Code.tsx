import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IoCheckmarkSharp, IoPlayCircleOutline } from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSulphurpoolDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useBoundStore } from "../store/store";
import { CodeContent, Language } from "../utils/types";
import LanguageTabs from "./LanguageTabs";

type CodeHihlighterProps = {
  activeLanguageList: Language[];
  codeInputList: CodeContent;
  codeOutputList?: CodeContent;
  codeLanguage?: string;
  runCode?: () => void;
};

const CodeDemo: React.FC<CodeHihlighterProps> = ({ codeInputList, codeOutputList, activeLanguageList, codeLanguage, runCode }) => {
  const language = useBoundStore((state) => state.language);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (codeOutputList != null) {
      setLoadingButton(false);
    }
  }, [codeOutputList]);

  const onClickRun = (): void => {
    if (runCode != null) {
      runCode();
      setLoadingButton(true);
    }
  };

  return (
    <div className="code-demo">
      {activeLanguageList.length !== 0 && <LanguageTabs activeLanguageList={activeLanguageList} />}

      <CodeHighlighter codeInput={codeInputList[language]} language={codeLanguage ? codeLanguage : language} />
      <FlatButton onClick={onClickRun} loading={loadingButton} disabled={runCode == null} />

      {codeOutputList && codeOutputList[language] && (
        <CodeHighlighter codeInput={codeOutputList[language]} language={codeLanguage ? codeLanguage : language} copyButton={false} />
      )}
    </div>
  );
};

export default CodeDemo;

export const CodeHighlighter: React.FC<{ codeInput: string | undefined; language: string; copyButton?: boolean }> = ({
  codeInput,
  language,
  copyButton = true,
}) => {
  const [copied, setCopied] = useState(false);

  if (codeInput == null) return <></>;

  const handleCopy = (): void => {
    navigator.clipboard.writeText(codeInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="code-highlighter">
      {copyButton && (
        <button onClick={handleCopy} className="copy-btn">
          {copied ? (
            <>
              Copied <IoCheckmarkSharp style={{ marginBottom: -2 }} />
            </>
          ) : (
            "Copy"
          )}
        </button>
      )}
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

type FlatButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};
const FlatButton: React.FC<FlatButtonProps> = ({ loading, disabled, onClick }) => {
  return (
    <button onClick={onClick} className="flat-btn primary" disabled={loading || disabled}>
      Run code {loading ? <SyncOutlined spin /> : <IoPlayCircleOutline />}
    </button>
  );
};
