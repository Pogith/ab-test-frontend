import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import classNames from "classnames/bind";
import { RiHome2Line } from "react-icons/ri";
import PulseLoader from "react-spinners/PulseLoader";

import { firebaseUserState, isShowingScreenShotState } from "../../recoil/atom";
import { axiosGetRequest } from "../../data/api";
import styles from "./ScreenShot.module.scss";

const cx = classNames.bind(styles);

export default function ScreenShot() {
  const navigate = useNavigate();
  const { uniqId } = useParams();

  const userUid = useRecoilValue(firebaseUserState);
  const setIsSwhoingScreenShot = useSetRecoilState(isShowingScreenShotState);

  const [screenshot, setScreenshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchScreenShot = async () => {
      try {
        const screenShotGetRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${uniqId}/screen-shot`;
        const response = await axiosGetRequest(screenShotGetRequestUrl);

        setScreenshot(response);
        setIsLoading(true);
      } catch (err) {
        console.error("Screenshot Error", err);
      }
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
