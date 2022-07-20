import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import UserPage from "../UserPage/UserPage";

test("UserPage가 정상적으로 렌더링 되야합니다.", () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    </RecoilRoot>
  );
});

test("UserPage Back button test", () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    </RecoilRoot>
  );

  const button = screen.getByText("Back");

  fireEvent.click(button);
  expect(button).toBeTruthy();
});
