import * as React from "react";
import { themes } from "@jobis/design-token";
import { Icon, IconType } from "../icon";
import { ToastStyle } from "./styles.css";
import { ToastPayload } from "./types";

export const Toast = (props: ToastPayload) => {
  const { message, type } = props;

  const toastIcon = (): IconType => {
    switch (type) {
      case "success":
        return "ToastSuccess";

      case "error":
        return "ToastError";

      case "message":
        return "ToastMessage";

      case "warning":
        return "ToastWarning";
    }
  };

  const toastColor = () => {
    switch (type) {
      case "success":
        return themes.Color.subColor.green[20];

      case "error":
        return themes.Color.subColor.red[20];

      case "message":
        return themes.Color.subColor.blue[20];

      case "warning":
        return themes.Color.subColor.yellow[20];
    }
  };

  return (
    <div className={ToastStyle()}>
      <Icon
        icon={toastIcon()}
        size={24}
        color={toastColor()}
        style={{ position: "absolute", left: 24 }}
      />
      {message}
    </div>
  );
};
