import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isShowingModalState } from "../../recoil/atom";
import Button from "../common/Button/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const setIsCloseModal = useSetRecoilState(isShowingModalState);

  const handleRegisterProjectButtonClick = () => {
    setIsCloseModal(true);
    navigate("/project");
  };

  return (
    <div>
      <Button onClick={handleRegisterProjectButtonClick}>
        A/B test 등록하기
      </Button>
      <Button>나의 테스트 목록</Button>
      <Button>Home</Button>
    </div>
  );
}
