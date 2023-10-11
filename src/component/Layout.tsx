import { Button, CosmianLogo, Header } from "cosmian_ui";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { navigationConfig } from "../utils/navigationConfig";
import { MainNavigation, SubMenuItem } from "./MainNavigation";
import "./layout.less";

const Layout = () => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const navigationSubItem = findNavigationSubItem(paths);
  const footerNavigation = navigationSubItem?.footerNavigation;
  return (
    <div className={`layout ${footerNavigation ? "with-footer" : ""}`}>
      <Header
        mainLogo={
          <Link to={window.location.origin}>
            <CosmianLogo />
          </Link>
        }
        title="Intervactive demonstration"
        userMenu={<Button>Logout</Button>}
      />
      <div className="content">
        <MainNavigation navigationConfig={navigationConfig} />
        <Outlet />
      </div>
      {footerNavigation && <FooterNavigation />}
    </div>
  );
};

export default Layout;

const FooterNavigation = () => {
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
        <Button type="outline" onClick={() => goTo(previousItem.key)}>
          Previous: {previousItem.label}
        </Button>
      )}
      {nextItem && (
        <Button type="dark" onClick={() => goTo(nextItem.key)}>
          Next: {nextItem.label}
        </Button>
      )}
    </div>
  );
};

const findNavigationSubItem = (paths: string[]) => {
  const parentItem = navigationConfig.find((item) => item.key === paths[0]);
  if (parentItem != null) {
    const childrenItem = parentItem.children.find((item) => item.key === paths[1]) as SubMenuItem;
    return childrenItem;
  }
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
