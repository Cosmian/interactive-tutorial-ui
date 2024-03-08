import { routePaths, routePathsConfig } from "./routePathsConfig";

export type NavigationConfig = Record<string, NavigationItem>;

export type NavigationItem = {
  key: number;
  label: string;
  children?: Record<string, NavigationItem>;
  footerNavigation?: boolean;
  done?: boolean;
};

const generateNaviationConfig = (routePathsConfig: routePaths): NavigationConfig => {
  /**
   * Produces the legacy navigationConfig object from the routePathsConfig centralised object.
   * routePathsConfig is defined in src/utils/routePathsConfig.tsx
   * The navigationConfig object is used in src/Router.tsx to generate the navigation routes.
   */
  const menuWithCategories: NavigationConfig = {};
  let topIndex = 0; //
  for (const [keyString, valueArr] of Object.entries(routePathsConfig)) {
    // the label of the top level pages will be automatically generated from the path to avoid more complexity.
    // If you want to avoid this behavior, add a special case in the function getLabelFromPageName in src/utils/navigationConfig.tsx
    menuWithCategories[keyString] = {
      key: topIndex++,
      label: routePathsConfig[keyString][0].label || getLabelFromPageName(keyString),
    };
    if (valueArr.length > 1) {
      for (const [btmIndex, page] of valueArr.entries()) {
        menuWithCategories[keyString] = {
          ...menuWithCategories[keyString],
          [page.path]: {
            key: btmIndex,
            label: page.label,
            footerNavigation: true,
            done: false,
          },
        };
      }
    }
  }
  return menuWithCategories;
};

export const generateComponentsList = (routePathsConfig: routePaths): Record<string, JSX.Element> => {
  const componentsList: Record<string, JSX.Element> = {};
  for (const [key, value] of Object.entries(routePathsConfig)) {
    if (routePathsConfig[key].length === 1) {
      componentsList[key] = value[0].component || <></>;
      continue;
    }
    for (let i = 0; i < value.length; i++) {
      componentsList[key + "/" + value[i].path] = value[i].component || <></>;
    }
  }
  return componentsList;
};

function getLabelFromPageName(key: string): string {
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

export const navigationConfig: NavigationConfig = generateNaviationConfig(routePathsConfig);
