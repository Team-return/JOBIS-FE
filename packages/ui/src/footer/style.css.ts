import { style, createVar } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";

export const GapVariant = createVar();
export const DirectionVariant = createVar();
export const JustifyVariant = createVar();
export const AlignVariant = createVar();

export const FooterStyle = style({
  width: "100vw",
  backgroundColor: themes.Color.subColor.blue[40],
  padding: "48px 0",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
});

export const ContentStyle = style({
  width: "70%",
  height: "100%",
});

export const HrStyle = style({
  margin: "32px 0",
  borderColor: themes.Color.primary[30],
});

export const DefaultTextStyle = style({
  lineHeight: "18px",
  color: themes.Color.grayScale[30],
  fontSize: "12px",
  fontWeight: 400,
  whiteSpace: "pre-wrap",
  margin: 0,
});

export const MajorLabelStyle = style({
  fontSize: "12px",
  color: themes.Color.grayScale[10],
  fontWeight: themes.FontWeight.medium,
});

export const FlexStyle = style({
  display: "flex",
  gap: GapVariant,
  flexDirection: DirectionVariant,
  justifyContent: JustifyVariant,
  alignItems: AlignVariant,
});
