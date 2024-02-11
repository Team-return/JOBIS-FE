import { style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";
import { recipe } from "@vanilla-extract/recipes";


export const RadioGroupWarpperStyle = recipe({
  base: {
    display: "flex",
    gap: 8,
  },
  variants: {
    flexDirection: {
      column: { flexDirection: "column" },
      row: { flexDirection: "row" },
    }
  }
})