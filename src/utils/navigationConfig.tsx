export type NavigationItem = {
  key: number;
  label: string;
  children?: Record<string, NavigationItem>;
  footerNavigation?: boolean;
  done?: boolean;
};
export type NavigationConfig = Record<string, NavigationItem>;

export const navigationConfig: NavigationConfig = {
  overview: {
    key: 0,
    label: "Overview",
  },
  "encrypt-with-access-policies": {
    key: 1,
    label: "Encrypt with Access Policies",
    children: {
      "about-covercrypt": {
        key: 0,
        label: "About Cosmian Covercrypt",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "create-policy": {
        key: 2,
        label: "Create encryption policy",
        footerNavigation: true,
        done: false,
      },
      "generate-master-key-pair": {
        key: 3,
        label: "Generate public and secret master key pair",
        footerNavigation: true,
        done: false,
      },
      "encrypt-data": {
        key: 4,
        label: "Encrypt data",
        footerNavigation: true,
        done: false,
      },
      "user-decryption-key": {
        key: 5,
        label: "Generate user decryption key",
        footerNavigation: true,
        done: false,
      },
      "decrypt-data": {
        key: 6,
        label: "Decrypt data",
        footerNavigation: true,
        done: false,
      },
    },
  },
  "build-encrypted-indexes": {
    key: 2,
    label: "Build Encrypted Indexes",
    children: {
      "about-findex": {
        key: 0,
        label: "About Cosmian Findex",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "generate-findex-key": {
        key: 2,
        label: "Generate Findex key",
        footerNavigation: true,
        done: false,
      },
      labelling: {
        key: 3,
        label: "Labeling: salting the encryption",
        footerNavigation: true,
        done: false,
      },
      callbacks: {
        key: 4,
        label: "Define callbacks",
        footerNavigation: true,
        done: false,
      },
      "index-database": {
        key: 5,
        label: "Index database",
        footerNavigation: true,
        done: false,
      },
      "search-in-database": {
        key: 6,
        label: "Search words in database",
        footerNavigation: true,
        done: false,
      },
    },
  },
  "distibute-keys": {
    key: 3,
    label: "Distribute keys between clients",
    children: {
      "about-pki": {
        key: 0,
        label: "About Cosmian PKI",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "encrypt-data": {
        key: 2,
        label: "Encrypt data",
        footerNavigation: true,
        done: false,
      },
      "save-sk-publish-certificate": {
        key: 3,
        label: "Save the Secret Key and publish certificate",
        footerNavigation: true,
        done: false,
      },
      "grant-access": {
        key: 4,
        label: "Grant access",
        footerNavigation: true,
        done: false,
      },
      "retrieve-wrapped-decryption-key": {
        key: 5,
        label: "Get certificate and retrieve wrapped Decryption Key",
        footerNavigation: true,
        done: false,
      },
      "send-key-in-kms": {
        key: 6,
        label: "Send wrapped Decryption Key in Cosmian KMS",
        footerNavigation: true,
        done: false,
      },
      "unwrap-decryption-key": {
        key: 7,
        label: "Import and unwrap Decryption Key",
        footerNavigation: true,
        done: false,
      },
      "decrypt-data": {
        key: 8,
        label: "Decrypt data",
        footerNavigation: true,
        done: false,
      },
    },
  },
  "confidential-vm": {
    key: 4,
    label: "Use Cosmian VM",
  },
  "client-side-encryption": {
    key: 4,
    label: "Client-side Encryption",
    children: {
      "about-cse": {
        key: 0,
        label: "About Client-side Encryption",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "create-symmetric-key": {
        key: 2,
        label: "Create Symmetric Key",
        footerNavigation: true,
        done: false,
      },
      "encrypt-send-document": {
        key: 3,
        label: "Encrypt and send document",
        footerNavigation: true,
        done: false,
      },
      "decrypt-document": {
        key: 4,
        label: "Decrypt document",
        footerNavigation: true,
        done: false,
      },
    },
  },
};
