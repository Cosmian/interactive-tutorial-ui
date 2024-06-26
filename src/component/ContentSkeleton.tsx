import { Skeleton } from "antd";
import Code from "./Code";
import Split from "./Split";

const ContentSkeleton = (): JSX.Element => {
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
          }}
          runCode={undefined}
          codeOutputList={undefined}
        />
      </Split.Code>
    </Split>
  );
};

export default ContentSkeleton;
