import { recipe } from "@vanilla-extract/recipes";

export const SvgStyle = recipe({
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
