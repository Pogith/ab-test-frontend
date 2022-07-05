import React from "react";
import classNames from "classnames/bind";

import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import styles from "./Topbar.module.scss";

const cx = classNames.bind(styles);

export default function Topbar() {
  return (
    <div className={cx("topbar")}>
      <div className={cx("topbar__wrapper")}>
        <div className={cx("topbar__left")}>
          <div className={cx("topbar__logo")}>A/B test</div>
        </div>
        <div className={cx("topbar__right")}><GoogleSignIn /></div>
      </div>
    </div>
  );
}
