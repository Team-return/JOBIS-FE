import { recipe } from "@vanilla-extract/recipes";
import { createVar, keyframes, style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";

export const EnableColorVariant = createVar();
export const HoverColorVariant = createVar();
export const ActiveColorVariant = createVar();

export const ButtonStyle = recipe({
  base: {
    margin: 0,
    border: 0,
    background: "none",

    position: "relative",
    width: "auto",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
    ...themes.Font.body2,
    fontWeight: themes.FontWeight.bold,
    padding: "12px 40px",
    gap: 8,
    // @ts-ignore
    "&[disabled]": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    '&[data-loading="true"]': {
      "& span": {
        opacity: 0,
      },
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
  variants: {
    variant: {
      solid: {
        backgroundColor: EnableColorVariant,
        color: themes.Color.grayScale[10],

        "&:hover:not([disabled])": {
          backgroundColor: HoverColorVariant,
        },
        "&:active:not([disabled])": {
          backgroundColor: ActiveColorVariant,
        },
      },
      outline: {
        border: `1px solid ${EnableColorVariant}`,
        color: EnableColorVariant,
        backgroundColor: "transparent",

        "&:hover:not([disabled])": {
          color: themes.Color.grayScale[10],
          backgroundColor: HoverColorVariant,
        },
        "&:active:not([disabled])": {
          backgroundColor: ActiveColorVariant,
        },
      },
    },
  },
});

export const SpanStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const spinKeyframes = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const SpinnerStyle = style({
  position: "absolute",
  animation: `${spinKeyframes} 0.45s linear infinite`,
  display: "inline-block",
  borderTop: "2px solid currentcolor",
  borderRight: "2px solid currentcolor",
  borderBottom: "2px solid transparent",
  borderLeft: "2px solid transparent",
  borderRadius: "50%",
  width: 24,
  height: 24,
  left: `calc(50% - ${24}/2)`,
});
