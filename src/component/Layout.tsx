import { Button, CosmianLogo, Header } from "cosmian_ui";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link, Outlet } from "react-router-dom";
import { navigationConfig } from "../utils/navigationConfig";
import { FooterNavigation } from "./Footer";
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
        title="Client-side Encryption – Intervactive demonstration"
        userMenu={
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <ExternalLink link="https://docs.cosmian.com">Documentation</ExternalLink>
            <ExternalLink link="https://github.com/Cosmian/saas-applications-examples">GitHub repository</ExternalLink>
            <Button rightIcon={<IoLogOutOutline size={18} style={{ marginBottom: -4 }} />} style={{ marginLeft: 20 }}>
              Logout
            </Button>
          </div>
        }
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

const ExternalLink = ({ children, link }: { children: React.ReactNode; link: string }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="external-link">
      <span>{children}</span>
      <LiaExternalLinkAltSolid size={18} />
    </a>
  );
};

const findNavigationSubItem = (paths: string[]) => {
  const parentItem = navigationConfig.find((item) => item.key === paths[0]);
  if (parentItem != null) {
    const childrenItem = parentItem.children.find((item) => item.key === paths[1]) as SubMenuItem;
    return childrenItem;
  }
};
