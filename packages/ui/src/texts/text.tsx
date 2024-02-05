import * as React from "react";
import { TextProps } from "./types";
import { clsx } from "clsx";
import { baseStyle } from "../core/style.css";
import { textStyle } from "./style.css";
import { themes } from "@jobis/design-token";

const Text = (props: TextProps, ref: React.Ref<HTMLElement>) => {
  const {
    as = "p",
    color,
    background,
    children,
    fontSize = "h1",
    fontWeight = "medium",
  } = props;

  return React.createElement(
    as,
    {
      ...props,
      ref,
      className: clsx([baseStyle, textStyle({ fontSize }), props.className]),
      style: {
        color,
        background,
        fontWeight: themes.fontWeight[fontWeight],
        ...props.style,
      },
    },
    children
  );
};

const _Text = React.forwardRef(Text);

export { _Text as Text };
