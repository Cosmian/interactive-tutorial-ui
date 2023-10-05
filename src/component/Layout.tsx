import { Button, CosmianLogo, Header } from "cosmian_ui";
import { useState } from "react";
import { HiChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.less";

const Layout = () => {
  return (
    <div className="layout">
      <Header mainLogo={<CosmianLogo />} title="Intervactive demonstration" userMenu={<Button>Logout</Button>} />
      <main>
        <MainNavigation />
        <Outlet />
      </main>
      <footer>
        <FooterNavigation />
      </footer>
    </div>
  );
};

export default Layout;

// TODO: replace X and burger icons by >>> triple chevrons

const MainNavigation = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  return (
    <div className={`main-navigation ${hidden ? "hidden" : ""}`}>
      <button onClick={() => setHidden(!hidden)} className="close-btn">
        {hidden ? <HiChevronDoubleLeft /> : <HiOutlineChevronDoubleRight />}
      </button>
      <ul>
        {navigationConfig.map((item) => {
          if (item.children == null) {
            return <li onClick={() => navigate(item.key)}>{item.label}</li>;
          } else {
            return (
              <>
                <li onClick={() => navigate(item.key + "/" + item.children[0].key)}>{item.label}</li>
                <li>
                  <ul>
                    {item.children.map((subitem) => (
                      <li onClick={() => navigate(item.key + "/" + subitem.key)}>{subitem.label}</li>
                    ))}
                  </ul>
                </li>
              </>
            );
          }
        })}
      </ul>
    </div>
  );
};

const FooterNavigation = () => {
  return (
    <div className="footer">
      <Button type="outline">Previous step</Button>
      <Button type="dark">Next step: xxxxxxxxx</Button>
    </div>
  );
};

const navigationConfig: ItemType[] = [
  {
    key: "cosmian-for-saas-applications",
    label: "Cosmian for Saas Application",
    children: [
      {
        key: "overview",
        label: "Overview",
      },
    ],
  },
  {
    key: "attributed-base-encryption",
    label: "Attribute-based Encryption with Covercrypt",
    children: [
      {
        key: "about-covercrypt",
        label: "About Covercrypt",
      },
      {
        key: "set-up-your-service",
        label: "Set up your service",
      },
      {
        key: "create-policy",
        label: "Create encryption policy",
      },
    ],
  },
  {
    key: "searchable-symmetric-encryption",
    label: "Searchable Symmetric Encryption with Findex",
    children: [
      {
        key: "about-findex",
        label: "About Findex",
      },
      {
        key: "set-up-your-service",
        label: "Set up your service",
      },
      {
        key: "generate-findex-key",
        label: "Generate Findex key",
      },
    ],
  },
];

type ItemType = SubMenuType;

interface MenuItemType {
  key: string;
  label: string;
}
interface SubMenuType {
  key: string;
  label: string;
  children: MenuItemType[];
}
