import { themes } from "@jobis/design-token";

export const CompanyStatusKrToEn = {
  전체: "",
  모집전: "READY",
  모집중: "RECRUITING",
  모집종료: "DONE",
  접수요청: "REQUESTED",
} as const;

export const CompanyStatusColor = {
  READY: "",
  DONE: "",
  RECRUITING: themes.Color.subColor.blue[20],
  REQUESTED: themes.Color.subColor.yellow[20],
} as const;

export const winterInternStringToBool = {
  체험형: true,
  채용형: false,
} as const;
