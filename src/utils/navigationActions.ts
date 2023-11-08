import { NavigationConfig, NavigationItem } from "./navigationConfig";

export const findCurrentNavigationItem = (steps: NavigationConfig): NavigationItem | undefined => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentItem = Object.values(steps).find((item) => item.url === paths[0]);
  if (parentItem != null && parentItem.children != null) {
    const subItem = Object.values(parentItem.children).find((subItem) => subItem.url === paths[1]);
    return subItem;
  }
};

type ItemsFound = {
  previous: NavigationItem | undefined;
  next: NavigationItem | undefined;
};
export const findNavigationItems = (steps: NavigationConfig): ItemsFound | undefined => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentUrl = paths[0];
  const childrenUrl = paths[1];
  const parentItem = Object.values(steps).find((item) => item.url === parentUrl);
  if (parentItem != null && parentItem.children != null) {
    let previous;
    let next;
    const subItem = Object.values(parentItem.children).find((subItem) => subItem.url === childrenUrl);
    if (subItem) next = Object.values(parentItem.children).find((sub) => sub.key === subItem.key + 1);
    if (subItem && subItem.key > 0) previous = Object.values(parentItem.children).find((sub) => sub.key === subItem.key - 1);
    return {
      previous,
      next,
    };
  }
};

export const updateNavigationSteps = (initialSteps: NavigationConfig, updateSteps: (newSteps: NavigationConfig) => void): void => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentUrl = paths[0];
  const childrenUrl = paths[1];

  // update current step
  const stepsCopy = initialSteps;
  (stepsCopy[parentUrl].children as Record<string, NavigationItem>)[childrenUrl].done = true;

  // update previous items
  const items = findNavigationItems(initialSteps);
  const previousItem = items?.previous;
  if (previousItem) {
    (stepsCopy[parentUrl].children as Record<string, NavigationItem>)[previousItem.url].done = true;
  }

  updateSteps(stepsCopy);
};
