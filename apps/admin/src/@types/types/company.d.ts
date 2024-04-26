import {
  CompanyStatusColor,
  CompanyTypeEnToKr,
  CompanyStatusKrToEn,
  winterInternStringToBool,
} from "@/constants";

export type CompanyType = keyof typeof CompanyTypeEnToKr;

export type RecruitmentStatusType = keyof typeof CompanyStatusColor;
export type RecruitmentStatusKrType = keyof typeof CompanyStatusKrToEn;

export type WinterInternType = keyof typeof winterInternStringToBool;
