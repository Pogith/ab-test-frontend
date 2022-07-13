import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

import styles from "./UserPage.module.scss";

const cx = classNames.bind(styles);

export default function UserPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const userUid = localStorage.getItem("user");

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/users/${userUid}/projects`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setProjects(response);
      } catch (err) {
        console.error("Error", err);
      }
    };

    fetchProjectsData();
  }, [isRendering]);

  const handleProjectDeleteButtonClick = (projectId) => {
    axios
      .delete(
        process.env.REACT_APP_SERVER_URL +
          `/users/${userUid}/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => setIsRendering(!isRendering))
      .catch((err) => console.error("Error", err));
  };

  return (
    <div className={cx("project")}>
      {projects?.data.map((projectData, index) => {
        return (
          <div className={cx("project__list")} key={projectData._id}>
            <h1>Project No.{index + 1}</h1>
            <Link
              className={cx("project__list__link")}
              to={`/user/project/${projectData._id}`}
            >
              <h1>{projectData.projectName}</h1>
            </Link>
            <button className={cx("project__button")}>
              <Link
                className={cx("project__list__link")}
                to={`/user/project/result/${projectData._id}`}
              >
                View Results
              </Link>
            </button>
            <button
              className={cx("project__deletebutton")}
              onClick={() => handleProjectDeleteButtonClick(projectData._id)}
            >
              delete
            </button>
          </div>
        );
      })}
      <button
        className={cx("project__backbutton")}
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}
