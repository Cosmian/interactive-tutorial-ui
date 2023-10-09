import Code from "../component/Code";
import Split from "../component/Split";

const CovercryptSetup = () => {
  return (
    <Split>
      <Split.Content>
        <h1>Attribute-based Encryption overview</h1>
        <p>
          This interface demonstrates how Cosmian's solutions can be implemented to add client-side encryption to your current workflows.
        </p>

        <h2>Architecture of implementations</h2>
        <p>Cosmian provides code blocks that make using its technologies to implement client-side encryption easy.</p>

        <h2>Client-side encryption</h2>
        <p>
          With client-side encryption, content is encrypted in the customer's browser or connector before it is transmitted to the cloud
          application servers. The customer manages the encryption keys. This approach significantly reduces the attack surface, as the
          application and data layers within the zero-trust environment process only encrypted data and have no clear text access to the
          decryption keys.
        </p>

        <h2>Architecture of implementations</h2>
        <p>Cosmian provides code blocks that make using its technologies to implement client-side encryption easy.</p>

        <h2>Client-side encryption</h2>
        <p>
          With client-side encryption, content is encrypted in the customer's browser or connector before it is transmitted to the cloud
          application servers. The customer manages the encryption keys. This approach significantly reduces the attack surface, as the
          application and data layers within the zero-trust environment process only encrypted data and have no clear text access to the
          decryption keys.
        </p>

        <h2>Architecture of implementations</h2>
        <p>Cosmian provides code blocks that make using its technologies to implement client-side encryption easy.</p>

        <h2>Client-side encryption</h2>
        <p>
          With client-side encryption, content is encrypted in the customer's browser or connector before it is transmitted to the cloud
          application servers. The customer manages the encryption keys. This approach significantly reduces the attack surface, as the
          application and data layers within the zero-trust environment process only encrypted data and have no clear text access to the
          decryption keys.
        </p>
      </Split.Content>
      <Split.Code>
        <Code codeInput={RANDOM_CODE} language="javascript" />
      </Split.Code>
    </Split>
  );
};

export default CovercryptSetup;

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
