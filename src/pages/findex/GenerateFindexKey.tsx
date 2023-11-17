import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { createFindexKey } from "../../actions/javascript/createFindexKey";
import Code from "../../component/Code";
import ContentSkuleton from "../../component/ContentSkuleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const GenerateFindexKey = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("createFindexKey", activeLanguageList);
  // states
  const { findexKey, setFindexKey } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleGenerateFindexKey = async (): Promise<void> => {
    try {
      const key = createFindexKey();
      setFindexKey(key);
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  if (loadingCode) return <ContentSkuleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>Findex uses a single symmetric 128 bit key to upsert and search. Encryption is performed using AES 128 GCM.</p>
        <p>To generate 16 random bytes locally, use the randomBytes generator from 'crypto'.</p>
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={handleGenerateFindexKey}
          codeOutputList={
            findexKey
              ? {
                  java: JSON.stringify(findexKey, undefined, 2),
                  javascript: JSON.stringify(findexKey, undefined, 2),
                  python: JSON.stringify(findexKey, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default GenerateFindexKey;
