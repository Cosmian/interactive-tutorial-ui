import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Code from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";

const SetupCse = (): JSX.Element => {
  const [serviceSetup, setServiceSetup] = useState(false);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSetupService = (): void => {
    setServiceSetup(true);
    updateNavigationSteps(steps, setSteps);
    navigate("#");
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          The <b>Cosmian KmsClient</b> is required in this demonstration. KmsClient is available in the{" "}
          <Link to="https://github.com/Cosmian/cloudproof_kms_js" target="_blank" rel="noopener noreferrer">
            cloudproof_kms_js
          </Link>{" "}
          open-source Javascript library.
        </p>
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={["javascript"]}
          codeInputList={{
            javascript: JS_CODE,
          }}
          codeOutputList={
            serviceSetup
              ? {
                  javascript: "# successfully installed",
                }
              : undefined
          }
          codeLanguage="bash"
          runCode={handleSetupService}
        />
      </Split.Code>
    </Split>
  );
};

export default SetupCse;

const JS_CODE = `npm install cloudproof_kms_js 
# or yarn install cloudproof_kms_js or pnpm install cloudproof_kms_js`;
