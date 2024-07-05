import type { RecruitmentStatusType, CompanyType } from "@/@types/types";

export type RecruitmentFormResponse = {
  recruitments: RecruitmentFormType[];
};

export type RecruitmentFormType = {
  application_approved_count: number;
  application_requested_count: number;
  company_id: number;
  company_name: string;
  company_type: CompanyType;
  end_date: string;
  hiring_jobs: string;
  id: number;
  start_date: string;
  status: RecruitmentStatusType;
  total_hiring_count: number;
};
