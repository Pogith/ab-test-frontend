import React from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import Modal from "../common/Modal/Modal";
import ModalPortal from "../common/ModalPortal/ModalPortal";
import styles from "./ScriptKeyModal.module.scss";

const cx = classNames.bind(styles);

export default function ScriptKeyModal() {
  const { projectId, uniqId } = useParams();
  const scriptKey = `<script type="text/javascript" src="https://abtest.click/api/test-page/ab-test?key=${uniqId}></script>`;
  const handleCopyButtonClick = async () => {
    try {
      await window.navigator.clipboard.writeText(scriptKey);

      alert("Script 복사완료!");
    } catch (err) {
      console.error("Copy Error", err);
    }
  };

  return (
    <ModalPortal>
      <Modal
        message={
          <>
            <p className={cx("script__key")}>{scriptKey}</p>
            <button
              className={cx("script__copybutton")}
              onClick={handleCopyButtonClick}
            >
              Copy
            </button>
          </>
        }
        redirectLink={`/user/project/${projectId}`}
      />
    </ModalPortal>
  );
}
