import reactDOM from "react-dom";

export default function ModalPortal({ children }) {
  const element = document.getElementById("modal");

  return reactDOM.createPortal(children, element);
}
