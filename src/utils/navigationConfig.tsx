import { ItemType } from "../component/MainNavigation";
import CovercryptSetup from "../pages/CovercryptSetup";
import CreateEncryptionPolicy from "../pages/CreateAncryptionPolicy";

export const navigationConfig: ItemType[] = [
  {
    key: "client-side-encryption",
    label: "Cosmian Client-side Encryption",
    children: [
      {
        key: "overview",
        label: "Overview",
        component: <>Overview</>,
        footerNavigation: false,
      },
    ],
  },
  {
    key: "encrypt-with-access-policies",
    label: "Encrypt with Access Policies",
    children: [
      {
        key: "about-covercrypt",
        label: "About Cosmian Covercrypt",
        component: <>About covercrypt</>,
        footerNavigation: true,
      },
      {
        key: "set-up-service",
        label: "Set up your service",
        component: <CovercryptSetup />,
        footerNavigation: true,
      },
      {
        key: "create-policy",
        label: "Create encryption policy",
        component: <CreateEncryptionPolicy />,
        footerNavigation: true,
      },
      {
        key: "generate-master-key-pair",
        label: "Generate public and secret master key pair",
        component: <>Generate public and secret master key pair</>,
        footerNavigation: true,
      },
      {
        key: "encrypt-data",
        label: "Encrypt data",
        component: <>Encrypt data</>,
        footerNavigation: true,
      },
      {
        key: "user-decryption-key",
        label: "Generate user decryption key",
        component: <>Generate user decryption key</>,
        footerNavigation: true,
      },
      {
        key: "decrypt-data",
        label: "Decrypt your data",
        component: <>Decrypt your data</>,
        footerNavigation: true,
      },
    ],
  },
  {
    key: "build-encrypted-indexes",
    label: "Build Encrypted Indexes",
    children: [
      {
        key: "about-findex",
        label: "About Cosmian Findex",
        component: <>About Findex</>,
        footerNavigation: true,
      },
      {
        key: "set-up-service",
        label: "Set up your service",
        component: <>Set up your service (findex)</>,
        footerNavigation: true,
      },
      {
        key: "generate-findex-key",
        label: "Generate Findex key",
        component: <>Generate Findex key</>,
        footerNavigation: true,
      },
      {
        key: "labelling",
        label: "Labeling: salting the encryption",
        component: <>Labeling: salting the encryption</>,
        footerNavigation: true,
      },
      {
        key: "callbacks",
        label: "Define callbacks",
        component: <>Define callbacks</>,
        footerNavigation: true,
      },
      {
        key: "index-database",
        label: "Index your database",
        component: <>Index your database</>,
        footerNavigation: true,
      },
      {
        key: "serach-in-database",
        label: "Search words in your database",
        component: <>Search words in your database</>,
        footerNavigation: true,
      },
    ],
  },
  {
    key: "distibute-keys",
    label: "Distribute keys between clients",
    children: [
      {
        key: "about-pki",
        label: "About Cosmian PKI",
        component: <>About Cosmian PKI</>,
        footerNavigation: true,
      },
      {
        key: "set-up-service",
        label: "Set up your service",
        component: <>Set up your service</>,
        footerNavigation: true,
      },
      {
        key: "save-sk-publish-certificate",
        label: "Save the Secret Key and publish certificate",
        component: <>Save the Secret Key and publish certificate</>,
        footerNavigation: true,
      },
      {
        key: "grant-access",
        label: "Grant access",
        component: <>Grant access</>,
        footerNavigation: true,
      },
      {
        key: "retrieve-wrapped-decryption-key",
        label: "Get certificate and retrieve wrapped Decryption Key",
        component: <>Get certificate and retrieve wrapped Decryption Key</>,
        footerNavigation: true,
      },
      {
        key: "send-key-in-kms",
        label: "Send wrapped Decryption Key in Cosmian KMS",
        component: <>Send wrapped Decryption Key in Cosmian KMS</>,
        footerNavigation: true,
      },
      {
        key: "unwrap-decryption-key",
        label: "Import and unwrap Decryption Key",
        component: <>Import and unwrap Decryption Key</>,
        footerNavigation: true,
      },
      {
        key: "decrypt-data",
        label: "Decrypt your data",
        component: <>Decrypt your data</>,
        footerNavigation: true,
      },
    ],
  },
];
