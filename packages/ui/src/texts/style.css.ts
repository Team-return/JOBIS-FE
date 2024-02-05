import { recipe } from "@vanilla-extract/recipes";
import { themes } from "@jobis/design-token";
import { style } from "@vanilla-extract/css";

export const textStyle = recipe({
  variants: {
    fontSize: {
      ...themes.font,
    },
    defaultVariants: {
      fontSize: "h1",
    },
  },
});
