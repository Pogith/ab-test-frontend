import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import classNames from "classnames/bind";

import { firebaseUserState } from "../../recoil/atom";
import BarChart from "../Chart/BarChart";
import RevisitBarChart from "../Chart/RevisitBarChart";
import PieChart from "../Chart/PieChart";
import TimeChart from "../Chart/TimeChart";
import { getUserAgentResult, getTimeDataResult } from "./util";
import { axiosGetRequest } from "../../data/api";
import styles from "./TestResultPage.module.scss";
import DateChart from "../Chart/DateChart";

const cx = classNames.bind(styles);

export default function TestResultPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [visitResults, setVisitResults] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const userUid = useRecoilValue(firebaseUserState);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const resultDataGetRequestUrl = `${process.env.REACT_APP_SERVER_URL}/users/${userUid}/projects/${params.projectId}/results`;
        const response = await axiosGetRequest(resultDataGetRequestUrl);

        setTestResults(response.data.testResults);
        setVisitResults(response.data.visitResults);
      } catch (err) {
        console.error("ResultData Error", err);
      }
    };

    fetchResultData();
  }, []);

  const { browserResults, agentResults } = getUserAgentResult(visitResults);
  const { timeResults, dateResults } = getTimeDataResult(visitResults);

  return (
    <div>
      <div className={cx("chart__button")}>
        <button onClick={() => navigate(`/user/${userUid}`)}>Back</button>
      </div>
      <div className={cx("chart__container")}>
        {testResults && visitResults && (
          <>
            <div className={cx("chart__container__top")}>
              <BarChart resultData={testResults} />
              <RevisitBarChart resultData={testResults} />
              <PieChart resultData={browserResults} message={"Useragent"} />
              <PieChart resultData={agentResults} message={"Device"} />
            </div>
            <div className={cx("chart__container__bottom")}>
              <TimeChart resultData={timeResults} />
              <DateChart resultData={dateResults} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
