import { style } from "@vanilla-extract/css";

export const baseStyle = style({
  "padding": 0,
  "margin": 0,

  // @ts-ignore
  "&:focus-visible": {
    outline: "none",
  },
});
