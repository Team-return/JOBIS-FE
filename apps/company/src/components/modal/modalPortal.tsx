import React from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.querySelector("#modal-root") as HTMLElement;
  if (!modalRoot) {
    return null;
  }
  return ReactDOM.createPortal(children, modalRoot);
};

export default ModalPortal;
