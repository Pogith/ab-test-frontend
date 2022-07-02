import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import classNames from "classnames/bind";

import { firebaseUserState, isShowingModalState } from "../../recoil/atom";
import ModalPortal from "../common/ModalPortal/ModalPortal";
import styles from "./RegisterProjectModal.module.scss";

const cx = classNames.bind(styles);

export default function RegisterProjectModal() {
  const navigate = useNavigate();
  const userUid = useRecoilValue(firebaseUserState);
  const setIsCloseModal = useSetRecoilState(isShowingModalState);
  const [projectName, setProjectName] = useState("");

  const handleModalClose = () => {
    setIsCloseModal(false);
    navigate("/");
  };

  const handleProjectRegister = () => {
    axios.post(
      process.env.REACT_APP_SERVER_URL + `/users/${userUid}/projects`,
      {
        projectName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setIsCloseModal(false);
    navigate("/");
  };

  return (
    <ModalPortal>
      <div className={cx("modal__background")} onClick={handleModalClose}>
        <div className={cx("modal__box")} onClick={(e) => e.stopPropagation()}>
          <h1>프로젝트 이름</h1>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="ex) Button color difference"
          />
          <button onClick={handleProjectRegister}>등록하기</button>
          <button onClick={handleModalClose}>취소</button>
        </div>
      </div>
    </ModalPortal>
  );
}
