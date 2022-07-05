import React from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { tokenState } from "../../recoil/atom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import RegisterProjectPage from "../RegisterProjectPage/RegisterProjectPage";
import ScriptKeyModal from "../ScriptKeyModal/ScriptKeyModal";
import Topbar from "../Topbar/Topbar";
import UserPage from "../UserPage/UserPage";
import UserProjectPage from "../UserProjectPage/UserProjectPage";

export default function Layout() {
  const token = useRecoilValue(tokenState);

  return (
    <div>
      <Topbar />
      {token ? <Navbar /> : "로그인 하세요"}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<RegisterProjectPage />} />
        <Route path="/user/:uid" element={<UserPage />} />
        <Route path="/user/project/:projectId" element={<UserProjectPage />} />
        <Route path="/user/project/:projectId/:uniqId" element={<ScriptKeyModal />} />
      </Routes>
    </div>
  );
}
