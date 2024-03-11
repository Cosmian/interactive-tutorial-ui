import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";


const RefreshKeys = (): JSX.Element => {


  return (
    <Split>
      <Split.Content>
        <p>Placeholder</p>
      </Split.Content>
      <Split.Code>
        <Code activeLanguageList={[]} codeInputList={{
          java: undefined,
          javascript: undefined,
          python: undefined
        }}
        />
      </Split.Code>
    </Split>
  );
};

export default RefreshKeys;
