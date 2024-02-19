import { createVar, style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";

export const ErrorBorderColorVariant = createVar();
export const FocusBorderColorVariant = createVar();

export const IconStyle = style({
  position: "absolute",
  right: 16,
  width: 24,
  height: 24,
  zIndex: 3,
});

export const LabelStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  color: themes.Color.grayScale[80],
  fontWeight: themes.FontWeight.regular,
  ...themes.Font.caption,
});

export const InputWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
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
  backgroundColor: themes.Color.grayScale[10],
  borderColor: themes.Color.grayScale[50],
  color: themes.Color.grayScale[80],
  width: "100%",

  zIndex: 2,

  transition: "background-color 0.2s, color 0.2s, border-color 0.2s",

  borderRadius: 8,
  padding: "14px 16px",
  ...themes.Font.body3,

  // @ts-ignore
  "&::placeholder": {
    color: themes.Color.grayScale[50],
  },

  "&:focus-visible": {
    borderColor: FocusBorderColorVariant,
  },

  "&[disabled]": {
    borderColor: themes.Color.grayScale[20],
    backgroundColor: themes.Color.grayScale[20],
  },

  "&[data-isError='true']": {
    borderColor: ErrorBorderColorVariant,
  },

  "&[data-isIcon='true']": {
    padding: "16px 56px 16px 14px",
  },
});
