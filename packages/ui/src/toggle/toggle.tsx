import * as React from "react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { toggleBackgroundStyle, circleStyle } from "./style.css";
import { ToggleProps } from "./types";

export const Toggle = (props: ToggleProps) => {
  const { checked, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={clsx([toggleBackgroundStyle({ checked: checked })])}
    >
      <div className={clsx([circleStyle])} />
    </div>
  );
};
