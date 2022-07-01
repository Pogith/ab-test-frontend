import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { auth, signInWithGoogle, signOut } from "../../auth/firebase";
import { firebaseUserState, tokenState } from "../../recoil/atom";
import axios from "axios";

export default function GoogleSignIn() {
  const [user, setUser] = useRecoilState(firebaseUserState);
  const [token, setToken] = useRecoilState(tokenState);

  const handleSignIn = useCallback(() => {
    signInWithGoogle();

    auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        const response = await auth.currentUser.getIdToken();

        setToken(response);
        setUser(JSON.parse(JSON.stringify(userData)));

        const firebaseUserData = {
          user: JSON.parse(JSON.stringify(userData)),
          token: response,
        };

        await axios.post(
          process.env.REACT_APP_SERVER_URL + "/auth/login",
          firebaseUserData,
          {
            headers: {
              Authorization: `Bearer ${response}`,
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
  }, [user, token]);

  return (
    <div>
      {!user ? (
        <button onClick={handleSignIn}>Sign In</button>
      ) : (
        <button onClick={handleSignOut}>Sing Out</button>
      )}
    </div>
  );
}
