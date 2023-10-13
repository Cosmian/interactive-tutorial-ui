import { Button } from "cosmian_ui";
import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { navigationConfig } from "../utils/navigationConfig";
import { SubMenuItem } from "./MainNavigation";
import "./layout.less";

export const FooterNavigation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [nextItem, setNextItem] = useState<undefined | SubMenuItem>();
  const [previousItem, setPreviousItem] = useState<undefined | SubMenuItem>();

  useEffect(() => {
    const paths = window.location.pathname.split("/");
    paths.shift();
    const previousItemFound = findPreviousNavigationItem(paths);
    setPreviousItem(previousItemFound);
    const nextItemFound = findNextNavigationItem(paths);
    setNextItem(nextItemFound);
  }, [params]);

  const goTo = (path: string): void => {
    navigate(path);
  };

  const previousOnly = previousItem != null && nextItem == null;
  const nextOnly = nextItem != null && previousItem == null;
  return (
    <div className={`footer ${previousOnly ? "left" : ""} ${nextOnly ? "right" : ""}`}>
      {previousItem && (
        <Button type="outline" onClick={() => goTo(previousItem.key)} icon={<IoArrowBackOutline size={18} style={{ marginBottom: -4 }} />}>
          Previous: {previousItem.label}
        </Button>
      )}
      {nextItem && (
        <Button type="dark" onClick={() => goTo(nextItem.key)} rightIcon={<IoArrowForwardOutline size={18} style={{ marginBottom: -4 }} />}>
          Next: {nextItem.label}
        </Button>
      )}
    </div>
  );
};

const findPreviousNavigationItem = (paths: string[]) => {
  const parentItem = navigationConfig.find((item) => item.key === paths[0]);
  if (parentItem != null) {
    const index = parentItem.children.findIndex((subitem) => subitem.key === paths[1]);
    if (index > 0) return parentItem.children[index - 1];
  }
};
const findNextNavigationItem = (paths: string[]) => {
  const parentItem = navigationConfig.find((item) => item.key === paths[0]);
  if (parentItem != null) {
    const index = parentItem.children.findIndex((subitem) => subitem.key === paths[1]);
    return parentItem.children[index + 1];
  }
};
