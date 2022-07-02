import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { auth, signInWithGoogle, signOut } from "../../auth/firebase";
import { firebaseUserState, tokenState } from "../../recoil/atom";
import Button from "../common/Button/Button";

export default function GoogleSignIn() {
  const [user, setUser] = useRecoilState(firebaseUserState);
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setToken(localStorage.getItem("token"));
  }, []);

  const handleSignIn = useCallback(() => {
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

        await axios.post(
          process.env.REACT_APP_SERVER_URL + "/auth/login",
          firebaseUserData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
    });
  }, [user, token]);

  const handleSignOut = useCallback(() => {
    signOut();

    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, [user, token]);

  return (
    <div>
      {!localStorage.getItem("token") ? (
        <Button onClick={handleSignIn}>Sign In</Button>
      ) : (
        <Button onClick={handleSignOut}>Sing Out</Button>
      )}
    </div>
  );
}
