import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import ScreenShot from "../ScreenShot/ScreenShot";

test("ScreenShot이 정상적으로 렌더링 되야합니다.", () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <ScreenShot />
      </BrowserRouter>
    </RecoilRoot>
  );
});
