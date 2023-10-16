import EmployeeDatabase from "../../assets/employees-database.png";
import Code from "../../component/Code";
import { ImageWrapper } from "../../component/Layout";
import Split from "../../component/Split";

const CreateEncryptionPolicy = () => {
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
      </Split.Content>
      <Split.Code>
        <Code
          codeInputList={{
            java: JS_CODE,
            javascript: JS_CODE,
            python: JS_CODE,
            flutter: JS_CODE,
            "c++": JS_CODE,
          }}
        />
      </Split.Code>
    </Split>
  );
};

export default CreateEncryptionPolicy;

const JS_CODE = `import { CoverCrypt, Policy } from "cloudproof_js";

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
