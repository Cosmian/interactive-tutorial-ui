import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { instantiateFindex } from "../../actions/javascript/instantiateFindex";
import Code from "../../component/Code";
import ContentSkeleton from "../../component/ContentSkeleton";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const InstantiateFindex = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("instantiateFindex", activeLanguageList);
  // states
  const { findexInstance, setFindexInstance } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleInstantiation = async (): Promise<void> => {
    try {
      const instance = await instantiateFindex();
      setFindexInstance(instance);
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  if (loadingCode) return <ContentSkeleton />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>Findex relies on the user to provide him with:</p>
        <ul>
          <li>the index key</li>
          <li>the public label</li>
        </ul>
        <p>
          Findex uses a single symmetric 128 bit key to upsert and search. To generate 16 random bytes locally, use the randomBytes
          generator from 'crypto'.
        </p>
        <p> These are used to encrypt the requests to the backends storing the actual index.</p>
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={handleInstantiation}
          codeOutputList={
            findexInstance
              ? {
                  java: JSON.stringify(findexInstance, undefined, 2),
                  javascript: JSON.stringify(findexInstance, undefined, 2),
                  python: JSON.stringify(findexInstance, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default InstantiateFindex;
