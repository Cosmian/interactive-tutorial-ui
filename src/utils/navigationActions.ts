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
  previous:
    | (NavigationItem & {
        url: string;
      })
    | undefined;
  next:
    | (NavigationItem & {
        url: string;
      })
    | undefined;
};
export const findNavigationItems = (steps: NavigationConfig): ItemsFound | undefined => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentUrl = paths[0];
  const childrenUrl = paths[1];
  const parentItem = steps[parentUrl];
  if (parentItem != null && parentItem.children != null) {
    let previousEntries: [string, NavigationItem] | undefined;
    let nextEntries: [string, NavigationItem] | undefined;
    const subItem = parentItem.children[childrenUrl];
    if (subItem) {
      nextEntries = Object.entries(parentItem.children).find((sub) => sub[1].key === subItem.key + 1);
    }
    if (subItem) {
      previousEntries = Object.entries(parentItem.children).find((sub) => sub[1].key === subItem.key - 1);
    }
    return {
      previous: previousEntries
        ? {
            url: previousEntries[0],
            done: previousEntries[1].done,
            key: previousEntries[1].key,
            label: previousEntries[1].label,
          }
        : undefined,
      next: nextEntries
        ? {
            url: nextEntries[0],
            done: nextEntries[1].done,
            key: nextEntries[1].key,
            label: nextEntries[1].label,
          }
        : undefined,
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
