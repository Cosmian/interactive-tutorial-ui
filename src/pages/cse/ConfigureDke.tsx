import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import DkeAdminScope from "../../assets/label_scope.png";
import DkeAdminLabel from "../../assets/sensitivity_label.png";
import Code from "../../component/Code";
import { ImageWrapper } from "../../component/Layout";
import Split from "../../component/Split";
import { useBoundStore, useCseStore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";
import { Language } from "../../utils/types";

const activeLanguageList: Language[] = [];

const ConfigureDke = (): JSX.Element => {
  const { steps, setSteps } = useBoundStore((state) => state);
  const { dkeConfig, setDkeConfig } = useCseStore((state) => state);

  const navigate = useNavigate();
  const currentItem = findCurrentNavigationItem(steps);

  const handleSetup = async (): Promise<void> => {
    try {
      setDkeConfig(true);
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
        <p>Cosmian KMS (key management server) is compatible with Microsoft double key encryption.</p>
        <p>
        Microsoft DKE is a feature of Microsoft 365 that allows you to protect your most sensitive data by encrypting data on the client computer before sending it to Microsoft servers. One of the keys used to encrypt remains under your control and makes the data unreadable by Microsoft. This key is kept inside your instance of <Link to="https://cosmian.com/data-protection-suite/cosmian-kms/" target="_blank" rel="noopener noreferrer">
             Cosmian KMS.
          </Link>
        </p>
        <p>
          Once DKE is configured, the whole process consists in assigning a specific sensitivity label to a document. The label will indicate that the document is encrypted and that the key to decrypt it is stored in your Cosmian KMS.
          Please check the dedicated <Link to="https://learn.microsoft.com/en-us/purview/double-key-encryption" target="_blank" rel="noopener noreferrer">
            Microsoft documentation
          </Link> for a complete overview of the feature.
        </p>
        <p>The DKE feature is currently only available for the Office Windows clients.</p>
        <p>Configuration steps:</p>
        <ul>
          <li>Configure Microsoft DKE in Purview and create a sensitivity label for encryption
            <ImageWrapper>
              <img src={DkeAdminLabel} alt="Cse Admin interface" style={{ maxWidth: "100%" }} />
            </ImageWrapper>
            <ImageWrapper>
              <img src={DkeAdminScope} alt="Cse Admin interface" style={{ maxWidth: "100%" }} />
            </ImageWrapper>
          </li>
          <li>Instantiate and configure Cosmian <b>Key Management Server</b> (Cosmian KMS)</li>
          <li>Generate <b>RSA key</b> with tag <i>dke_key</i></li>
        </ul>
      </Split.Content>
      <Split.Code>
      <Code
          activeLanguageList={activeLanguageList}
          codeInputList={{
            java: DKE_KEY,
            javascript: DKE_KEY,
            python: DKE_KEY,
          }}
          codeOutputList={
            dkeConfig
              ? {
                  java: DKE_KEY_OUTPUT,
                  javascript: DKE_KEY_OUTPUT,
                  python: DKE_KEY_OUTPUT,
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

export default ConfigureDke;

const DKE_KEY = `# Generate DKE key

cosmian kms rsa keys create --tag dke_key --size_in_bits 2048`;

const DKE_KEY_OUTPUT = `The RSA key pair has been created.
	  Public key unique identifier: 978cb116-c498-436a-9b9c-e0ed1ddf4cfa
	  Private key unique identifier: b18f274c-f9a7-4c3d-902d-733b1aa58a15

  Tags:
    - dke_key`;
