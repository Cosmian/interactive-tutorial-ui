import { Link } from "react-router-dom"
import Split from "../../component/Split"
import { useBoundStore } from "../../store/store"
import { findCurrentNavigationItem } from "../../utils/navigationActions"

const ConfigureDke = (): JSX.Element => {
  const { steps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);

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
          <li>Configure Microsoft DKE in Purview and create a sensitivity label for encryption</li>
          <li>Instantiate and configure Cosmian <b>Key Management Server</b> (Cosmian KMS)</li>
          <li>Generate <b>RSA key</b> with tag <i>dke_key</i></li>
          <div className="code-cmd">
            <code>
              {DKE_KEY}
            </code>
          </div>
        </ul>
      </Split.Content>
    </Split>
  );
};

export default ConfigureDke;

const DKE_KEY = "> ckms rsa keys create --tag dke_key --size_in_bits 2048";
