import { Icons } from "@jobis/icons";
import { IconProps } from "./types";
import { themes } from "@jobis/design-token";
import { clsx } from "clsx";
import { BaseStyle } from "../core/style.css";
import { SvgStyle } from "./style.css";

export const Icon = ({
  icon,
  size = 24,
  color = themes.Color.grayScale[90],
  direction = "bottom",
  ...props
}: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={clsx([BaseStyle, SvgStyle({ rotate: direction })])}
      width={size}
      height={size}
      color={color}
      {...props}
    >
      <>{Icons[icon]}</>
    </svg>
  );
};
