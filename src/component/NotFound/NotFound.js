import React from "react";
import classNames from "classnames/bind";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

export default function NotFound() {
  return (
    <div className={cx("message")}>
      404 Not found
    </div>
  );
}
