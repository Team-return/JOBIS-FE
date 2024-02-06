import { themes } from "@jobis/design-token";
import { CSSProperties } from "@vanilla-extract/css";
import { AsElementProps } from "../core/types";

export type TextProps = AsElementProps & {
  color?: string;
  background?: string;
  fontSize: keyof typeof themes.font;
  fontWeight?: keyof typeof themes.fontWeight;
  align?: CSSProperties["textAlign"];
  casing?: CSSProperties["textTransform"];
  decoration?: CSSProperties["textDecoration"];
};
