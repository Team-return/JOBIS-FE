import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const svgStyle = recipe({
  base: {
    display: "block",
    shapeRendering: "inherit",
  },
  variants: {
    rotate: {
      bottom: {
        rotate: "0deg",
      },
      left: {
        rotate: "90deg",
      },
      top: { rotate: "180deg" },
      right: { rotate: "270deg" },
    },
  },
});
