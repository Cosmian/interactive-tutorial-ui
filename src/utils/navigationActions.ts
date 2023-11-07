import { MenuItem, SubMenuItem } from "./navigationConfig";

export const findCurrentNavigationItem = (steps: MenuItem[]): SubMenuItem | undefined => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentItem = steps.find((item) => item.key === paths[0]);
  if (parentItem != null && parentItem.children != null) {
    const index = parentItem.children.findIndex((subItem) => subItem.key === paths[1]);
    return parentItem.children[index];
  }
};

type ItemsFound = {
  previous: SubMenuItem | undefined;
  next: SubMenuItem | undefined;
};
export const findNavigationItems = (steps: MenuItem[]): ItemsFound | undefined => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const parentItem = steps.find((item) => item.key === paths[0]);
  if (parentItem != null && parentItem.children != null) {
    const index = parentItem.children.findIndex((subItem) => subItem.key === paths[1]);
    return {
      previous: index > 0 ? parentItem.children[index - 1] : undefined,
      next: index ? parentItem.children[index + 1] : undefined,
    };
  }
};

export const updateNavigationSteps = (initialSteps: MenuItem[], updateSteps: (newSteps: MenuItem[]) => void): void => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const stepsCopy = initialSteps;
  const parentIndex = initialSteps.findIndex((item) => item.key === paths[0]);
  if (initialSteps[parentIndex].children != null && stepsCopy[parentIndex].children != null) {
    const subIndex = (initialSteps[parentIndex].children as SubMenuItem[]).findIndex((subItem) => subItem.key === paths[1]);
    if ((stepsCopy[parentIndex].children as SubMenuItem[])[subIndex] != null) {
      (stepsCopy[parentIndex].children as SubMenuItem[])[subIndex] = {
        ...(stepsCopy[parentIndex].children as SubMenuItem[])[subIndex],
        done: true,
      };
      (stepsCopy[parentIndex].children as SubMenuItem[])[subIndex - 1] = {
        ...(stepsCopy[parentIndex].children as SubMenuItem[])[subIndex - 1],
        done: true,
      };
    }
    updateSteps(stepsCopy);
  }
};
