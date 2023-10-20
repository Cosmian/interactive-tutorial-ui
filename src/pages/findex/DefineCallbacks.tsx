import { message } from "antd";
import { callbacksExamplesInMemory } from "cloudproof_js";
import { Spinner } from "cosmian_ui";
import { useNavigate } from "react-router-dom";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const DefineCallbacks = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("defineCallbacks", activeLanguageList);
  // states
  const callbacks = useBoundStore((state) => state.callbacks);
  const setCallbacks = useBoundStore((state) => state.setCallbacks);
  const steps = useBoundStore((state) => state.steps);
  const setSteps = useBoundStore((state) => state.setSteps);
  const navigate = useNavigate();

  const handleDefineCallbacks = async (): Promise<void> => {
    try {
      const newCallbacks = callbacksExamplesInMemory();
      setCallbacks(newCallbacks);
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
        <h1>Defining callbacks</h1>
        <p>
          The Findex library abstracts the calls to the tables hosting the indexes. The developer is expected to provide the database’s
          backend, typically a fast key/value store, and implement the necessary code in the callbacks used by Findex. Findex uses two
          tables: the Entry table and the Chain table. Both have two columns: uid and value.
        </p>
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={() => handleDefineCallbacks()}
          codeOutputList={
            callbacks
              ? {
                  java: JSON.stringify(callbacks, undefined, 2),
                  javascript: JSON.stringify(callbacks, undefined, 2),
                  python: JSON.stringify(callbacks, undefined, 2),
                  flutter: JSON.stringify(callbacks, undefined, 2),
                }
              : undefined
          }
        />
      </Split.Code>
    </Split>
  );
};

export default DefineCallbacks;