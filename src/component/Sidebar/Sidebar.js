import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import classNames from "classnames/bind";
import { FcHome, FcAddDatabase } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";

import { firebaseUserState } from "../../recoil/atom";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

export default function Sidebar() {
  const userUid = useRecoilValue(firebaseUserState);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const sidebarItems = [
    {
      text: "Home",
      path: "/",
      logo: <FcHome />,
      section: "",
    },
    {
      text: "Test Register",
      path: "/project",
      logo: <FcAddDatabase />,
      section: "project",
    },
    {
      text: "My Page",
      path: `/user/${userUid}`,
      logo: <VscAccount />,
      section: "user",
    },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarItems.findIndex(
      (item) => item.section === currentPath
    );

    setActiveIndex(currentPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className={cx("sidebar")}>
      <div className={cx("sidebar__menu")}>
        {!userUid ? (
          "로그인을 해주세요"
        ) : (
          <>
            {sidebarItems.map((item, index) => (
              <Link
                className={cx("sidebar__menu__link")}
                to={item.path}
                key={index}
              >
                <div
                  className={cx("sidebar__menu__item")}
                  style={{
                    color: `${activeIndex === index ? "red" : "white"}`,
                  }}
                >
                  <div className={cx("sidebar__menu__item__logo")}>
                    {item.logo}
                  </div>
                  <div className={cx("sidebar__menu__item__text")}>
                    {item.text}
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
