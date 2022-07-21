import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ImDisplay } from "react-icons/im";
import { GoCode } from "react-icons/go";
import classNames from "classnames/bind";

import { firebaseUserState, isShowingScreenShotState } from "../../recoil/atom";
import {
  axiosGetRequest,
  axiosPostRequest,
  axiosDeleteRequest,
} from "../../data/api";
import styles from "./UserProjectPage.module.scss";

const cx = classNames.bind(styles);

export default function UserProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [testUrl, setTestUrl] = useState("");
  const [testLists, setTestLists] = useState(null);

  const userUid = useRecoilValue(firebaseUserState);
  const setIsShowingScreenShot = useSetRecoilState(isShowingScreenShotState);

  useEffect(() => {
    fetchTestsData();
  }, []);

  const fetchTestsData = async () => {
    try {
      const testDataGetRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${projectId}/testlists`;
      const response = await axiosGetRequest(testDataGetRequestUrl);

      setTestLists(response);
    } catch (err) {
      console.error("TestsData Error", err);
    }
  };

  const handleRegisterTestUrlButtonClick = async () => {
    if (!testUrl) return alert("Url을 입력해주세요!");

    try {
      const testPostRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${projectId}/testlists`;

      await axiosPostRequest(testPostRequestUrl, { testUrl });

      setTestUrl("");
      fetchTestsData();
    } catch (err) {
      console.error("Test Register Error", err);
    }
  };

  const handleTestDeleteButtonClick = async (testId) => {
    try {
      const testDeleteRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${projectId}/test/${testId}`;

      await axiosDeleteRequest(testDeleteRequestUrl);

      fetchTestsData();
    } catch (err) {
      console.error("Test Delete Error", err);
    }
  };

  const handleShowingScreenShotButtonClick = () => {
    setIsShowingScreenShot(true);
  };

  return (
    <div className={cx("test__wrapper")}>
      <div className={cx("test__title")}>
        <h1>Test List</h1>
      </div>
      {testLists?.data.map((testData) => {
        return (
          <div className={cx("test__item")} key={testData._id}>
            <a className={cx("test__item__url")} href={testData.url}>
              {testData.url}
            </a>
            <div className={cx("test__item__wrapper")}>
              <div className={cx("test__item__script")}>
                <Link
                  className={cx("test__item__link")}
                  to={`/user/project/${projectId}/${testData.uniqId}`}
                >
                  <GoCode size={"40px"} />
                </Link>
              </div>
              <div>
                <Link
                  className={cx("test__item__screenshot")}
                  to={`/user/project/${projectId}/${testData.uniqId}/screenshot`}
                  onClick={handleShowingScreenShotButtonClick}
                >
                  <ImDisplay size={"40px"} />
                </Link>
              </div>
              <div>
                <button
                  className={cx("test__item__button")}
                  onClick={() => handleTestDeleteButtonClick(testData._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <input
        className={cx("test__input")}
        type="text"
        value={testUrl}
        onChange={(e) => setTestUrl(e.target.value)}
        placeholder="ex) https://www.abtest.com"
        data-testid="testurl-input"
      />
      <button
        className={cx("test__button")}
        onClick={handleRegisterTestUrlButtonClick}
      >
        +
      </button>
      <div>
        <button
          className={cx("test__backbutton")}
          onClick={() => navigate(`/user/${userUid}`)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
