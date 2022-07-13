import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import classNames from "classnames/bind";

import { firebaseUserState, isShowingScreenShotState } from "../../recoil/atom";
import styles from "./UserProjectPage.module.scss";

const cx = classNames.bind(styles);

export default function UserProjectPage() {
  const navigate = useNavigate();
  const params = useParams();
  const userUid = useRecoilValue(firebaseUserState);
  const [testUrl, setTestUrl] = useState("");
  const [testLists, setTestLists] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

  const setIsShowingScreenShot = useSetRecoilState(isShowingScreenShotState);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL +
            `/users/${userUid}/projects/${params.projectId}/testlists`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTestLists(response);
      } catch (err) {
        console.error("Error", err);
      }
    };

    fetchTestsData();
  }, [isRendering]);

  const handleRegisterTestUrlButtonClick = () => {
    axios
      .post(
        process.env.REACT_APP_SERVER_URL +
          `/users/${userUid}/projects/${params.projectId}/testlists`,
        {
          testUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setIsRendering(!isRendering);
        setTestUrl("");
      })
      .catch((err) => console.error("Error", err));
  };

  const handleTestDeleteButtonClick = (testId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER_URL +
          `/users/${userUid}/projects/${params.projectId}/test/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => setIsRendering(!isRendering))
      .catch((err) => console.error("Error", err));
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
                  to={`/user/project/${params.projectId}/${testData.uniqId}`}
                >
                  script
                </Link>
              </div>
              <div>
                <Link
                  className={cx("test__item__screenshot")}
                  to={`/user/project/${params.projectId}/${testData.uniqId}/screenshot`}
                  onClick={handleShowingScreenShotButtonClick}
                >
                  screen shot
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
