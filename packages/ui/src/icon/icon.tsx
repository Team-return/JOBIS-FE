import * as React from "react";
import { icons } from "@jobis/icons";
import { IconProps } from "./types";
import { themes } from "@jobis/design-token";
import { clsx } from "clsx";
import { baseStyle } from "../core/style.css";
import { svgStyle } from "./style.css";

export const Icon = ({
  icon,
  size = 24,
  color = themes.color.grayScale[90],
  direction = "bottom",
  ...props
}: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={clsx([baseStyle, svgStyle({ rotate: direction })])}
      width={size}
      height={size}
      color={color}
      {...props}
    >
      <>{icons[icon]}</>
    </svg>
  );
};
