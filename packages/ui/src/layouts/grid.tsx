import * as React from "react";
import { GridProps } from "./types";
import { clsx } from "clsx";
import { BaseStyle } from "../core/style.css";

export const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      as = "div",
      color,
      background,
      className: cln,
      children,
      autoColumns,
      autoFlow,
      autoRows,
      columnGap,
      column,
      gap,
      row,
      rowGap,
      templateColumns,
      templateRows,
      style,
      templateAreas,
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
          display: "grid",
          gridAutoColumns: autoColumns,
          gridAutoFlow: autoFlow,
          gridAutoRows: autoRows,
          gridColumnGap: columnGap,
          gridGap: gap,
          gridRowGap: rowGap,
          gridTemplateColumns: templateColumns,
          gridTemplateRows: templateRows,
          gridTemplateAreas: templateAreas,
          gridColumn: column,
          gridRow: row,
          color,
          background,
          ...style,
        },
      },
      children
    );
  }
);
