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

export const generateComponentsList = (pagesConfig: Pages): Record<string, JSX.Element> => {
  const componentsList: Record<string, JSX.Element> = {};
  for (const [key, value] of Object.entries(pagesConfig)) {
    if (pagesConfig[key].length === 1) {
      componentsList[key] = value[0].component;
      continue;
    }
    for (let i = 0; i < value.length; i++) {
      componentsList[key + "/" + value[i].path] = value[i].component;
    }
  }
  return componentsList;
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
