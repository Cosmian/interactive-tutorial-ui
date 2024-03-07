import OverView from "../pages/OverView";
import AuditSnapshot from "../pages/confidentialVm/AuditSnapshot";
import DeployApplication from "../pages/confidentialVm/DeployApplication";
import DetectMalware from "../pages/confidentialVm/DetectMalware";
import SnapshotVm from "../pages/confidentialVm/SnapshotVm";
import UseConfidentialVm from "../pages/confidentialVm/UseConfidentialVm";
import VerifyIntegrity from "../pages/confidentialVm/VerifyIntegrity";
import AboutCovercrypt from "../pages/covercrypt/AboutCovercrypt";
import CreateEncryptionPolicy from "../pages/covercrypt/CreateEncryptionPolicy";
import CreateMasterKeyPair from "../pages/covercrypt/CreateMasterKeyPair";
import DecryptData from "../pages/covercrypt/DecryptData";
import EncryptData from "../pages/covercrypt/EncryptData";
import GenerateUDK from "../pages/covercrypt/GenerateUDK";
import SetupCovercrypt from "../pages/covercrypt/SetupCovercrypt";
import AboutCse from "../pages/cse/AboutCse";
import SetupCse from "../pages/cse/SetupCse";
import SummarizeDocument from "../pages/cse/SummarizeDocument";
import AboutFindex from "../pages/findex/AboutFindex";
import IndexDatabase from "../pages/findex/IndexDatabase";
import InstantiateFindex from "../pages/findex/InstantiateFindex";
import SearchInDatabase from "../pages/findex/SearchInDatabase";
import SetupFindex from "../pages/findex/SetupFindex";
import AboutPKI from "../pages/pki/AboutPKI";
import DecryptDataPKI from "../pages/pki/DecryptDataPKI";
import EncryptDataPki from "../pages/pki/EncryptDataPki";
import GetCertificate from "../pages/pki/GetCertificate";
import GrantAccess from "../pages/pki/GrantAccess";
import ImportAndUnwrapUDK from "../pages/pki/ImportAndUnwrapUDK";
import SendWrappedDecryptionKey from "../pages/pki/SendWrappedDecryptionKey";
import SetupPki from "../pages/pki/SetupPki";
import UploadCert from "../pages/pki/UploadCert";

export type pageSetupRecord = Record<string, string[]>;
export interface Page {
  path: string;
  title: string;
  component: JSX.Element;
}
export interface Pages {
  [key: string]: Page[];
}

export const pagesConfig: Pages = {
  /**
   * To add a new page, you need to add a new entry in the object below.
   * The key is the path of the page, the value is an object with the following properties:
   * - path: the path of the page
   * - title: the title of the page
   * - component: the component to render
   *
   * Note that the title of the top level pages will be automatically generated from the path to avoid more complexity.
   * If you want to avoid this behavior, add a special case in the function getLabelFromPageName in src/utils/navigationConfig.tsx
   */

  overview: [
    {
      path: "overview",
      title: "Overview",
      component: <OverView />,
    },
  ],
  "encrypt-with-access-policies": [
    {
      path: "about-covercrypt",
      title: "About Covercrypt",
      component: <AboutCovercrypt />,
    },
    {
      path: "set-up-service",
      title: "Set up the service",
      component: <SetupCovercrypt />,
    },
    {
      path: "create-policy",
      title: "Create an encryption policy",
      component: <CreateEncryptionPolicy />,
    },
    {
      path: "generate-master-key-pair",
      title: "Generate a master key pair",
      component: <CreateMasterKeyPair />,
    },
    {
      path: "encrypt-data",
      title: "Encrypt data",
      component: <EncryptData />,
    },
    {
      path: "user-decryption-key",
      title: "Generate a user decryption key",
      component: <GenerateUDK />,
    },
    {
      path: "decrypt-data",
      title: "Decrypt data",
      component: <DecryptData />,
    },
  ],
  "build-encrypted-indexes": [
    {
      path: "about-findex",
      title: "About Findex",
      component: <AboutFindex />,
    },
    {
      path: "set-up-service",
      title: "Set up the service",
      component: <SetupFindex />,
    },
    {
      path: "instantiate-findex",
      title: "Instantiate Findex",
      component: <InstantiateFindex />,
    },
    {
      path: "index-database",
      title: "Index the database",
      component: <IndexDatabase />,
    },
    {
      path: "search-in-database",
      title: "Search in the database",
      component: <SearchInDatabase />,
    },
  ],
  "distibute-keys": [
    {
      path: "about-pki",
      title: "About PKI",
      component: <AboutPKI />,
    },
    {
      path: "set-up-service",
      title: "Set up the service",
      component: <SetupPki />,
    },
    {
      path: "encrypt-data",
      title: "Encrypt data",
      component: <EncryptDataPki />,
    },
    {
      path: "save-sk-publish-certificate",
      title: "Save the secret key and publish the certificate",
      component: <UploadCert />,
    },
    {
      path: "grant-access",
      title: "Grant access",
      component: <GrantAccess />,
    },
    {
      path: "retrieve-wrapped-decryption-key",
      title: "Retrieve the wrapped decryption key",
      component: <GetCertificate />,
    },
    {
      path: "send-key-in-kms",
      title: "Send the key in KMS",
      component: <SendWrappedDecryptionKey />,
    },
    {
      path: "unwrap-decryption-key",
      title: "Import and unwrap the decryption key",
      component: <ImportAndUnwrapUDK />,
    },
    {
      path: "decrypt-data",
      title: "Decrypt data",
      component: <DecryptDataPKI />,
    },
  ],
  "confidential-vm": [
    {
      path: "about-cosmian-vm",
      title: "About Cosmian VM",
      component: <UseConfidentialVm />,
    },
    {
      path: "deploy-application",
      title: "Deploy an application",
      component: <DeployApplication />,
    },
    {
      path: "snapshot-cosmian-vm",
      title: "Snapshot Cosmian VM",
      component: <SnapshotVm />,
    },
    {
      path: "audit-snapshot",
      title: "Audit the snapshot",
      component: <AuditSnapshot />,
    },
    {
      path: "verify-integrity",
      title: "Verify the integrity",
      component: <VerifyIntegrity />,
    },
    {
      path: "detect-malicious-activities",
      title: "Detect malicious activities",
      component: <DetectMalware />,
    },
  ],
  "client-side-encryption": [
    {
      path: "about-cse",
      title: "About CSE",
      component: <AboutCse />,
    },
    {
      path: "set-up-service",
      title: "Set up the service",
      component: <SetupCse />,
    },
    {
      path: "get-summary",
      title: "Get a summary",
      component: <SummarizeDocument />,
    },
  ],
};
