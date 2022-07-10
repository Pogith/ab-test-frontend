import React from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { isShowingModalState } from "../../../recoil/atom";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

export default function Modal({ message, redirectLink }) {
  const navigate = useNavigate();
  const setIsCloseModal = useSetRecoilState(isShowingModalState);

  const handleModalClose = () => {
    setIsCloseModal(false);
    navigate(redirectLink);
  };

  return (
    <div className={cx("modal__background")} onClick={handleModalClose}>
      <div className={cx("modal__box")} onClick={(e) => e.stopPropagation()}>
        {message}
        <button className={cx("modal__button")} onClick={handleModalClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
