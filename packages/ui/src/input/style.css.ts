import { createVar, style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";

export const ErrorBorderColorVariant = createVar();
export const FocusBorderColorVariant = createVar();

export const IconStyle = style({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  right: 16,
  zIndex: 3,
});

export const LabelStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  color: themes.Color.grayScale[90],
  fontWeight: themes.FontWeight.regular,
  // width: "100%",
  ...themes.Font.body3,
});

export const InputWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const InputStyle = style({
  border: "none",
  boxShadow: "none",
  appearance: "none",
  outline: "none",
  // 리셋 스타일
  borderStyle: "solid",
  borderWidth: "2px",
  display: "flex",
  alignItems: "center",
  fontWeight: themes.FontWeight.regular,
  borderColor: themes.Color.grayScale[20],
  backgroundColor: themes.Color.grayScale[20],
  color: themes.Color.grayScale[80],
  width: "100%",

  zIndex: 2,

  transition: "background-color 0.2s, color 0.2s, border-color 0.2s",

  borderRadius: 8,
  padding: 14,
  ...themes.Font.body2,

  // @ts-ignore
  "&::placeholder": {
    color: themes.Color.grayScale[50],
  },

  "&:focus-visible": {
    borderColor: FocusBorderColorVariant,
  },

  "&[disabled]": {
    borderColor: themes.Color.grayScale[50],
    backgroundColor: themes.Color.grayScale[30],
    color: themes.Color.grayScale[60],
    cursor: "not-allowed",
  },

  "&[data-isError='true']": {
    borderColor: ErrorBorderColorVariant,
  },

  "&[data-isIcon='true']": {
    padding: "14px 56px 14px 14px",
  },
});
