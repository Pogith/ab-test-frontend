import React from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { firebaseUserState, tokenState } from "../../recoil/atom";
import styles from "./Home.module.scss";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const cx = classNames.bind(styles);

export default function Home() {
  const userUid = useRecoilValue(firebaseUserState);
  const token = useRecoilValue(tokenState);

  return (
    <div className={cx("home")}>
      <div className={cx("home__content")}>
        <h1 data-testid="home-title">A/B testing</h1>
        <p>What is A/B testing?</p>

        <p data-testid="home-content">
          A/B testing is a method of comparing two versions of a webpage or app
          against each other to determine which one performs better. A/B testing
          is essentially an experiment where two or more variants of a page are
          shown to users at random, and statistical analysis is used to
          determine which variation performs better for a given conversion goal.
        </p>
        <p>
          Running an A/B test that directly compares a variation against a
          current experience lets you ask focused questions about changes to
          your website or app and then collect data about the impact of that
          change.
        </p>
        <p>
          Testing takes the guesswork out of website optimization and enables
          data-informed decisions that shift business conversations from "we
          think" to "we know." By measuring the impact that changes have on your
          metrics, you can ensure that every change produces positive results.
        </p>
        <p>
          You can get analysis data on the number of visits, number of revisits,
          useragent, mobile or desktop, and access time through our site, and
          you will be able to develop a better website through accurate analysis
          data than other sites. Log in to begin and click the Starting test on
          the right-button.
        </p>
      </div>
      <div className={cx("home__wrapper")}>
        {token ? (
          <>
            <Link className={cx("home__project")} to="/project">
              <div className={cx("home__project__item")}>Starting Test</div>
            </Link>
            <Link className={cx("home__userpage")} to={`/user/${userUid}`}>
              <div className={cx("home__userpage__item")}>My Page</div>
            </Link>
          </>
        ) : (
          <div className={cx("home__message")}>Login Please</div>
        )}
      </div>
    </div>
  );
}
