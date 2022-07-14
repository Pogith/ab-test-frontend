import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import classNames from "classnames/bind";

import { firebaseUserState, isShowingModalState } from "../../recoil/atom";
import ModalPortal from "../common/ModalPortal/ModalPortal";
import Modal from "../common/Modal/Modal";
import styles from "./RegisterProjectPage.module.scss";

const cx = classNames.bind(styles);

export default function RegisterProjectPage() {
  const navigate = useNavigate();
  const setIsCloseModal = useSetRecoilState(isShowingModalState);
  const userUid = useRecoilValue(firebaseUserState);
  const [projectName, setProjectName] = useState("");

  const handleProjectRegister = () => {
    if (!projectName) return alert("프로젝트 이름을 입력해주세요!");

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects`,
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
          <>
            <div className={cx("register__title")}>
              <h1>Project Name</h1>
              <div>
                <input
                  className={cx("register__input")}
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="ex) Button color difference"
                />
              </div>
            </div>
            <button
              className={cx("register__button")}
              onClick={handleProjectRegister}
            >
              Register
            </button>
          </>
        }
        redirectLink="/"
      />
    </ModalPortal>
  );
}
