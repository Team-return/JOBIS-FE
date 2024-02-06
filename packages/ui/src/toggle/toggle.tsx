import * as React from "react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { toggleBackgroundStyle, circleStyle } from "./style.css";
import { ToggleProps } from "./types";

function Toggle(props: ToggleProps, ref: React.Ref<HTMLInputElement>) {
  const { checked, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={clsx([toggleBackgroundStyle({ checked: checked })])}
    >
      <div className={clsx([circleStyle])} />
    </div>
  );
}

const _Toggle = React.forwardRef(Toggle);
export { _Toggle as Toggle };
