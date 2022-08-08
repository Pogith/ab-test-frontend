import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGraphUp, BsTrash } from "react-icons/bs";
import classNames from "classnames/bind";

import { axiosGetRequest, axiosDeleteRequest } from "../../data/api";
import styles from "./UserPage.module.scss";

const cx = classNames.bind(styles);

export default function UserPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const userUid = localStorage.getItem("user");

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const projectDataGetRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects`;
      const response = await axiosGetRequest(projectDataGetRequestUrl);

      setProjects(response);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const handleProjectDeleteButtonClick = async (projectId) => {
    try {
      const projectDeleteRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${projectId}`;

      await axiosDeleteRequest(projectDeleteRequestUrl);

      fetchProjectData();
    } catch (err) {
      console.error("Project Delete Error", err);
    }
  };

  return (
    <div className={cx("project")}>
      <div className={cx("project__title")}>
        <h1>Project List</h1>
      </div>
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
            <div>
              <button className={cx("project__result")}>
                <Link
                  className={cx("project__result__linkicon")}
                  to={`/user/project/result/${projectData._id}`}
                >
                  <BsGraphUp size={"40px"} />
                </Link>
              </button>
              <button
                className={cx("project__deletebutton")}
                onClick={() => handleProjectDeleteButtonClick(projectData._id)}
              >
                <BsTrash size={"40px"} />
              </button>
            </div>
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
