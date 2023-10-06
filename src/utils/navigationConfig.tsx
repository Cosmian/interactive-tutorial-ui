import { ItemType } from "../component/MainNavigation";
import CovercryptSetup from "../pages/CovercryptSetup";

export const navigationConfig: ItemType[] = [
  {
    key: "cosmian-for-saas-applications",
    label: "Cosmian for Saas Application",
    children: [
      {
        key: "overview",
        label: "Overview",
        component: <>Overview</>,
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
      },
      {
        key: "set-up-your-service",
        label: "Set up your service",
        component: <CovercryptSetup />,
      },
      {
        key: "create-policy",
        label: "Create encryption policy",
        component: <>Create encryption policy</>,
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
      },
      {
        key: "set-up-your-service",
        label: "Set up your service",
        component: <>Set up your service (findex)</>,
      },
      {
        key: "generate-findex-key",
        label: "Generate Findex key",
        component: <>Generate Findex key</>,
      },
    ],
  },
];
