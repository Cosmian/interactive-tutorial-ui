import { useState } from "react";
import { IoCheckmarkSharp, IoPlayCircleOutline } from "react-icons/io5";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSulphurpoolDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeProps = CodeHihlighterProps;

const CodeDemo: React.FC<CodeProps> = ({ codeInput, language }) => {
  const [result, setResult] = useState(false);

  return (
    <div className="code-demo">
      <ul role="tablist">
        <li className="current">
          <a aria-controls="c++" aria-selected="true" href="#c++" id="tab-c++" role="tab">
            C++
          </a>
        </li>

        <li>
          <a aria-controls="flutter" aria-selected="false" href="#flutter" id="tab-flutter" role="tab">
            Flutter
          </a>
        </li>
        <li>
          <a aria-controls="java" aria-selected="false" href="#java" id="tab-java" role="tab">
            Java
          </a>
        </li>
        <li>
          <a aria-controls="javascript" aria-selected="false" href="#javascript" id="tab-javascript" role="tab" className="selected">
            Javascript
          </a>
        </li>
        <li>
          <a aria-controls="python" aria-selected="false" href="#python" id="tab-python" role="tab">
            Python
          </a>
        </li>
      </ul>

      <CodeHihlighter codeInput={codeInput} language={language} optionCopy />

      <button onClick={() => setResult(true)} className="flat-btn primary">
        Run code <IoPlayCircleOutline />
      </button>
      {result && <CodeHihlighter codeInput={"success"} language={"bash"} />}
    </div>
  );
};

export default CodeDemo;

type CodeHihlighterProps = { codeInput: string | undefined; language?: string; optionCopy?: boolean };
export const CodeHihlighter: React.FC<CodeHihlighterProps> = ({ codeInput, language, optionCopy }) => {
  const [copied, setCopied] = useState(false);

  if (codeInput == null) return <></>;

  const handleCopy = (): void => {
    navigator.clipboard.writeText(codeInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="code-highlighter">
      {optionCopy != null && (
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
