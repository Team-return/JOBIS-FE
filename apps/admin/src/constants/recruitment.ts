import { themes } from "@jobis/design-token";

export const CellData = [
  {
    title: "상태",
    width: "6%",
  },
  {
    title: "기업명",
    width: "24%",
  },
  {
    title: "채용직군",
    width: "24%",
  },
  {
    title: "구분",
    width: "8%",
  },
  {
    title: "모집인원",
    width: "8%",
  },
  {
    title: "지원요청",
    width: "8%",
  },
  {
    title: "지원자",
    width: "6%",
  },
  {
    title: "모집시작일",
    width: "11%",
  },
  {
    title: "모집종료일",
    width: "11%",
  },
];

export const CompanyTypeEnToKr = {
  LEAD: "선도기업",
  PARTICIPATING: "참여기업",
  CONTRACTING: "협약기업",
  DEFAULT: "기본",
} as const;

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
