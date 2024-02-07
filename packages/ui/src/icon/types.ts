import { Icons } from "@jobis/icons";
import * as React from "react";

export type DirectionType = "top" | "left" | "bottom" | "right";

export type IconType = keyof typeof Icons;

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: IconType;
  size?: number;
  direction?: DirectionType;
}
