import { MenuItem } from "./navigationConfig";

export const findPreviousNavigationItem = (paths: string[], steps: MenuItem[]) => {
  const parentItem = steps.find((item) => item.key === paths[0]);
  if (parentItem != null) {
    const index = parentItem.children.findIndex((subitem) => subitem.key === paths[1]);
    if (index > 0) return parentItem.children[index - 1];
  }
};

export const findNextNavigationItem = (paths: string[], steps: MenuItem[]) => {
  const parentItem = steps.find((item) => item.key === paths[0]);
  if (parentItem != null) {
    const index = parentItem.children.findIndex((subitem) => subitem.key === paths[1]);
    return parentItem.children[index + 1];
  }
};

export const updateNavigationSteps = (initialSteps: MenuItem[], updateSteps: (newSteps: MenuItem[]) => void) => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const stepsCopy = initialSteps;
  const parentIndex = initialSteps.findIndex((item) => item.key === paths[0]);
  const subIndex = initialSteps[parentIndex].children.findIndex((subItem) => subItem.key === paths[1]);
  stepsCopy[parentIndex].children[subIndex] = {
    ...stepsCopy[parentIndex].children[subIndex],
    done: true,
  };
  updateSteps(stepsCopy);
};
