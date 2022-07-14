import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import classNames from "classnames/bind";

import { firebaseUserState } from "../../recoil/atom";
import BarChart from "../Chart/BarChart";
import RevisitBarChart from "../Chart/RevisitBarChart";
import PieChart from "../Chart/PieChart";
import styles from "./TestResultPage.module.scss";

const cx = classNames.bind(styles);

export default function TestResultPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [visitResults, setVisitResults] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const userUid = useRecoilValue(firebaseUserState);

  useEffect(() => {
    const fetchResultData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${params.projectId}/results`,
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

  const useragents = visitResults?.map((data) => {
    return data.useragent;
  });

  const visitByBrowser = {};
  const visitAgent = {};

  useragents?.forEach((data) => {
    const browser = data[0].browser;

    if (visitByBrowser[browser]) {
      visitByBrowser[browser].count++;
    } else {
      visitByBrowser[browser] = {
        name: browser,
        count: 1,
      };
    }

    const agent = data[0].mobile ? "Mobile" : "Desktop";

    if (visitAgent[agent]) {
      visitAgent[agent].count++;
    } else {
      visitAgent[agent] = {
        name: agent,
        count: 1,
      };
    }
  });

  const browserResults = Object.values(visitByBrowser).map((data) => data);
  const agentResults = Object.values(visitAgent).map((data) => data);

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <div className={cx("chart__container")}>
        {testResults && visitResults && (
          <>
            <BarChart resultData={testResults} />
            <RevisitBarChart resultData={testResults} />
            <PieChart resultData={browserResults} />
            <PieChart resultData={agentResults} />
          </>
        )}
      </div>
    </div>
  );
}
