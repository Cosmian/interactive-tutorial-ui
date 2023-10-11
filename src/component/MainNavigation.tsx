import React, { useState } from "react";
import { HiChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

export type ItemType = MenuItem;

export interface MenuItem {
  key: string;
  label: string;
  children: SubMenuItem[];
}
export interface SubMenuItem {
  key: string;
  label: string;
  footerNavigation?: boolean;
  component: JSX.Element;
}

export const MainNavigation: React.FC<{ navigationConfig: ItemType[] }> = ({ navigationConfig }) => {
  const [hidden, setHidden] = useState(false);
  const origin = window.location.origin;

  return (
    <nav role="navigation" className={`main-navigation ${hidden ? "hidden" : ""}`}>
      <button onClick={() => setHidden(!hidden)} className="close-btn">
        {hidden ? <HiChevronDoubleLeft /> : <HiOutlineChevronDoubleRight />}
      </button>
      <ul>
        {navigationConfig.map((item, idx) => {
          if (item.children == null) {
            return (
              <li key={idx}>
                <Link to={item.key}>{item.label}</Link>
              </li>
            );
          } else {
            return (
              <React.Fragment key={"fragment_" + idx}>
                <li>
                  <Link to={origin + "/" + item.key + "/" + item.children[0].key}>{item.label}</Link>
                </li>
                <li>
                  <ul>
                    {item.children.map((subitem, subIdx) => (
                      <li key={idx + "sub" + subIdx}>
                        <Link to={origin + "/" + item.key + "/" + subitem.key}>{subitem.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </React.Fragment>
            );
          }
        })}
      </ul>
    </nav>
  );
};
