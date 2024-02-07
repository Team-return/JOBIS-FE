import { style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";
import { recipe } from "@vanilla-extract/recipes";

export const LabelStyle = style([
  {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    ":disabled": {
      cursor: "not-allowed",
    },
  },
]);

export const CursorStyle = recipe({
  variants: {
    cursor: {
      true: "not-allowed",
      false: "pointer",
    },
  },
});

export const CheckboxBackgroundStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  cursor: "not-allowed",
});

export const CheckboxBackgroundStyleDetail = style({
  ":hover": {
    backgroundColor: "rgba(224, 235, 246, 0.4)",
    cursor: "pointer",
  },
  ":active": {
    backgroundColor: "#E0EBF6",
    transition: "ease 0.5s",
    cursor: "pointer",
  },
});

export const CheckboxStyle = style({
  position: "absolute",
  appearance: "none",
  width: 20,
  height: 20,
  margin: 0,
  accentColor: themes.Color.primary[20],
  border: `2px solid ${themes.Color.grayScale[50]}`,
  borderRadius: 4,
  ":checked": {
    borderColor: "transparent",
    backgroundColor: themes.Color.primary[20],
  },
  ":disabled": {
    backgroundColor: themes.Color.grayScale[40],
    border: `2px solid ${themes.Color.grayScale[40]}`,
    cursor: "not-allowed",
  },
});

export const TextStyle = style({});
