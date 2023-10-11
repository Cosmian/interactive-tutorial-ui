import { ItemType } from "../component/MainNavigation";
import CovercryptSetup from "../pages/CovercryptSetup";
import CreateEncryptionPolicy from "../pages/CreateAncryptionPolicy";

export const navigationConfig: ItemType[] = [
  {
    key: "cosmian-for-saas-applications",
    label: "Cosmian for Saas Application",
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
    key: "attributed-base-encryption",
    label: "Attribute-based Encryption with Covercrypt",
    children: [
      {
        key: "about-covercrypt",
        label: "About Covercrypt",
        component: <>About covercrypt</>,
        footerNavigation: true,
      },
      {
        key: "set-up-your-service",
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
    ],
  },
  {
    key: "searchable-symmetric-encryption",
    label: "Searchable Symmetric Encryption with Findex",
    children: [
      {
        key: "about-findex",
        label: "About Findex",
        component: <>About Findex</>,
        footerNavigation: true,
      },
      {
        key: "set-up-your-service",
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
    ],
  },
];
