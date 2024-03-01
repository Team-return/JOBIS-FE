export interface IArea {
  id?: number;
  job_codes: number[];
  tech_codes: number[];
  hiring: number;
  major_task: string;
  preferential_treatment: string;
}

export type IHiringProgress =
  | "DOCUMENT"
  | "AI"
  | "CODING_TEST"
  | "LIVE_CODING"
  | "TASK"
  | "PERSONALITY"
  | "TECH_INTERVIEW"
  | "CULTURE_INTERVIEW"
  | "FINAL_INTERVIEW";

export interface IRecruitment {
  areas: IArea[];
  required_licenses: string[];
  required_grade?: string;
  start_time: string;
  end_time: string;
  train_pay: string;
  pay: string;
  benefits: string;
  military: boolean;
  hiring_progress: IHiringProgress[];
  submit_document?: string;
  start_date: string | null;
  end_date: string | null;
  etc: string;
  winter_intern?: boolean;
}

export interface IEditRecruitmentRequest extends Omit<IRecruitment, "areas"> {
  military: boolean;
}

export interface IMyRecruitmentResponse extends Omit<IRecruitment, "areas"> {
  recruitment_id: number;
  recruit_year: number;
  company_biz_no?: string;
  areas: {
    id?: number;
    job: string[];
    tech: string[];
    major_task: string;
    hiring: number;
    preferential_treatment: string;
  }[];
  company_name: string;
  company_profile_url: string;
}
