import { NavigationConfig, NavigationItem } from "./navigationConfig";

export const findCurrentNavigationItem = (steps: NavigationConfig): NavigationItem | undefined => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentUrl = paths[0];
  const childrenUrl = paths[1];
  const parentItem = steps[parentUrl];
  if (parentItem != null && parentItem.children != null) {
    const subItem = parentItem.children[childrenUrl];
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
  const parentItem = steps[parentUrl];
  if (parentItem != null && parentItem.children != null) {
    let previous;
    let next;
    const subItem = parentItem.children[childrenUrl];
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
  const previousItem = Object.values(stepsCopy[parentUrl].children as Record<string, NavigationItem>).find(
    (sub) => sub.key === (stepsCopy[parentUrl].children as Record<string, NavigationItem>)[childrenUrl].key - 1
  );
  if (previousItem) {
    previousItem.done = true;
  }

  // update next items
  const nextItems = Object.values(stepsCopy[parentUrl].children as Record<string, NavigationItem>).filter((sub) => {
    return (stepsCopy[parentUrl].children as Record<string, NavigationItem>)[childrenUrl].key < sub.key;
  });
  nextItems.forEach((nextItem) => (nextItem.done = false));

  // set all
  updateSteps(stepsCopy);
};
