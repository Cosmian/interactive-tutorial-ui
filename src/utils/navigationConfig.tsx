import { routePaths, routePathsConfig } from "./routePathsConfig";

export type NavigationConfig = Record<string, NavigationItem>;

export type NavigationItem = {
  key: number;
  label: string;
  children?: Record<string, NavigationItem>;
  footerNavigation?: boolean;
  done?: boolean;
};

const generateNavigationConfig = (routePathsConfig: routePaths): NavigationConfig => {
  /**
   * Produces the legacy navigationConfig object from the routePathsConfig centralised object.
   * routePathsConfig is defined in src/utils/routePathsConfig.tsx
   */
  const menuWithCategories: NavigationConfig = {};
  let topIndex = 0; //
  for (const [keyString, valueArr] of Object.entries(routePathsConfig)) {
    menuWithCategories[keyString] = {
      key: topIndex++,
      // the title of the top level pages will be automatically generated if ever a label is not provided in the routePathsConfig
      label: valueArr[0].label || getLabelFromPagePath(keyString),
    };
    if (valueArr.length > 1) {
      // length > 1 means that the page has at least one child
      menuWithCategories[keyString].children = {};
      for (const [arrIndex, page] of valueArr.entries()) {
        // @ts-expect-error at this point of the code we are sure that children is defined, but the TS compiler is not able to understand it
        menuWithCategories[keyString].children[page.path] = {
          key: arrIndex,
          label: page.label || getLabelFromPagePath(keyString),
          footerNavigation: true,
          done: false,
        };
      }
    }
  }
  return menuWithCategories;
};

export const generateComponentsList = (routePathsConfig: routePaths): Record<string, JSX.Element> => {
  /**
   * Produces the componentsList object from the routePathsConfig centralised object.
   * routePathsConfig is defined in src/utils/routePathsConfig.tsx
   * The componentsList object is used in src/Router.tsx to generate the navigation routes.
   * It simply maps the path to the component to render.
   */
  const componentsList: Record<string, JSX.Element> = {};
  for (const [key, valuesArr] of Object.entries(routePathsConfig)) {
    // if we have no children
    if (valuesArr.length === 1) {
      componentsList[key] = valuesArr[0].component || <>Missing component</>;
      continue;
    }
    // if we have children
    for (let i = 0; i < valuesArr.length; i++) {
      componentsList[key + "/" + valuesArr[i].path] = valuesArr[i].component || <>Missing component</>;
    }
  }
  return componentsList;
};

function getLabelFromPagePath(key: string): string {
  /**
   * fallback utility function if a label is not provided in the routePathsConfig
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

export const navigationConfig: NavigationConfig = generateNavigationConfig(routePathsConfig);
