import React from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import classNames from "classnames/bind";

import { tokenState } from "../../recoil/atom";
import Home from "../Home/Home";
import Sidebar from "../Sidebar/Sidebar";
import RegisterProjectPage from "../RegisterProjectPage/RegisterProjectPage";
import ScriptKeyModal from "../ScriptKeyModal/ScriptKeyModal";
import TestResultPage from "../TestResultPage/TestResultPage";
import Topbar from "../Topbar/Topbar";
import UserPage from "../UserPage/UserPage";
import UserProjectPage from "../UserProjectPage/UserProjectPage";
import styles from "./Layout.module.scss";

const cx = classNames.bind(styles);

export default function Layout() {
  const token = useRecoilValue(tokenState);

  return (
    <div>
      <Topbar />
      <div className={cx("layout")}>
        <div className={cx("layout__sidebar")}>
          {token ? <Sidebar /> : "로그인 하세요"}
        </div>
        <div className={cx("layout__content")}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<RegisterProjectPage />} />
            <Route path="/user/:uid" element={<UserPage />} />
            <Route
              path="/user/project/:projectId"
              element={<UserProjectPage />}
            />
            <Route
              path="/user/project/:projectId/:uniqId"
              element={<ScriptKeyModal />}
            />
            <Route
              path="/user/project/result/:projectId"
              element={<TestResultPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
