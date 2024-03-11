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
import RefreshKeys from "../pages/covercrypt/RefreshKeys";
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

export interface routePath {
  path: string;
  label: string;
  component?: JSX.Element;
}
export interface routePaths {
  [key: string]: routePath[];
}

export const routePathsConfig: routePaths = {
  /**
   * To add a new page, you need to add a new entry in the object below.
   * The key is the path of the page, the value is an object with the following properties:
   * - path: the path of the page
   * - label: the label of the page
   * - component: the component to render
   *
   * Note that the label of the top level pages will be automatically generated from the path to avoid more complexity.
   * If you want to avoid this behavior, add a special case in the function getLabelFromPageName in src/utils/navigationConfig.tsx
   */

  overview: [
    {
      path: "overview",
      label: "Overview",
      component: <OverView />,
    },
  ],
  "encrypt-with-access-policies": [
    {
      path: "about-covercrypt",
      label: "About Covercrypt",
      component: <AboutCovercrypt />,
    },
    {
      path: "set-up-service",
      label: "Set up the service",
      component: <SetupCovercrypt />,
    },
    {
      path: "create-policy",
      label: "Create an encryption policy",
      component: <CreateEncryptionPolicy />,
    },
    {
      path: "generate-master-key-pair",
      label: "Generate a master key pair",
      component: <CreateMasterKeyPair />,
    },
    {
      path: "encrypt-data",
      label: "Encrypt data",
      component: <EncryptData />,
    },
    {
      path: "user-decryption-key",
      label: "Generate an user decryption key",
      component: <GenerateUDK />,
    },
    {
      path: "decrypt-data",
      label: "Decrypt data",
      component: <DecryptData />,
    },
    {
      path: "refresh-keys-for-a-policy",
      label: "Refresh keys for a given policy",
      component: <RefreshKeys />,
    },
  ],
  "build-encrypted-indexes": [
    {
      path: "about-findex",
      label: "About Findex",
      component: <AboutFindex />,
    },
    {
      path: "set-up-service",
      label: "Set up the service",
      component: <SetupFindex />,
    },
    {
      path: "instantiate-findex",
      label: "Instantiate Findex",
      component: <InstantiateFindex />,
    },
    {
      path: "index-database",
      label: "Index the database",
      component: <IndexDatabase />,
    },
    {
      path: "search-in-database",
      label: "Search in the database",
      component: <SearchInDatabase />,
    },
  ],
  "distibute-keys": [
    {
      path: "about-pki",
      label: "About PKI",
      component: <AboutPKI />,
    },
    {
      path: "set-up-service",
      label: "Set up the service",
      component: <SetupPki />,
    },
    {
      path: "encrypt-data",
      label: "Encrypt data",
      component: <EncryptDataPki />,
    },
    {
      path: "save-sk-publish-certificate",
      label: "Save the secret key and publish the certificate",
      component: <UploadCert />,
    },
    {
      path: "grant-access",
      label: "Grant access",
      component: <GrantAccess />,
    },
    {
      path: "retrieve-wrapped-decryption-key",
      label: "Retrieve the wrapped decryption key",
      component: <GetCertificate />,
    },
    {
      path: "send-key-in-kms",
      label: "Send the key in KMS",
      component: <SendWrappedDecryptionKey />,
    },
    {
      path: "unwrap-decryption-key",
      label: "Import and unwrap the decryption key",
      component: <ImportAndUnwrapUDK />,
    },
    {
      path: "decrypt-data",
      label: "Decrypt data",
      component: <DecryptDataPKI />,
    },
  ],
  "confidential-vm": [
    {
      path: "about-cosmian-vm",
      label: "About Cosmian VM",
      component: <UseConfidentialVm />,
    },
    {
      path: "deploy-application",
      label: "Deploy an application",
      component: <DeployApplication />,
    },
    {
      path: "snapshot-cosmian-vm",
      label: "Snapshot Cosmian VM",
      component: <SnapshotVm />,
    },
    {
      path: "audit-snapshot",
      label: "Audit the snapshot",
      component: <AuditSnapshot />,
    },
    {
      path: "verify-integrity",
      label: "Verify the integrity",
      component: <VerifyIntegrity />,
    },
    {
      path: "detect-malicious-activities",
      label: "Detect malicious activities",
      component: <DetectMalware />,
    },
  ],
  "client-side-encryption": [
    {
      path: "about-cse",
      label: "About CSE",
      component: <AboutCse />,
    },
    {
      path: "set-up-service",
      label: "Set up the service",
      component: <SetupCse />,
    },
    {
      path: "get-summary",
      label: "Get a summary",
      component: <SummarizeDocument />,
    },
  ],
};
