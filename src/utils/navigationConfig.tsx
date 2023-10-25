export interface MenuItem {
  key: string;
  label: string;
  children?: SubMenuItem[];
}
export interface SubMenuItem {
  key: string;
  label: string;
  footerNavigation?: boolean;
  done?: boolean;
}

export const navigationConfig: MenuItem[] = [
  {
    key: "client-side-encryption",
    label: "Cosmian Client-side Encryption",
  },
  {
    key: "encrypt-with-access-policies",
    label: "Encrypt with Access Policies",
    children: [
      {
        key: "about-covercrypt",
        label: "About Cosmian Covercrypt",
        footerNavigation: true,
      },
      {
        key: "set-up-service",
        label: "Set up service",
        footerNavigation: true,
      },
      {
        key: "create-policy",
        label: "Create encryption policy",
        footerNavigation: true,
      },
      {
        key: "generate-master-key-pair",
        label: "Generate public and secret master key pair",
        footerNavigation: true,
      },
      {
        key: "encrypt-data",
        label: "Encrypt data",
        footerNavigation: true,
      },
      {
        key: "user-decryption-key",
        label: "Generate user decryption key",
        footerNavigation: true,
      },
      {
        key: "decrypt-data",
        label: "Decrypt data",
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
        footerNavigation: true,
      },
      {
        key: "set-up-service",
        label: "Set up service",
        footerNavigation: true,
      },
      {
        key: "generate-findex-key",
        label: "Generate Findex key",
        footerNavigation: true,
      },
      {
        key: "labelling",
        label: "Labeling: salting the encryption",
        footerNavigation: true,
      },
      {
        key: "callbacks",
        label: "Define callbacks",
        footerNavigation: true,
      },
      {
        key: "index-database",
        label: "Index database",
        footerNavigation: true,
      },
      {
        key: "search-in-database",
        label: "Search words in database",
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
        footerNavigation: true,
      },
      {
        key: "set-up-service",
        label: "Set up service",
        footerNavigation: true,
      },
      {
        key: "encrypt-data",
        label: "Encrypt data",
        footerNavigation: true,
      },
      {
        key: "save-sk-publish-certificate",
        label: "Save the Secret Key and publish certificate",
        footerNavigation: true,
      },
      {
        key: "grant-access",
        label: "Grant access",
        footerNavigation: true,
      },
      {
        key: "retrieve-wrapped-decryption-key",
        label: "Get certificate and retrieve wrapped Decryption Key",
        footerNavigation: true,
      },
      {
        key: "send-key-in-kms",
        label: "Send wrapped Decryption Key in Cosmian KMS",
        footerNavigation: true,
      },
      {
        key: "unwrap-decryption-key",
        label: "Import and unwrap Decryption Key",
        footerNavigation: true,
      },
      {
        key: "decrypt-data",
        label: "Decrypt data",
        footerNavigation: true,
      },
    ],
  },
];
