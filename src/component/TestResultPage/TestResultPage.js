import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

import {
  firebaseUserState,
  testResultState,
  visitResultState,
} from "../../recoil/atom";

export default function TestResultPage() {
  const params = useParams();
  const [visitResults, setVisitResults] = useRecoilState(visitResultState);
  const [testResults, setTestResults] = useRecoilState(testResultState);
  const userUid = useRecoilValue(firebaseUserState);

  useEffect(() => {
    const fetchResultData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `/users/${userUid}/projects/${params.projectId}/results`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTestResults(response.data.testResults);
      setVisitResults(response.data.visitResults);
    };

    fetchResultData();
  }, []);

  return <div>ResultPage</div>;
}
