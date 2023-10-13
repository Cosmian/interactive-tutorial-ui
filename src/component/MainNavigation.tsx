import React, { useState } from "react";
import { HiChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useBoundStore } from "../store/store";

export const MainNavigation = () => {
  const [hidden, setHidden] = useState(false);
  const origin = window.location.origin;
  const ititialSteps = useBoundStore((store) => store.steps);

  return (
    <nav role="navigation" className={`main-navigation ${hidden ? "hidden" : ""}`}>
      <button onClick={() => setHidden(!hidden)} className="close-btn">
        {hidden ? <HiChevronDoubleLeft /> : <HiOutlineChevronDoubleRight />}
      </button>
      <ul>
        {ititialSteps.map((item, idx) => {
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
                      <div className="outer" key={idx + "sub" + subIdx}>
                        <li>
                          <Link to={origin + "/" + item.key + "/" + subitem.key}>{subitem.label}</Link>
                        </li>
                      </div>
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
