import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import UserProjectPage from "../UserProjectPage/UserProjectPage";

test("Test URL 등록 input 창의 placeholder test", () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserProjectPage />
      </BrowserRouter>
    </RecoilRoot>
  );

  screen.getByPlaceholderText("ex) https://www.abtest.com");
});

test("input 창에 값을 입력하지 않았다가 등록할 Test URL을 입력한 경우 값이 나타나야합니다.", () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserProjectPage />
      </BrowserRouter>
    </RecoilRoot>
  );

  const input = screen.getByTestId("testurl-input");
  expect(input.value).toBe("");

  fireEvent.change(screen.getByTestId("testurl-input"), {
    target: { value: "https://abtest.com" },
  });

  const inputText = screen.getByDisplayValue("https://abtest.com");
  expect(inputText.value).toBe("https://abtest.com");
});

test("등록할 Test URL을 input 창에 값을 입력했다가 지웠을 경우 빈칸이어야 합니다.", () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <UserProjectPage />
      </BrowserRouter>
    </RecoilRoot>
  );

  fireEvent.change(screen.getByTestId("testurl-input"), {
    target: { value: "https://example.co.kr" },
  });

  const inputText = screen.getByDisplayValue("https://example.co.kr");
  expect(inputText.value).toBe("https://example.co.kr");

  fireEvent.change(inputText, { target: { value: "" } });
  expect(inputText.value).toBe("");
});

window.alert = jest.fn();

test("UserProjectPage button test", () => {
  const { getByText } = render(
    <RecoilRoot>
      <BrowserRouter>
        <UserProjectPage />
      </BrowserRouter>
    </RecoilRoot>
  );

  expect(getByText("+")).toBeTruthy();
  expect(getByText("Back")).toBeTruthy();

  const registerButton = screen.getByText("+");
  fireEvent.click(registerButton);
  expect(registerButton).toBeTruthy();

  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  expect(backButton).toBeTruthy();
});
