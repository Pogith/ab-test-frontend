import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "../Home/Home";

test("홈페이지에 title이 렌더링 되야합니다.", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </RecoilRoot>
  );

  expect(getByTestId("home-title")).toHaveTextContent("A/B testing");
});

test("홈페이지에 content 내용이 렌더링 되야합니다.", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </RecoilRoot>
  );

  expect(getByTestId("home-content")).toHaveTextContent(
    "A/B testing is a method of comparing two versions of a webpage or app against each other to determine which one performs better. A/B testing is essentially an experiment where two or more variants of a page are shown to users at random, and statistical analysis is used to determine which variation performs better for a given conversion goal."
  );
});
