import * as React from "react";
import { GridItemProps } from "./types";
import { clsx } from "clsx";
import { BaseStyle } from "../core/style.css";

export const GridItem = React.forwardRef<HTMLElement, GridItemProps>(
  (
    {
      as = "div",
      color,
      className: cln,
      background,
      children,
      area,
      colEnd,
      colStart,
      colSpan,
      rowEnd,
      rowStart,
      rowSpan,
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
          gridArea: area,
          gridColumnEnd: colEnd,
          gridColumnStart: colStart,
          gridColumn: colSpan,
          gridRowEnd: rowEnd,
          gridRowStart: rowStart,
          gridRow: rowSpan,
          color,
          background,
          ...style,
        },
      },
      children
    );
  }
);
