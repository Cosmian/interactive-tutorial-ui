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
        {Object.values(steps).map((item, idx) => {
          if (item.children == null) {
            return (
              <li key={idx}>
                <Link to={origin + "/" + item.url} className={item.url === paths[0] ? "active" : ""}>
                  {item.label}
                </Link>
              </li>
            );
          } else {
            return (
              <React.Fragment key={"fragment_" + idx}>
                <li>
                  <Link to={origin + "/" + item.url + "/" + Object.values(item.children)[0].url}>{item.label}</Link>
                </li>
                <li>
                  <ul>
                    {Object.values(item.children).map((subItem, subIdx) => (
                      <div className="outer" key={idx + "sub" + subIdx}>
                        <li className={subItem.done ? "done" : ""}>
                          <Link
                            to={origin + "/" + item.url + "/" + subItem.url}
                            className={item.url === paths[0] && subItem.url === paths[1] ? "active" : ""}
                          >
                            {subItem.label}
                          </Link>
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
