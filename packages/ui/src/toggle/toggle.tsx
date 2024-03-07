import * as React from "react";
import { clsx } from "clsx";
import { toggleBackgroundStyle, circleStyle } from "./style.css";
import { ToggleProps } from "./types";

export const Toggle = React.forwardRef(
  (props: ToggleProps, ref: React.Ref<HTMLDivElement>) => {
    const { checked, ...rest } = props;
    return (
      <div
        className={clsx([toggleBackgroundStyle({ checked: checked })])}
        ref={ref}
        {...rest}
      >
        <div className={clsx([circleStyle])} />
      </div>
    );
  }
);
