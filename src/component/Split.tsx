import { default as ReactSplit } from "react-split";

const Split = ({ children }: { children: React.ReactNode }) => {
  return <ReactSplit className="split">{children}</ReactSplit>;
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  return (
    <main id="main" className="split-content main">
      {children}
    </main>
  );
};
const Code: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  return <div className="split-content code">{children}</div>;
};

Split.Content = Content;
Split.Code = Code;

export default Split;
