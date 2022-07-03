import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { firebaseUserState } from "../../recoil/atom";

export default function Navbar() {
  const userUid = useRecoilValue(firebaseUserState);

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/project">A/B test 등록</Link>
      </div>
      <div>
        <Link to={`/user/${userUid}`}>나의 테스트 목록</Link>
      </div>
    </div>
  );
}
