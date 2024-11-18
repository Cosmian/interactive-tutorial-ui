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
import GenerateUserDecryptionKey from "../pages/covercrypt/GenerateUserDecryptionKey";
import RefreshKeys from "../pages/covercrypt/RefreshKeys";
import SetupCovercrypt from "../pages/covercrypt/SetupCovercrypt";
import AboutCse from "../pages/cse/AboutCse";
import ConfigureCse from "../pages/cse/ConfigureCse";
import ConfigureDke from "../pages/cse/ConfigureDke";
import SetupAiRunner from "../pages/cse/SetupAiRunner";
import SummarizeDocument from "../pages/cse/SummarizeDocument";
import AboutFindex from "../pages/findex/AboutFindex";
import EncryptDatabase from "../pages/findex/EncryptDatabase";
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

export interface RoutePath {
  path: string;
  label: string;
  component?: JSX.Element;
}
export interface RoutePaths {
  [key: string]: RoutePath[];
}

export const topSectionTitles = [
  "Overview",
  "Encrypt Client-Side",
  "Search Encrypted Data",
  "Compute using Encrypted Code and Data",
  "Encrypt with Access Policies",
  "Distribute keys",
];

export const routePathsConfig: RoutePaths = {
  /**
   * To add a new page, you need to add a new entry in the object below.
   * The key is the path of the page, the value is an object with the following properties:
   * - path: the path of the page
   * - label: the label of the page
   * - component: the component to render
   *
   */

  overview: [
    {
      path: "overview",
      label: "Overview",
      component: <OverView />,
    },
  ],
  "client-side-encryption": [
    {
      path: "about-cse",
      label: "About Client-side Encryption",
      component: <AboutCse />,
    },
    {
      path: "configure-cse",
      label: "Configure Google CSE",
      component: <ConfigureCse />,
    },
    {
      path: "configure-dke",
      label: "Configure Microsoft DKE",
      component: <ConfigureDke />,
    },
    {
      path: "set-up-ai-runner",
      label: "Set up the AI runner",
      component: <SetupAiRunner />,
    },
    {
      path: "get-summary",
      label: "Get summary",
      component: <SummarizeDocument />,
    },
  ],
  "build-encrypted-indexes": [
    {
      path: "about-findex",
      label: "About Cosmian Findex",
      component: <AboutFindex />,
    },
    {
      path: "set-up-service",
      label: "Set up service",
      component: <SetupFindex />,
    },
    {
      path: "encrypt-database",
      label: "Encrypt database",
      component: <EncryptDatabase />,
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
      label: "Search words",
      component: <SearchInDatabase />,
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
      label: "Deploy the application and configure Cosmian VM",
      component: <DeployApplication />,
    },
    {
      path: "snapshot-cosmian-vm",
      label: "Snapshot the Cosmian VM",
      component: <SnapshotVm />,
    },
    {
      path: "audit-snapshot",
      label: "Audit the snapshot",
      component: <AuditSnapshot />,
    },
    {
      path: "verify-integrity",
      label: "Verify Cosmian VM integrity",
      component: <VerifyIntegrity />,
    },
    {
      path: "detect-malicious-activities",
      label: "Detect malicious activities",
      component: <DetectMalware />,
    },
  ],
  "encrypt-with-access-policies": [
    {
      path: "about-covercrypt",
      label: "About Cosmian Covercrypt",
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
      label: "Generate public and secret master key pair",
      component: <CreateMasterKeyPair />,
    },
    {
      path: "encrypt-data",
      label: "Encrypt data",
      component: <EncryptData />,
    },
    {
      path: "user-decryption-key",
      label: "Generate user decryption key",
      component: <GenerateUserDecryptionKey />,
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
  "distibute-keys": [
    {
      path: "about-pki",
      label: "About Cosmian PKI",
      component: <AboutPKI />,
    },
    {
      path: "set-up-service",
      label: "Set up service",
      component: <SetupPki />,
    },
    {
      path: "encrypt-data",
      label: "Encrypt data",
      component: <EncryptDataPki />,
    },
    {
      path: "save-sk-publish-certificate",
      label: "Save the secret key and publish certificate",
      component: <UploadCert />,
    },
    {
      path: "grant-access",
      label: "Grant access",
      component: <GrantAccess />,
    },
    {
      path: "retrieve-wrapped-decryption-key",
      label: "Get certificate and retrieve wrapped Decryption Key",
      component: <GetCertificate />,
    },
    {
      path: "send-key-in-kms",
      label: "Send wrapped Decryption Key in Cosmian KMS",
      component: <SendWrappedDecryptionKey />,
    },
    {
      path: "unwrap-decryption-key",
      label: "Import and unwrap Decryption Key",
      component: <ImportAndUnwrapUDK />,
    },
    {
      path: "decrypt-data",
      label: "Decrypt data",
      component: <DecryptDataPKI />,
    },
  ],
};
