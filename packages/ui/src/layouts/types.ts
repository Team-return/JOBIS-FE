import { AsElementProps, ColorType } from "../core/types";
import { HTMLAttributes } from "react";
import { CSSProperties } from "@vanilla-extract/css";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  color?: ColorType;
  size?: number;
  varients?: "solid" | "dashed";
} & HTMLAttributes<HTMLHRElement>;

export type FlexProps = {
  align?: CSSProperties["alignItems"];
  basis?: CSSProperties["flexBasis"];
  direction?: CSSProperties["flexDirection"];
  grow?: CSSProperties["flexGrow"];
  justify?: CSSProperties["justifyContent"];
  shrink?: CSSProperties["flexShrink"];
  wrap?: CSSProperties["flexWrap"];
  gap?: CSSProperties["gap"];
  background?: ColorType;
  color?: ColorType;
} & AsElementProps;

export type GridProps = {
  autoColumns?: CSSProperties["gridAutoColumns"];
  autoFlow?: CSSProperties["gridAutoFlow"];
  autoRows?: CSSProperties["gridAutoRows"];
  column?: CSSProperties["gridColumn"];
  columnGap?: CSSProperties["columnGap"];
  gap?: CSSProperties["gap"];
  row?: CSSProperties["gridRow"];
  rowGap?: CSSProperties["rowGap"];
  templateAreas?: CSSProperties["gridTemplateAreas"];
  templateColumns?: CSSProperties["gridTemplateColumns"];
  templateRows?: CSSProperties["gridTemplateRows"];
  background?: ColorType;
  color?: ColorType;
} & AsElementProps;

export type GridItemProps = {
  area?: CSSProperties["gridArea"];
  colEnd?: CSSProperties["gridColumnEnd"];
  colStart?: CSSProperties["gridColumnStart"];
  colSpan?: CSSProperties["gridColumn"];
  rowEnd?: CSSProperties["gridRowEnd"];
  rowStart?: CSSProperties["gridRowStart"];
  rowSpan?: CSSProperties["gridRow"];
  background?: ColorType;
  color?: ColorType;
} & AsElementProps;
