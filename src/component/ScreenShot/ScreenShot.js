import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import classNames from "classnames/bind";
import { RiHome2Line } from "react-icons/ri";
import PulseLoader from "react-spinners/PulseLoader";

import { firebaseUserState, isShowingScreenShotState } from "../../recoil/atom";
import styles from "./ScreenShot.module.scss";

const cx = classNames.bind(styles);

export default function ScreenShot() {
  const navigate = useNavigate();
  const userUid = useRecoilValue(firebaseUserState);
  const { uniqId } = useParams();
  const [screenshot, setScreenshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const setIsSwhoingScreenShot = useSetRecoilState(isShowingScreenShotState);

  useEffect(() => {
    const fetchScreenShot = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${uniqId}/screen-shot`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setScreenshot(response);
      setIsLoading(true);
    };

    fetchScreenShot();
  }, []);

  const handleCloseScreenShotButtonClick = () => {
    setIsSwhoingScreenShot(false);
    navigate("/");
  };

  return (
    <div className={cx("screenshot")}>
      <PulseLoader
        className={cx("screenshot__loader")}
        loading={!isLoading}
        size={20}
        color={"#017eff"}
      />
      <Link
        className={cx("screenshot__button")}
        to="/"
        onClick={handleCloseScreenShotButtonClick}
      >
        <RiHome2Line />
      </Link>
      {screenshot && (
        <iframe
          className={cx("screenshot__iframe")}
          srcDoc={screenshot?.data}
        ></iframe>
      )}
    </div>
  );
}
