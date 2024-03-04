import { PropsWithChildren, useContext, useRef, useState } from "react";
import { ToastContainer } from "./toastContainer";
import { Toast } from "./toast";
import { ToastConfigProps, ToastContext } from "./toastContext";
import { ToastPayload } from "./types";

export const ToastProvider = ({ children }: PropsWithChildren<object>) => {
  const [toastPayload, setToastPayload] = useState<ToastPayload | undefined>(
    undefined
  );

  const timeoutRef = useRef<number | undefined>(undefined);

  const handleToast = (toastProps: ToastConfigProps) => {
    const { duration = 5000, payload } = toastProps;

    if (toastPayload) {
      setToastPayload(undefined);
      clearTimeout(timeoutRef.current);

      timeoutRef.current = undefined;
    }

    setToastPayload(payload);

    timeoutRef.current = setTimeout(() => {
      setToastPayload(undefined);
      timeoutRef.current = undefined;
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toast: handleToast }}>
      {children}
      <ToastContainer>
        {toastPayload && <Toast {...toastPayload} />}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
