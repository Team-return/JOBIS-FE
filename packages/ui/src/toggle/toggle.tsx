import * as React from "react";
import { clsx } from "clsx";
import { toggleBackgroundStyle, circleStyle } from "./style.css";
import { ToggleProps } from "./types";

export const Toggle = (props: ToggleProps) => {
  const { checked, ...rest } = props;
  return (
    <div
      className={clsx([toggleBackgroundStyle({ checked: checked })])}
      {...rest}
    >
      <div className={clsx([circleStyle])} />
    </div>
  );
};
