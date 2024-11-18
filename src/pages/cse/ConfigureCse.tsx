import { message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import CseAdmin from "../../assets/admin_cse.png"
import Code from "../../component/Code"
import { ImageWrapper } from "../../component/Layout"
import Split from "../../component/Split"
import { useBoundStore, useCseStore } from "../../store/store"
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions"
import { Language } from "../../utils/types"


const activeLanguageList: Language[] = [];

const ConfigureCse = (): JSX.Element => {
  const { steps, setSteps } = useBoundStore((state) => state);
  const { cseConfig, setCseConfig } = useCseStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSetup = async (): Promise<void> => {
    try {
      setCseConfig(true);
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    } catch (error) {
      message.error(typeof error === "string" ? error : (error as Error).message);
    }
  };

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>
          <Link to="https://cosmian.com/data-protection-suite/cosmian-kms/" target="_blank" rel="noopener noreferrer">
           Cosmian KMS
          </Link> (key management server) is compatible with Google Workspace client-side encryption.</p>
          <p>Using this feature, users from an organization can encrypt files and documents, in their browsers, before sending them to Google servers. The ephemeral encryption keys are protected by “key wrapping keys”, stored in the KMS and unavailable to Google. Only users that have the right to unwrap the ephemeral encryption keys inside the KMS, can decrypt the files. An overview is provided in Google’s{" "}
          <Link to="https://apps.google.com/supportwidget/articlehome?hl=en&article_url=https%3A%2F%2Fsupport.google.com%2Fa%2Fanswer%2F10741897%3Fhl%3Den&assistant_id=generic-unu&product_context=10741897&product_name=UnuFlow&trigger_context=a" target="_blank" rel="noopener noreferrer">
            About client-side encryption
          </Link> page.
        </p>
        <p>
          Enable CSE from Google Workspace client-side encryption page of the admin console.
        </p>
        <ImageWrapper>
          <img src={CseAdmin} alt="Cse Admin interface" style={{ maxWidth: "100%" }} />
        </ImageWrapper>
        <p>Configuration steps:</p>
        <ul>
          <li>Choose and configure an <b>Identity Provider</b></li>
          <li>Instantiate and configure a <b>Key Management Server</b> (Cosmian KMS)</li>
          <li>Generate <b><i>google_cse</i> key</b> from the KMS</li>
          <li>Handle <b>guest Identity Providers</b> for external users <i>(optional)</i></li>
          <li>Generate <b>Gmail S/MIME</b> elements: users key-pairs and identities  <i>(optional)</i></li>
        </ul>
      </Split.Content>
      <Split.Code>
      <Code
          activeLanguageList={activeLanguageList}
          codeInputList={{
            java: GOOGLE_CSE_KEY,
            javascript: GOOGLE_CSE_KEY,
            python: GOOGLE_CSE_KEY,
          }}
          codeOutputList={
            cseConfig
              ? {
                  java: GOOGLE_CSE_KEY_OUTPUT,
                  javascript: GOOGLE_CSE_KEY_OUTPUT,
                  python: GOOGLE_CSE_KEY_OUTPUT,
              }
              : undefined
          }
          codeLanguage="bash"
          runCode={handleSetup}
        />
      </Split.Code>
    </Split>
  );
};

export default ConfigureCse;


const GOOGLE_CSE_KEY = `# Generate google_cse symmetric key

ckms sym keys create -t google_cse google_cse


# Grant access to the generated key

ckms access-rights grant USER_ID google_cse get encrypt decrypt
`;

const GOOGLE_CSE_KEY_OUTPUT = `The symmetric key was successfully generated.
	  Unique identifier: google_cse

  Tags:
    - google_cse`;

// const GOOGLE_CSE_SMIME = `ckms google key-pairs create --cse-key-id CSE_KEY_ID --subject-name \"C=FR, ST=IdF, L=Paris, O=YOUR_ORGANIZATION, OU=DEPARTMENT, CN=user@your_organization.com, emailAddress=user@your_organization.com\" -i ISSUER_PRIVATE_KEY_ID user@your_organization.com

// ckms google identities insert --user-id user@your_organization.com CREATED_KEYPAIR_ID
// `;
