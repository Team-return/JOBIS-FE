import { themes } from "@jobis/design-token";
import { CSSProperties } from "@vanilla-extract/css";
import { AsElementProps } from "../core/types";

export type TextProps = AsElementProps & {
  color?: string;
  background?: string;
  fontSize: keyof typeof themes.Font;
  fontWeight?: keyof typeof themes.FontWeight;
  align?: CSSProperties["textAlign"];
  casing?: CSSProperties["textTransform"];
  decoration?: CSSProperties["textDecoration"];
  whiteSpace?: CSSProperties["whiteSpace"];
};
