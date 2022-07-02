import React from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isShowingModalState, tokenState } from "../../recoil/atom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import RegisterProjectModal from "../RegisterProjectModal/RegisterProjectModal";
import Topbar from "../Topbar/Topbar";

export default function Layout() {
  const token = useRecoilValue(tokenState);
  const isShowingModal = useRecoilValue(isShowingModalState);

  return (
    <div>
      <Topbar />
      {token ? <Navbar /> : "로그인 하세요"}
      <Routes>
        <Route path="/" element={<Home />} />
        {isShowingModal && (
          <Route path="/project" element={<RegisterProjectModal />} />
        )}
      </Routes>
    </div>
  );
}
