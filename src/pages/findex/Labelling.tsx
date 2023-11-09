import { Input, message } from "antd";
import { Spinner } from "cosmian_ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defineLabel } from "../../actions/javascript/defineLabel";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useFindexStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const Labelling = (): JSX.Element => {
  const [labelValue, setLabelValue] = useState("Q3 2023");
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("defineLabel", activeLanguageList);
  // states
  const { label, setLabel } = useFindexStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

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

  if (loadingCode) return <Spinner fullcontent />;

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          When indexing, Findex uses an arbitrarily chosen public label; this label may represent anything, such as a period, e.g., “Q3
          2023”. Changing it regularly significantly increases the difficulty of performing statistical attacks.
        </p>
        <Input defaultValue={labelValue} onChange={(e) => setLabelValue(e.target.value)} />
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
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
      </Split.Code>
    </Split>
  );
};

export default Labelling;
