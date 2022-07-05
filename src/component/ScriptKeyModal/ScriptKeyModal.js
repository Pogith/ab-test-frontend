import React from "react";
import { useParams } from "react-router-dom";

import Modal from "../common/Modal/Modal";
import ModalPortal from "../common/ModalPortal/ModalPortal";

export default function ScriptKeyModal() {
  const { projectId, uniqId } = useParams();

  return (
    <ModalPortal>
      <Modal
        message={<p>{uniqId} script 경로</p>}
        redirectLink={`/user/project/${projectId}`}
      />
    </ModalPortal>
  );
}
