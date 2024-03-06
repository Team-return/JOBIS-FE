import { style } from "@vanilla-extract/css";
import { themes } from "@jobis/design-token";

export const FooterStyle = style({
  marginLeft: "1000px",
  width: "100vw",
  backgroundColor: themes.Color.primary[40],
  padding: "48px 0",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
});

export const ContentStyle = style({
  width: "70%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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

export const CopyrightStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
});

export const MemberAndLink = style({
  display: "flex",
  justifyContent: "space-between",
});

export const MemberTableStyle = style({
  display: "flex",
  gap: 40,
});

export const MemberSectionStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const SocialmediaLinksStyle = style({
  display: "flex",
  gap: 25,
});

export const MajorLabelStyle = style({
  fontSize: "12px",
  color: themes.Color.grayScale[10],
  fontWeight: themes.FontWeight.medium,
});
