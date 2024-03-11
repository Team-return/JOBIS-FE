import { style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";
import { recipe } from "@vanilla-extract/recipes";

export const LabelStyle = style({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  gap: 4,
});

export const RadioStyleBackgroundStyle = recipe({
  base: {
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.4s",
    borderRadius: "50%",
  },
  variants: {
    checked: {
      true: {
        selectors: {
          [`${LabelStyle}:hover &`]: {
            backgroundColor: themes.Color.subColor.blue[10],
          },
        },
      },
      false: {
        selectors: {
          [`${LabelStyle}:hover &`]: {
            backgroundColor: "rgba(224, 235, 246, 0.4)",
          },
        },
      },
    },
  },
});

export const RadioStyle = recipe({
  base: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.4s",
    boxSizing: "border-box",
  },
  variants: {
    checked: {
      true: {
        border: `2px solid ${themes.Color.primary[20]}`,
      },
      false: {
        border: `2px solid ${themes.Color.grayScale[40]}`,
      },
    },
  },
});

export const RadioInCircle = recipe({
  base: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    transition: "all 0.2s",
  },
  variants: {
    checked: {
      true: {
        backgroundColor: themes.Color.primary[20],
      },
      false: {
        backgroundColor: "white",
      },
    },
  },
});
