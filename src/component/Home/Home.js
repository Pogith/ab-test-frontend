import React from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { firebaseUserState, tokenState } from "../../recoil/atom";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export default function Home() {
  const userUid = useRecoilValue(firebaseUserState);
  const token = useRecoilValue(tokenState);

  return (
    <div className={cx("home__wrapper")}>
      {token ? (
        <>
          <Link className={cx("home__project")} to="/project">
            <div className={cx("home__project__item")}>Register Project</div>
          </Link>
          <Link className={cx("home__userpage")} to={`/user/${userUid}`}>
            <div className={cx("home__userpage__item")}>My Page</div>
          </Link>
        </>
      ) : (
        <div className={cx("home__message")}>Login Please</div>
      )}
    </div>
  );
}
