import { RoutePaths, routePathsConfig, topSectionTitles } from "./routePathsConfig";

export type NavigationConfig = Record<string, NavigationItem>;

export type NavigationItem = {
  key: number;
  label: string;
  children?: Record<string, NavigationItem>;
  footerNavigation?: boolean;
  done?: boolean;
};

const generateNavigationConfig = (routePathsConfig: RoutePaths): NavigationConfig => {
  /**
   * Produces the legacy navigationConfig object from the routePathsConfig centralised object.
   * routePathsConfig is defined in src/utils/routePathsConfig.tsx
   */
  const menuWithCategories: NavigationConfig = {};
  let topIndex = 0; //
  for (const [keyString, valueArr] of Object.entries(routePathsConfig)) {
    menuWithCategories[keyString] = {
      label: topSectionTitles[topIndex],
      key: topIndex++, // increment the index for the next top section
    };
    if (valueArr.length > 1) {
      // length > 1 means that the page has at least one child
      menuWithCategories[keyString].children = {};
      for (const [arrIndex, page] of valueArr.entries()) {
        // @ts-expect-error at this point of the code we are sure that children is defined, but the TS compiler is not able to understand it
        menuWithCategories[keyString].children[page.path] = {
          key: arrIndex,
          label: page.label,
          footerNavigation: true,
          done: false,
        };
      }
    }
  }
  return menuWithCategories;
};

export const generateComponentsList = (routePathsConfig: RoutePaths): Record<string, JSX.Element> => {
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
    for (const element of valuesArr) {
      componentsList[key + "/" + element.path] = element.component || <>Missing component</>;
    }
  }
  return componentsList;
};

export const navigationConfig: NavigationConfig = generateNavigationConfig(routePathsConfig);
