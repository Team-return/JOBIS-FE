import { PropsWithChildren } from "react";
import { ToastContainerStyle } from "./styles.css";

export const ToastContainer = ({ children }: PropsWithChildren<object>) => {
  return (
    <div id="toast-container" tabIndex={-1} className={ToastContainerStyle}>
      {children}
    </div>
  );
};
