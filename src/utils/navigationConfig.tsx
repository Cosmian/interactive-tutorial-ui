import { Pages, pagesConfig } from "./pageConfig";

export type NavigationConfig = Record<string, NavigationItem>;

export type NavigationItem = {
  key: number;
  label: string;
  children?: Record<string, NavigationItem>;
  footerNavigation?: boolean;
  done?: boolean;
};

const generateNaviationConfig = (pagesConfig: Pages): NavigationConfig => {
  const menuWithCategories: NavigationConfig = {};
  let topIndex = 0;
  for (const [key, value] of Object.entries(pagesConfig)) {
    // the title of the top level pages will be automatically generated from the path to avoid more complexity.
    // If you want to avoid this behavior, add a special case in the function getLabelFromPageName in src/utils/navigationConfig.tsx
    const autogenPageTitle: string = getLabelFromPageName(key);
    menuWithCategories[key] = {
      key: topIndex++,
      label: autogenPageTitle,
    };
    if (value.length > 1) {
      for (const [btmIndex, page] of value.entries()) {
        menuWithCategories[key].children = {
          ...menuWithCategories[key].children,
          [page.path]: {
            key: btmIndex,
            label: page.title,
            footerNavigation: true,
            done: false,
          },
        };
      }
    }
  }
  return menuWithCategories;
};

function getLabelFromPageName(key: string) {
  /**
   * Exp : encrypt-with-access-policies becomes : Encrypt with Access Policies
   */
  const specialCases: Record<string, string> = {
    "client-side-encryption": "Encrypt Client-Side",
  };
  if (specialCases[key]) return specialCases[key];
  return key
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/vm/g, "VM")
    .replace(/cosmian/g, "Cosmian");
}

export const navigationConfig: NavigationConfig = generateNaviationConfig(pagesConfig);

// export const navigationConfig: NavigationConfig = {
//   overview: {
//     key: 0,
//     label: "Overview",
//   },
//   "encrypt-with-access-policies": {
//     key: 1,
//     label: "Encrypt with Access Policies",
//     children: {
//       "about-covercrypt": {
//         key: 0,
//         label: "About Cosmian Covercrypt",
//         footerNavigation: true,
//         done: false,
//       },
//       "set-up-service": {
//         key: 1,
//         label: "Set up service",
//         footerNavigation: true,
//         done: false,
//       },
//       "create-policy": {
//         key: 2,
//         label: "Create encryption policy",
//         footerNavigation: true,
//         done: false,
//       },
//       "generate-master-key-pair": {
//         key: 3,
//         label: "Generate public and secret master key pair",
//         footerNavigation: true,
//         done: false,
//       },
//       "encrypt-data": {
//         key: 4,
//         label: "Encrypt data",
//         footerNavigation: true,
//         done: false,
//       },
//       "user-decryption-key": {
//         key: 5,
//         label: "Generate user decryption key",
//         footerNavigation: true,
//         done: false,
//       },
//       "decrypt-data": {
//         key: 6,
//         label: "Decrypt data",
//         footerNavigation: true,
//         done: false,
//       },
//     },
//   },
//   "build-encrypted-indexes": {
//     key: 2,
//     label: "Search Encrypted Data",
//     children: {
//       "about-findex": {
//         key: 0,
//         label: "About Cosmian Findex",
//         footerNavigation: true,
//         done: false,
//       },
//       "set-up-service": {
//         key: 1,
//         label: "Set up service",
//         footerNavigation: true,
//         done: false,
//       },
//       "instantiate-findex": {
//         key: 2,
//         label: "Instantiate Findex",
//         footerNavigation: true,
//         done: false,
//       },
//       "index-database": {
//         key: 3,
//         label: "Index database",
//         footerNavigation: true,
//         done: false,
//       },
//       "search-in-database": {
//         key: 4,
//         label: "Search words",
//         footerNavigation: true,
//         done: false,
//       },
//     },
//   },
//   "distibute-keys": {
//     key: 3,
//     label: "Distribute keys",
//     children: {
//       "about-pki": {
//         key: 0,
//         label: "About Cosmian PKI",
//         footerNavigation: true,
//         done: false,
//       },
//       "set-up-service": {
//         key: 1,
//         label: "Set up service",
//         footerNavigation: true,
//         done: false,
//       },
//       "encrypt-data": {
//         key: 2,
//         label: "Encrypt data",
//         footerNavigation: true,
//         done: false,
//       },
//       "save-sk-publish-certificate": {
//         key: 3,
//         label: "Save the Secret Key and publish certificate",
//         footerNavigation: true,
//         done: false,
//       },
//       "grant-access": {
//         key: 4,
//         label: "Grant access",
//         footerNavigation: true,
//         done: false,
//       },
//       "retrieve-wrapped-decryption-key": {
//         key: 5,
//         label: "Get certificate and retrieve wrapped Decryption Key",
//         footerNavigation: true,
//         done: false,
//       },
//       "send-key-in-kms": {
//         key: 6,
//         label: "Send wrapped Decryption Key in Cosmian KMS",
//         footerNavigation: true,
//         done: false,
//       },
//       "unwrap-decryption-key": {
//         key: 7,
//         label: "Import and unwrap Decryption Key",
//         footerNavigation: true,
//         done: false,
//       },
//       "decrypt-data": {
//         key: 8,
//         label: "Decrypt data",
//         footerNavigation: true,
//         done: false,
//       },
//     },
//   },
//   "confidential-vm": {
//     key: 4,
//     label: "Compute using Encrypted Code and Data",
//     children: {
//       "about-cosmian-vm": {
//         key: 0,
//         label: "About Cosmian VM",
//         footerNavigation: true,
//         done: false,
//       },
//       "deploy-application": {
//         key: 1,
//         label: "Deploy the application and configure Cosmian VM",
//         footerNavigation: true,
//         done: false,
//       },
//       "snapshot-cosmian-vm": {
//         key: 2,
//         label: "Snapshot the Cosmian VM",
//         footerNavigation: true,
//         done: false,
//       },
//       "audit-snapshot": {
//         key: 3,
//         label: "Audit the snapshot",
//         footerNavigation: true,
//         done: false,
//       },
//       "verify-integrity": {
//         key: 4,
//         label: "Verify Cosmian VM integrity",
//         footerNavigation: true,
//         done: false,
//       },
//       "detect-malicious-activities": {
//         key: 5,
//         label: "Detect malicious activities",
//         footerNavigation: true,
//         done: false,
//       },
//     },
//   },
//   "client-side-encryption": {
//     key: 4,
//     label: "Encrypt Client-Side",
//     children: {
//       "about-cse": {
//         key: 0,
//         label: "About Client-side Encryption",
//         footerNavigation: true,
//         done: false,
//       },
//       "set-up-service": {
//         key: 1,
//         label: "Verify AI service",
//         footerNavigation: true,
//         done: false,
//       },
//       "get-summary": {
//         key: 2,
//         label: "Get summary",
//         footerNavigation: true,
//         done: false,
//       },
//     },
//   },
// };

// console.log(navigationConfig);
// console.log(navigationConfig2);
// console.log("navigationConfig === navigationConfig2", navigationConfig === navigationConfig2);
