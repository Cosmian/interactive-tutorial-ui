import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons/lib/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Tag } from "antd";
import { Button, CosmianLogo, Header } from "cosmian_ui";
import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link, Outlet } from "react-router-dom";
import { getKmsVersion } from "../actions/javascript/testKmsVersion";
import { useBoundStore } from "../store/store";
import { findCurrentNavigationItem } from "../utils/navigationActions";
import { FooterNavigation } from "./Footer";
import { MainNavigation } from "./MainNavigation";
import "./layout.less";

const Layout = (): JSX.Element => {
  const steps = useBoundStore((state) => state.steps);

  const navigationSubItem = findCurrentNavigationItem(steps);
  const footerNavigation = navigationSubItem?.footerNavigation;
  const { logout } = useAuth0();

  const [healthOK, setHealthOK] = useState(false);
  const ksmToken = useBoundStore((state) => state.kmsToken);

  useEffect(() => {
    handleKMSVersion();
  }, [ksmToken]);

  const handleKMSVersion = async () => {
    if (ksmToken) {
      const version = await getKmsVersion(ksmToken);
      if (version != null) setHealthOK(true);
    }
  };

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
            <KmsHealthTag healthOK={healthOK} />
            <Button
              rightIcon={<IoLogOutOutline size={18} style={{ marginBottom: -4 }} />}
              // style={{ marginLeft: 20 }}
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

const ExternalLink: React.FC<{ children: React.ReactNode; link: string }> = ({ children, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="external-link">
      <span>{children}</span>
      <LiaExternalLinkAltSolid size={18} />
    </a>
  );
};

export const SingleContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="single-content">
      <div className="inner">{children}</div>
    </div>
  );
};

type ImageWrapperProps = {
  children: React.ReactNode;
  maxWidth?: number;
  className?: string;
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

const KmsHealthTag: React.FC<{ healthOK: boolean }> = ({ healthOK }) => {
  return healthOK ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      KMS is up
    </Tag>
  ) : (
    <Tag icon={<CloseCircleOutlined />} color="error">
      KMS is down
    </Tag>
  );
};
