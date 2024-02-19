import * as React from "react";

export const ToastError = () => {
  return (
    <>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        stroke-width="2"
        fill="transparent"
      />
      <path
        d="M12 12.5V7.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 16.5L12 16"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  );
};
