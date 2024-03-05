import { themes } from "@jobis/design-token";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const ToastContainerStyle = style({
  position: "fixed",
  width: "100%",
  display: "flex",
  justifyContent: "center",

  pointerEvents: "none",

  padding: "0.5rem",
  left: 0,
  top: 0,
  zIndex: 999,
});

export const ToastStyle = recipe({
  base: {
    width: 300,
    textAlign: "center",
    ...themes.Font.body1,
    fontWeight: themes.FontWeight.medium,
    backgroundColor: themes.Color.grayScale[10],
    color: themes.Color.grayScale[90],
    padding: "19px 24px",
    borderRadius: 16,
    boxShadow: "0px 4px 20px 0px rgba(112, 144, 176, 0.12)",
  },
  variants: {
    type: {
      success: {},
      error: {},
      warning: {},
      message: {},
    },
  },
});
