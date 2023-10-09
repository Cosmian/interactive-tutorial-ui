import { Button, CosmianLogo, Header } from "cosmian_ui";
import { Link, Outlet } from "react-router-dom";
import { navigationConfig } from "../utils/navigationConfig";
import { MainNavigation } from "./MainNavigation";
import "./layout.less";

const Layout = () => {
  return (
    <div className="layout">
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
      <footer>
        <FooterNavigation />
      </footer>
    </div>
  );
};

export default Layout;

const FooterNavigation = () => {
  return (
    <div className="footer">
      <Button type="outline">Previous step</Button>
      <Button type="dark">Next step: xxxxxxxxx</Button>
    </div>
  );
};
