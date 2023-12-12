import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleOutline, IoCheckmarkSharp, IoPlayCircleOutline } from "react-icons/io5";
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
      <FlatButton onClick={onClickRun} loading={loadingButton} disabled={runCode == null} done={codeOutputList !== undefined} />

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
  done?: boolean;
  onClick: () => void;
};
const FlatButton: React.FC<FlatButtonProps> = ({ loading, disabled, onClick, done }) => {
  return (
    <button onClick={onClick} className="flat-btn primary" disabled={loading || disabled}>
      Run code {loading ? <SyncOutlined spin /> : done ? <IoCheckmarkCircleOutline /> : <IoPlayCircleOutline />}
    </button>
  );
};

export const CodeBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="code-background">{children}</div>;
};

type VmCodeProps = {
  machine?: "vm" | "admin";
  code: string;
  customStyle?: React.CSSProperties;
};
export const VmCode: React.FC<VmCodeProps> = ({ machine, code, customStyle }) => {
  return (
    <div className={machine ? machine + " vm-code" : "vm-code"}>
      {machine && <div className="machine-tag">{machine === "vm" ? "Cosmian VM" : "Admin system machine"}</div>}

      <SyntaxHighlighter
        language={"shell"}
        style={atelierSulphurpoolDark}
        customStyle={{ textAlign: "left", padding: 20, ...customStyle }}
        wrapLongLines={true}
        showLineNumbers={false} // disable line numbers to wrap long lines
        class="code"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
