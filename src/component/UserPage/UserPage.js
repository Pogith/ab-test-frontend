import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UserPage() {
  const [projects, setProjects] = useState(null);
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
  }, []);

  return (
    <div>
      {projects?.data.map((projectData) => {
        return (
          <div key={projectData._id}>
            <Link to={`/user/project/${projectData._id}`}>
              <h1>{projectData.projectName}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
