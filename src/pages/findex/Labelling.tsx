import { Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defineLabel } from "../../actions/javascript/defineLabel";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeList } from "../../hooks/useFetchCodeList";
import { useBoundStore } from "../../store/store";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const Labelling = (): JSX.Element => {
  const [labelValue, setLabelValue] = useState("Q3 2023");
  // custom hooks
  const { loadingCode, codeList } = useFetchCodeList("defineLabel", activeLanguageList);
  // states
  const label = useBoundStore((state) => state.label);
  const setLabel = useBoundStore((state) => state.setLabel);
  const steps = useBoundStore((state) => state.steps);
  const setSteps = useBoundStore((state) => state.setSteps);
  const navigate = useNavigate();

  const handleLabelling = async (): Promise<void> => {
    try {
      const newLabel = defineLabel(labelValue);
      setLabel(newLabel);
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
      console.error(error);
    }
  };

  return (
    <Split>
      <Split.Content>
        <h1>Labeling: salting the encryption</h1>
        <p>
          When indexing, Findex uses an arbitrarily chosen public label; this label may represent anything, such as a period, e.g., “Q3
          2023”. Changing it regularly significantly increases the difficulty of performing statistical attacks.
        </p>
        <Input defaultValue={labelValue} onChange={(e) => setLabelValue(e.target.value)} />
      </Split.Content>

      <Split.Code>
        {!loadingCode && (
          <Code
            activeLanguageList={activeLanguageList}
            codeInputList={codeList}
            runCode={() => handleLabelling()}
            codeOutputList={
              label
                ? {
                    java: JSON.stringify(label, undefined, 2),
                    javascript: JSON.stringify(label, undefined, 2),
                    python: JSON.stringify(label, undefined, 2),
                    flutter: JSON.stringify(label, undefined, 2),
                  }
                : undefined
            }
          />
        )}
      </Split.Code>
    </Split>
  );
};

export default Labelling;
