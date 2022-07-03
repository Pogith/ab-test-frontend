import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { firebaseUserState } from "../../recoil/atom";

export default function UserProjectPage() {
  const params = useParams();
  const userUid = useRecoilValue(firebaseUserState);
  const [testUrl, setTestUrl] = useState("");
  const [testLists, setTestLists] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

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

  return (
    <div>
      <h1>{params.projectname}</h1>
      <input
        type="text"
        value={testUrl}
        onChange={(e) => setTestUrl(e.target.value)}
        placeholder="ex) https://www.abtest.com"
      />
      {testLists?.data.map((testData) => {
        return (
          <div key={testData._id}>
            <a href={testData.url}>{testData.url}</a>
          </div>
        );
      })}
      <button onClick={handleRegisterTestUrlButtonClick}>추가하기</button>
    </div>
  );
}
