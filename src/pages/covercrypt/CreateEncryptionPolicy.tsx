import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { createPolicy } from "../../actions/javascript/createPolicy";
import Code from "../../component/Code";
import ContentSkuleton from "../../component/ContentSkuleton";
import Split from "../../component/Split";
import { EmployeeTable } from "../../component/Table";
import { useFetchCodeContent } from "../../hooks/useFetchCodeContent";
import { useBoundStore, useCovercryptStore } from "../../store/store";
import { POLICY_AXIS } from "../../utils/covercryptConfig";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = ["java", "javascript", "python"];

const CreateEncryptionPolicy = (): JSX.Element => {
  // custom hooks
  const { loadingCode, codeContent } = useFetchCodeContent("createPolicy", activeLanguageList);
  // states
  const covercryptState = useCovercryptStore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleCreatePolicy = async (): Promise<void> => {
    try {
      covercryptState.setPolicy(await createPolicy(POLICY_AXIS));
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
        <EmployeeTable data={covercryptState.clearEmployees} covercrypt />

        <p>
          In the following demo, we will create a policy that combines two axes, a security level, and a department. A user will be able to
          decrypt data only if it possesses a key with a sufficient security level and the correct department.
        </p>
        {covercryptState.policy && <pre>{POLICY_AXIS_TEXT}</pre>}
      </Split.Content>

      <Split.Code>
        <Code
          activeLanguageList={activeLanguageList}
          codeInputList={codeContent}
          runCode={handleCreatePolicy}
          codeOutputList={
            covercryptState.policy
              ? {
                  java: JSON.stringify(covercryptState.policy, undefined, 2),
                  javascript: JSON.stringify(covercryptState.policy, undefined, 2),
                  python: JSON.stringify(covercryptState.policy, undefined, 2),
                }
              : undefined
          }
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
