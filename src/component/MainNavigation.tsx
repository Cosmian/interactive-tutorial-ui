import React, { useEffect, useState } from "react";
import { HiChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useBoundStore } from "../store/store";

export const MainNavigation = (): JSX.Element => {
  const params = useParams();
  const [hidden, setHidden] = useState(false);
  const origin = window.location.origin;
  const steps = useBoundStore((state) => state.steps);
  const paths = window.location.pathname.split("/");
  paths.shift();

  useEffect(() => {
    // keep me
    // rerender component when params are changed
  }, [params]);

  return (
    <nav role="navigation" className={`main-navigation ${hidden ? "hidden" : ""}`}>
      <button onClick={() => setHidden(!hidden)} className="close-btn">
        {hidden ? <HiOutlineChevronDoubleRight /> : <HiChevronDoubleLeft />}
      </button>
      <ul>
        {Object.entries(steps).map((item, idx) => {
          const itemKey = item[0];
          const itemValue = item[1];

          if (itemValue.children == null) {
            return (
              <li key={idx}>
                <Link to={origin + "/" + itemKey} className={itemKey === paths[0] ? "active" : ""}>
                  {itemValue.label}
                </Link>
              </li>
            );
          } else {
            return (
              <React.Fragment key={"fragment_" + idx}>
                <li>
                  <Link to={origin + "/" + itemKey + "/" + Object.entries(itemValue.children)[0][0]}>{itemValue.label}</Link>
                </li>
                <li>
                  <ul>
                    {Object.entries(itemValue.children).map((childrenItem, subIdx) => {
                      const childrenItemKey = childrenItem[0];
                      const ChildrenItemValue = childrenItem[1];

                      return (
                        <div className="outer" key={idx + "sub" + subIdx}>
                          <li className={ChildrenItemValue.done ? "done" : ""}>
                            <Link
                              to={origin + "/" + itemKey + "/" + childrenItemKey}
                              className={itemKey === paths[0] && childrenItemKey === paths[1] ? "active" : ""}
                            >
                              {ChildrenItemValue.label}
                            </Link>
                          </li>
                        </div>
                      );
                    })}
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
