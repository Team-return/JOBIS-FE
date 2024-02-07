import { recipe } from "@vanilla-extract/recipes";
import { themes } from "@jobis/design-token";

export const TextStyle = recipe({
  variants: {
    fontSize: {
      ...themes.Font,
    },
    defaultVariants: {
      fontSize: "h1",
    },
  },
});
