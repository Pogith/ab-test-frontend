import { atom } from "recoil";

export const firebaseUserState = atom({
  key: "firebaseUser",
  default: null,
});

export const tokenState = atom({
  key: "firebaseToken",
  default: null,
});
