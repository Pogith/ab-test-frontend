import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { BiWindows } from "react-icons/bi";
import classNames from "classnames/bind";

import { firebaseUserState } from "../../recoil/atom";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import styles from "./Topbar.module.scss";

const cx = classNames.bind(styles);

export default function Topbar() {
  const navigate = useNavigate();
  const userUid = useRecoilValue(firebaseUserState);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const topbarItems = [
    {
      text: "Home",
      path: "/",
      section: "",
    },
    {
      text: "Register",
      path: "/project",
      section: "project",
    },
    {
      text: "My Page",
      path: `/user/${userUid}`,
      section: "user",
    },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];
    const activeItem = topbarItems.findIndex(
      (item) => item.section === currentPath
    );

    setActiveIndex(currentPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const handleHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <div className={cx("topbar")}>
      <div className={cx("topbar__wrapper")}>
        <div className={cx("topbar__left")}>
          <div className={cx("topbar__logo")} onClick={handleHomeButtonClick}>
            <BiWindows size="30px" />
            <span className={cx("topbar__logo__title")}>A/B test</span>
          </div>
        </div>
        <div className={cx("topbar__menu")}>
          {!userUid ? (
            <div className={cx("topbar__menu__message")}>로그인해주세요</div>
          ) : (
            <>
              {topbarItems.map((item, index) => (
                <Link
                  className={cx("topbar__menu__link")}
                  to={item.path}
                  key={index}
                >
                  <div
                    className={cx("topbar__menu__item")}
                    style={{
                      color: `${activeIndex === index ? "red" : "white"}`,
                    }}
                  >
                    <div className={cx("topbar__menu__item__text")}>
                      {item.text}
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
          <div className={cx("topbar__right")}>
            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
