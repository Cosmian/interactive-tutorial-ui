export type NavigationItem = {
  key: number;
  url: string;
  label: string;
  children?: Record<string, NavigationItem>;
  footerNavigation?: boolean;
  done?: boolean;
};

export type NavigationConfig = Record<string, NavigationItem>;

export const navigationConfig: NavigationConfig = {
  "client-side-encryption": {
    key: 0,
    url: "client-side-encryption",
    label: "Cosmian Client-side Encryption",
  },
  "encrypt-with-access-policies": {
    key: 1,
    url: "encrypt-with-access-policies",
    label: "Encrypt with Access Policies",
    children: {
      "about-covercrypt": {
        key: 0,
        url: "about-covercrypt",
        label: "About Cosmian Covercrypt",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        url: "set-up-service",
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "create-policy": {
        key: 2,
        url: "create-policy",
        label: "Create encryption policy",
        footerNavigation: true,
        done: false,
      },
      "generate-master-key-pair": {
        key: 3,
        url: "generate-master-key-pair",
        label: "Generate public and secret master key pair",
        footerNavigation: true,
        done: false,
      },
      "encrypt-data": {
        key: 4,
        url: "encrypt-data",
        label: "Encrypt data",
        footerNavigation: true,
        done: false,
      },
      "user-decryption-key": {
        key: 5,
        url: "user-decryption-key",
        label: "Generate user decryption key",
        footerNavigation: true,
        done: false,
      },
      "decrypt-data": {
        key: 6,
        url: "decrypt-data",
        label: "Decrypt data",
        footerNavigation: true,
        done: false,
      },
    },
  },
  "build-encrypted-indexes": {
    key: 2,
    url: "build-encrypted-indexes",
    label: "Build Encrypted Indexes",
    children: {
      "about-findex": {
        key: 0,
        url: "about-findex",
        label: "About Cosmian Findex",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        url: "set-up-service",
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "generate-findex-key": {
        key: 2,
        url: "generate-findex-key",
        label: "Generate Findex key",
        footerNavigation: true,
        done: false,
      },
      labelling: {
        key: 3,
        url: "labelling",
        label: "Labeling: salting the encryption",
        footerNavigation: true,
        done: false,
      },
      callbacks: {
        key: 4,
        url: "callbacks",
        label: "Define callbacks",
        footerNavigation: true,
        done: false,
      },
      "index-database": {
        key: 5,
        url: "index-database",
        label: "Index database",
        footerNavigation: true,
        done: false,
      },
      "search-in-database": {
        key: 6,
        url: "search-in-database",
        label: "Search words in database",
        footerNavigation: true,
        done: false,
      },
    },
  },
  "distibute-keys": {
    key: 3,
    url: "distibute-keys",
    label: "Distribute keys between clients",
    children: {
      "about-pki": {
        key: 0,
        url: "about-pki",
        label: "About Cosmian PKI",
        footerNavigation: true,
        done: false,
      },
      "set-up-service": {
        key: 1,
        url: "set-up-service",
        label: "Set up service",
        footerNavigation: true,
        done: false,
      },
      "encrypt-data": {
        key: 2,
        url: "encrypt-data",
        label: "Encrypt data",
        footerNavigation: true,
        done: false,
      },
      "save-sk-publish-certificate": {
        key: 3,
        url: "save-sk-publish-certificate",
        label: "Save the Secret Key and publish certificate",
        footerNavigation: true,
        done: false,
      },
      "grant-access": {
        key: 4,
        url: "grant-access",
        label: "Grant access",
        footerNavigation: true,
        done: false,
      },
      "retrieve-wrapped-decryption-key": {
        key: 5,
        url: "retrieve-wrapped-decryption-key",
        label: "Get certificate and retrieve wrapped Decryption Key",
        footerNavigation: true,
        done: false,
      },
      "send-key-in-kms": {
        key: 6,
        url: "send-key-in-kms",
        label: "Send wrapped Decryption Key in Cosmian KMS",
        footerNavigation: true,
        done: false,
      },
      "unwrap-decryption-key": {
        key: 7,
        url: "unwrap-decryption-key",
        label: "Import and unwrap Decryption Key",
        footerNavigation: true,
        done: false,
      },
      "decrypt-data": {
        key: 8,
        url: "decrypt-data",
        label: "Decrypt data",
        footerNavigation: true,
        done: false,
      },
    },
  },
};
