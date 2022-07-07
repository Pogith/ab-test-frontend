import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

import { firebaseUserState, isShowingModalState } from "../../recoil/atom";
import ModalPortal from "../common/ModalPortal/ModalPortal";
import Modal from "../common/Modal/Modal";

export default function RegisterProjectPage() {
  const navigate = useNavigate();
  const setIsCloseModal = useSetRecoilState(isShowingModalState);
  const userUid = useRecoilValue(firebaseUserState);
  const [projectName, setProjectName] = useState("");

  const handleProjectRegister = () => {
    if (!projectName) return alert("프로젝트 이름을 입력해주세요!");

    axios
      .post(
        process.env.REACT_APP_SERVER_URL + `/users/${userUid}/projects`,
        {
          projectName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => setIsCloseModal(false))
      .catch((err) => console.error("There is an Error", err));

    navigate("/");
  };

  return (
    <ModalPortal>
      <Modal
        message={
          <div>
            <h1>프로젝트 이름</h1>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="ex) Button color difference"
            />
            <button onClick={handleProjectRegister}>등록하기</button>
          </div>
        }
        redirectLink="/"
      />
    </ModalPortal>
  );
}
