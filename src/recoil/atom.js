import { atom } from "recoil";

export const firebaseUserState = atom({
  key: "firebaseUser",
  default: null,
});

export const tokenState = atom({
  key: "firebaseToken",
  default: null,
});

export const isShowingModalState = atom({
  key: "isShowingModal",
  default: false,
});

export const testResultState = atom({
  key: "testResult",
  default: null,
});

export const visitResultState = atom({
  key: "visitResult",
  default: null,
});
