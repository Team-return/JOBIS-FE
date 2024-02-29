import * as React from "react";
import { FlexProps } from "./types";
import { clsx } from "clsx";
import { BaseStyle } from "../core/style.css";

export const Flex = React.forwardRef<HTMLElement, FlexProps>(
  (
    {
      as = "div",
      color,
      background,
      align,
      basis,
      className: cln,
      direction,
      grow,
      justify,
      shrink,
      wrap,
      gap,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    return React.createElement(
      as,
      {
        ...rest,
        ref,
        className: clsx([BaseStyle, cln]),
        style: {
          display: "flex",
          alignItems: align,
          justifyContent: justify,
          flexDirection: direction,
          flexWrap: wrap,
          flexGrow: grow,
          flexShrink: shrink,
          flexBasis: basis,
          gap,
          color,
          background,
          ...style,
        },
      },
      children
    );
  }
);
