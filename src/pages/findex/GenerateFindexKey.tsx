import { message } from "antd";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import { createFindexKey } from "../../actions/javascript/createFindexKey";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const GenerateFindexKey = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("createFindexKey", activeLanguageList);
  // states
  const findexKey = useBoundStore((state) => state.findexKey);
  const setFindexKey = useBoundStore((state) => state.setFindexKey);
  const steps = useBoundStore((state) => state.steps);
  const setSteps = useBoundStore((state) => state.setSteps);
  const navigate = useNavigate();

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

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>Generating Findex key</h1>
        <p>Findex uses a single symmetric 128 bit key to upsert and search. Encryption is performed using AES 128 GCM.</p>
        <p>To generate 16 random bytes locally, use the randomBytes generator from 'crypto'.</p>
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={() => handleGenerateFindexKey()}
          codeOutputList={
            findexKey
              ? {
                  java: JSON.stringify(findexKey, undefined, 2),
                  javascript: JSON.stringify(findexKey, undefined, 2),
                  python: JSON.stringify(findexKey, undefined, 2),
                  flutter: JSON.stringify(findexKey, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default GenerateFindexKey;
