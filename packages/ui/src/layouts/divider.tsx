import * as React from "react";
import { DividerProps } from "./types";

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      color = "gray",
      varients = "solid",
      size = 1,
      orientation = "horizontal",
      style,
      ...rest
    },
    ref
  ) => {
    const borderStyle =
      orientation === "horizontal"
        ? { width: "100%", borderWidth: `0 0 ${size}px 0` }
        : { height: "100%", borderWidth: `0 0 0 ${size}px` };

    return (
      <hr
        {...rest}
        ref={ref}
        style={{
          borderStyle: varients,
          borderColor: color,
          ...borderStyle,
          ...style,
        }}
      />
    );
  }
);
