import React from "react";
import classNames from "classnames/bind";

import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import styles from "./Topbar.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Topbar() {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <div className={cx("topbar")}>
      <div className={cx("topbar__wrapper")}>
        <div className={cx("topbar__left")}>
          <div className={cx("topbar__logo")} onClick={handleHomeButtonClick}>
            A/B test
          </div>
        </div>
        <div className={cx("topbar__right")}>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}
