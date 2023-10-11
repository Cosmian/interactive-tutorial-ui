import Code from "../component/Code";
import Split from "../component/Split";

const CreateEncryptionPolicy = () => {
  return (
    <Split>
      <Split.Content>
        <h1>Create encryption policy</h1>
        <p>
          This interface demonstrates how Cosmian's solutions can be implemented to add client-side encryption to your current workflows.
        </p>
      </Split.Content>
      <Split.Code>
        <Code codeInput={RANDOM_CODE} language="javascript" />
      </Split.Code>
    </Split>
  );
};

export default CreateEncryptionPolicy;

const RANDOM_CODE = `import { CoverCrypt, Policy } from "cloudproof_js";

export const createPolicy = async (axis) => {  
  const { Policy, PolicyAxis } = await CoverCrypt();  
  const policyAxis = axis.map((entry) => {    
    return new PolicyAxis(Object.keys(entry)[0], Object.values(entry)[0], false);  
  }); 
  const policy = new Policy(policyAxis, 100);  
  return policy;
};

const POLICY_AXIS = [
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
];

createPolicy(POLICY_AXIS);`;
