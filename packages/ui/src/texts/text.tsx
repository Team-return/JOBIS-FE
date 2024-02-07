import * as React from "react";
import { TextProps } from "./types";
import { clsx } from "clsx";
import { BaseStyle } from "../core/style.css";
import { TextStyle } from "./style.css";
import { themes } from "@jobis/design-token";

export const Text = React.forwardRef(
  (props: TextProps, ref: React.Ref<HTMLElement>) => {
    const {
      as = "p",
      color,
      background,
      children,
      fontSize = "h1",
      fontWeight = "medium",
      className,
      style,
    } = props;

    return React.createElement(
      as,
      {
        ...props,
        ref,
        className: clsx([BaseStyle, TextStyle({ fontSize }), className]),
        style: {
          color,
          background,
          fontWeight: themes.FontWeight[fontWeight],
          ...style,
        },
      },
      children
    );
  }
);
