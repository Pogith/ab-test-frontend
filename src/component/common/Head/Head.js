import React from "react";
import classNames from "classnames/bind";

import styles from "./Head.module.scss";

const cx = classNames.bind(styles);

export default function Head({ message }) {
  return (
    <div className={cx("message")}>
      {message}
    </div>
  );
}
