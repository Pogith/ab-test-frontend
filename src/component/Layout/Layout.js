import React from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import classNames from "classnames/bind";

import { isShowingScreenShotState } from "../../recoil/atom";
import Home from "../Home/Home";
import RegisterProjectPage from "../RegisterProjectPage/RegisterProjectPage";
import ScreenShot from "../ScreenShot/ScreenShot";
import ScriptKeyModal from "../ScriptKeyModal/ScriptKeyModal";
import TestResultPage from "../TestResultPage/TestResultPage";
import Topbar from "../Topbar/Topbar";
import UserPage from "../UserPage/UserPage";
import UserProjectPage from "../UserProjectPage/UserProjectPage";
import NotFound from "../NotFound/NotFound";
import styles from "./Layout.module.scss";

const cx = classNames.bind(styles);

export default function Layout() {
  const isShowingScreenShot = useRecoilValue(isShowingScreenShotState);

  return (
    <div>
      {!isShowingScreenShot && <Topbar />}
      <div className={cx("layout")}>
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
            <Route
              path="/user/project/:projectId/:uniqId/screenshot"
              element={<ScreenShot />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
