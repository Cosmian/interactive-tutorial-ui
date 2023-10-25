import { useAuth0 } from "@auth0/auth0-react";
import { Button, CosmianLogo, Header } from "cosmian_ui";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link, Outlet } from "react-router-dom";
import { SubMenuItem, navigationConfig } from "../utils/navigationConfig";
import { FooterNavigation } from "./Footer";
import { MainNavigation } from "./MainNavigation";
import "./layout.less";

const Layout = (): JSX.Element => {
  const paths = window.location.pathname.split("/");
  paths.shift();
  const navigationSubItem = findNavigationSubItem(paths);
  const footerNavigation = navigationSubItem?.footerNavigation;
  const { logout } = useAuth0();

  const handleLogout = (): void => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className={`layout ${footerNavigation ? "with-footer" : ""}`}>
      <Header
        mainLogo={
          <Link to={window.location.origin}>
            <CosmianLogo />
          </Link>
        }
        title="Client-side Encryption – Interactive tutorial"
        userMenu={
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <ExternalLink link="https://docs.cosmian.com">Documentation</ExternalLink>
            <ExternalLink link="https://github.com/Cosmian/saas-applications-examples">GitHub repository</ExternalLink>
            <Button
              rightIcon={<IoLogOutOutline size={18} style={{ marginBottom: -4 }} />}
              style={{ marginLeft: 20 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        }
      />
      <div className="content">
        <MainNavigation />
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
  if (parentItem != null && parentItem.children != null) {
    const childrenItem = parentItem.children.find((item) => item.key === paths[1]) as SubMenuItem;
    return childrenItem;
  }
};

export const SingleContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="single-content">
      <div className="inner">{children}</div>
    </div>
  );
};

type ImageWrapperProps = {
  children: React.ReactNode;
  maxWidth?: number;
  clasName?: string;
  style?: React.CSSProperties;
};
export const ImageWrapper = ({ children, maxWidth, style, ...rest }: ImageWrapperProps): JSX.Element => {
  return (
    <div
      {...rest}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: maxWidth ? maxWidth : 900,
        margin: "0 auto",
        gap: 30,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
