import { style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";
import { recipe } from "@vanilla-extract/recipes";

export const LabelStyle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    gap: 4,
  },
  variants: {
    checked: {
      true : {
        ":hover": {
          ">div:nth-child(1)": {
            backgroundColor: themes.Color.subColor.blue[10],
          }
        },
      },
      false: {
        ":hover": {
          ">div:nth-child(1)": {
            backgroundColor: "rgba(224, 235, 246, 0.4)",
          }
        },
      }
    }
  }
})

export const RadioStyleBackgroundStyle = style({
  width: 32,
  height: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
})

export const InputStyle = style({
  appearance: "none",
  width: 20,
  height: 20,
  border: `2px solid ${themes.Color.grayScale[40]}`,
  borderRadius: "50%",
})

export const RadioStyle = recipe({
  base: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s",
    boxSizing: "border-box",
    "div": {
      width: "12px",
      height: "12px",
      backgroundColor: themes.Color.primary[20],
      borderRadius: "50%",
      transition: "all 0.2s",
    }
  },
  variants: {
    checked: {
      true: {
        border: `2px solid ${themes.Color.primary[20]}`,
        "div": {
          opacity: 1
        }
      },
      false: {
        border: `2px solid ${themes.Color.grayScale[40]}`,
        "div": {
          opacity: 0
        },
      },
    }
  }
})