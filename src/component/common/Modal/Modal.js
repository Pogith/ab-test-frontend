import React from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import styles from "./Modal.module.scss";
import { isShowingModalState } from "../../../recoil/atom";

const cx = classNames.bind(styles);

export default function Modal({ message }) {
  const navigate = useNavigate();
  const setIsCloseModal = useSetRecoilState(isShowingModalState);

  const handleModalClose = () => {
    setIsCloseModal(false);
    navigate("/");
  };

  return (
    <div className={cx("modal__background")} onClick={handleModalClose}>
      <div className={cx("modal__box")} onClick={(e) => e.stopPropagation()}>
        <div>{message}</div>
        <button onClick={handleModalClose}>취소</button>
      </div>
    </div>
  );
}
