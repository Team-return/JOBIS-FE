import { style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";
import { recipe } from "@vanilla-extract/recipes";

export const toggleBackgroundStyle = recipe({
  base: {
    width: 60,
    height: 34,
    boxSizing: "border-box",
    borderRadius: 100,
    padding: 4,
    transition: "all .3s",
    cursor: "pointer",
  },
  variants: {
    checked: {
      true: {
        paddingLeft: 30,
        backgroundColor: themes.color.primary[20],
      },
      false: {
        backgroundColor: themes.color.grayScale[40],
      },
    },
  },
});

export const circleStyle = style({
  width: 26,
  height: 26,
  borderRadius: "50%",
  backgroundColor: "#ffffff",
});
