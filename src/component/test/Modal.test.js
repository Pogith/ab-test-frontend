import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Modal from "../common/Modal/Modal";
import ModalPortal from "../common/ModalPortal/ModalPortal";

test("Register Modal content 및 button test", () => {
  const portalModal = document.createElement("div");

  portalModal.setAttribute("id", "modal");
  document.body.appendChild(portalModal);

  const handleRegisterButtonClick = jest.fn();

  const { getByText } = render(
    <RecoilRoot>
      <BrowserRouter>
        <ModalPortal>
          <Modal
            message={
              <>
                <div>
                  <h1>Project Name</h1>
                  <div>
                    <input type="text" />
                  </div>
                </div>
                <button onClick={handleRegisterButtonClick}>Register</button>
              </>
            }
            redirectLink="/"
          />
        </ModalPortal>
      </BrowserRouter>
    </RecoilRoot>
  );

  expect(getByText("Project Name")).toBeTruthy();
  expect(getByText("Register")).toBeTruthy();
  expect(getByText("Cancel")).toBeTruthy();

  fireEvent.click(getByText("Register"));
  expect(handleRegisterButtonClick).toBeCalledTimes(1);
});

test("Script Modal test", () => {
  const portalModal = document.createElement("div");

  portalModal.setAttribute("id", "modal");
  document.body.appendChild(portalModal);

  const { getByText } = render(
    <RecoilRoot>
      <BrowserRouter>
        <ModalPortal>
          <Modal message={<p>script 경로</p>} redirectLink="/" />
        </ModalPortal>
      </BrowserRouter>
    </RecoilRoot>
  );

  expect(getByText("script 경로")).toBeTruthy();
});

test("input 창에 값을 입력하지 않았다가 등록할 Project이름을 입력한 경우 값이 나타나야합니다.", () => {
  const portalModal = document.createElement("div");

  portalModal.setAttribute("id", "modal");
  document.body.appendChild(portalModal);

  const handleRegisterButtonClick = jest.fn();

  render(
    <RecoilRoot>
      <BrowserRouter>
        <ModalPortal>
          <Modal
            message={
              <>
                <div>
                  <h1>Project Name</h1>
                  <div>
                    <input
                      type="text"
                      placeholder="ex) Button color difference"
                      data-testid="project-input"
                    />
                  </div>
                </div>
                <button onClick={handleRegisterButtonClick}>Register</button>
              </>
            }
            redirectLink="/"
          />
        </ModalPortal>
      </BrowserRouter>
    </RecoilRoot>
  );
  const input = screen.getByTestId("project-input");
  expect(input.value).toBe("");

  fireEvent.change(screen.getByTestId("project-input"), {
    target: { value: "Button color change" },
  });

  const inputText = screen.getByDisplayValue("Button color change");
  expect(inputText.value).toBe("Button color change");
});

test("등록할 project이름을 input 창에 값을 입력했다가 지웠을 경우 빈칸이어야 합니다.", () => {
  const portalModal = document.createElement("div");

  portalModal.setAttribute("id", "modal");
  document.body.appendChild(portalModal);

  const handleRegisterButtonClick = jest.fn();

  render(
    <RecoilRoot>
      <BrowserRouter>
        <ModalPortal>
          <Modal
            message={
              <>
                <div>
                  <h1>Project Name</h1>
                  <div>
                    <input
                      type="text"
                      placeholder="ex) Button color difference"
                      data-testid="project-input"
                    />
                  </div>
                </div>
                <button onClick={handleRegisterButtonClick}>Register</button>
              </>
            }
            redirectLink="/"
          />
        </ModalPortal>
      </BrowserRouter>
    </RecoilRoot>
  );
  fireEvent.change(screen.getByTestId("project-input"), {
    target: { value: "Button color change" },
  });

  const inputText = screen.getByDisplayValue("Button color change");
  expect(inputText.value).toBe("Button color change");

  fireEvent.change(inputText, { target: { value: "" } });
  expect(inputText.value).toBe("");
});

test("project 등록 input 창의 placeholder test", () => {
  const portalModal = document.createElement("div");

  portalModal.setAttribute("id", "modal");
  document.body.appendChild(portalModal);

  const handleRegisterButtonClick = jest.fn();

  render(
    <RecoilRoot>
      <BrowserRouter>
        <ModalPortal>
          <Modal
            message={
              <>
                <div>
                  <h1>Project Name</h1>
                  <div>
                    <input
                      type="text"
                      placeholder="ex) Button color difference"
                      data-testid="project-input"
                    />
                  </div>
                </div>
                <button onClick={handleRegisterButtonClick}>Register</button>
              </>
            }
            redirectLink="/"
          />
        </ModalPortal>
      </BrowserRouter>
    </RecoilRoot>
  );

  screen.getByPlaceholderText("ex) Button color difference");
});
