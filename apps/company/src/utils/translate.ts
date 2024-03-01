import { IHiringProgress } from "@/apis/recruitments/types";

export const hiringProgressType: Record<IHiringProgress, string> = {
  DOCUMENT: "서류전형",
  AI: "AI 면접",
  CODING_TEST: "코딩테스트",
  LIVE_CODING: "라이브코딩",
  TASK: "과제 제출",
  PERSONALITY: "인적성테스트",
  TECH_INTERVIEW: "기술면접",
  CULTURE_INTERVIEW: "컬쳐면접",
  FINAL_INTERVIEW: "최종면접",
};

export const companyType = {
  LEAD: "선도기업",
  PARTICIPATING: "참여기업",
  "": "",
};
