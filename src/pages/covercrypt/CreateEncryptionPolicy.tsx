import { useEffect, useState } from "react";
import { createPolicy } from "../../actions/javascript/createPolicy";
import EmployeeDatabase from "../../assets/employees-database.png";
import Code from "../../component/Code";
import { ImageWrapper } from "../../component/Layout";
import Split from "../../component/Split";
import { useBoundStore } from "../../store/store";
import { POLICY_AXIS } from "../../utils/covercryptConfig";
import { getLanguageExtension } from "../../utils/languageConfig";
import { updateNavigationSteps } from "../../utils/navigationActions";
import { Language, LanguageList } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript"];

const CreateEncryptionPolicy: React.FC = () => {
  const [codeList, setCodeList] = useState<LanguageList>({
    java: undefined,
    javascript: undefined,
    python: undefined,
    flutter: undefined,
    cpp: undefined,
  });
  const policy = useBoundStore((state) => state.policy);
  const setPolicy = useBoundStore((state) => state.setPolicy);
  const updateSteps = useBoundStore((state) => state.updateSteps);
  const steps = useBoundStore((state) => state.steps);
  const origin = window.location.origin;

  useEffect(() => {
    getTextFromFiles("createPolicy", activeLanguageList);
  }, []);

  // TODO: create a reuseable function on all pages
  const getTextFromFiles = async (filename: string, activeLanguageList: Language[]): Promise<void> => {
    for (const language of activeLanguageList) {
      const extension = getLanguageExtension(language);
      const response = await fetch(`${origin}/actions/${language}/${filename}${extension}`);
      const text = await response.text();
      const codeListCopy = codeList;
      codeListCopy[language] = text;
      setCodeList(codeListCopy);
    }
  };

  const handleCreatePolicy = async (): Promise<void> => {
    try {
      setPolicy(await createPolicy(POLICY_AXIS));
      updateNavigationSteps(steps, updateSteps);
    } catch (error) {
      // TODO: create toast
    }
  };

  return (
    <Split>
      <Split.Content>
        <h1>Create encryption policy</h1>
        <p>
          A <em>policy</em> defines the space of rights that are used for encryption. It is composed by a set of axes that contain
          attributes.
        </p>
        <p>For example, the following two axes are divided into attributes and define a policy:</p>
        <ol>
          <li>Department: Marketing, Human Resources</li>
          <li>Country: France, Spain, Germany</li>
        </ol>
        <p>
          A combination of axis attributes is associated to a partition. For example <code>Department::Finance && Country::France</code>{" "}
          points to a valid partition under the above policy.
        </p>
        <p>An access policy is defined by a set of partitions. It can be written as a boolean expression of axis attributes:</p>
        <pre>(Department::Marketing || Department::Sales) && Country::France</pre>
        <ImageWrapper>
          <img src={EmployeeDatabase} alt="Employee database" width="100%" />
        </ImageWrapper>
        <p>
          In the following demo, we will create a policy that combines two axes, a security level, and a department. A user will be able to
          decrypt data only if it possesses a key with a sufficient security level and the correct department.
        </p>
        {policy && <pre>{POLICY_AXIS_TEXT}</pre>}
      </Split.Content>
      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeList}
          runCode={() => handleCreatePolicy()}
          codeOutputList={{
            java: "result", // TODO result JSON.stringify(policy) too long to be displayed (component crashing)
            javascript: "result",
            python: "result",
            flutter: "result",
            cpp: "result",
          }}
        />
      </Split.Code>
    </Split>
  );
};

export default CreateEncryptionPolicy;

const POLICY_AXIS_TEXT = `const POLICY_AXIS = [
  {
    department: [
      { name: "Marketing", isHybridized: false },
      { name: "HR", isHybridized: false },
      ],
   },
  {
    country: [
      { name: "France", isHybridized: false },
      { name: "Spain", isHybridized: false },
      { name: "Germany", isHybridized: false },
    ],
  },
];`;