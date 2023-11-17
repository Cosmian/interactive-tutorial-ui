import { Skeleton } from "antd";
import Code from "./Code";
import Split from "./Split";

const ContentSkuleton = (): JSX.Element => {
  return (
    <Split>
      <Split.Content>
        <Skeleton active />
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={[]}
          codeInputList={{
            java: "",
            javascript: "",
            python: "",
            flutter: "",
            cpp: "",
          }}
          runCode={undefined}
          codeOutputList={undefined}
        />
      </Split.Code>
    </Split>
  );
};

export default ContentSkuleton;
