import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";

import { auth, signInWithGoogle, signOut } from "../../auth/firebase";
import { firebaseUserState, tokenState } from "../../recoil/atom";
import styles from "./GoogleSignIn.module.scss";

const cx = classNames.bind(styles);

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(firebaseUserState);
  const setToken = useSetRecoilState(tokenState);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setToken(localStorage.getItem("token"));
  }, []);

  const handleSignIn = () => {
    signInWithGoogle();

    auth.onAuthStateChanged(async (data) => {
      if (data) {
        const response = await auth.currentUser.getIdToken();
        const userData = JSON.parse(JSON.stringify(data));

        setToken(response);
        setUser(userData["uid"]);

        localStorage.setItem("token", response);
        localStorage.setItem("user", userData["uid"]);

        const firebaseUserData = {
          user: userData,
          token: response,
        };

        axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/auth/login`,
            firebaseUserData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => navigate("/"))
          .catch((err) => console.error("Error", err));
      }
    });
  };

  const handleSignOut = () => {
    signOut();

    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div>
      {!localStorage.getItem("token") ? (
        <button className={cx("login_button")} onClick={handleSignIn}>
          Sign In
        </button>
      ) : (
        <button className={cx("login_button")} onClick={handleSignOut}>
          Sing Out
        </button>
      )}
    </div>
  );
}
