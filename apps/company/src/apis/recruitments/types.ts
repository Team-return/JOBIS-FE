export interface IArea {
  id?: number;
  job_codes: number[];
  tech_codes: number[];
  hiring: number;
  major_task: string;
  preferential_treatment: string | null;
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
  working_hours: string;
  flexible_working: boolean;
  train_pay: string;
  pay?: string;
  benefits?: string;
  additional_qualifications?: string;
  military_support: boolean;
  hiring_progress: IHiringProgress[];
  submit_document?: string;
  start_date?: string;
  end_date?: string;
  etc?: string;
  winter_intern?: boolean;
  personal_contact: boolean;
  integration_plan: boolean;
  hire_convertible: boolean;
}

export interface IEditRecruitmentRequest
  extends Omit<
    IRecruitment,
    "areas" | "personal_contact" | "winter_intern" | "military_support"
  > {
  military: boolean;
}

export interface IMyRecruitmentResponse
  extends Omit<IRecruitment, "areas" | "military_support"> {
  recruitment_id: number;
  recruit_year: number;
  company_biz_no?: string;
  areas: {
    additional_qualifications: string;
    id?: number;
    job: { id: number; name: string }[];
    tech: { id: number; name: string }[];
    major_task: string;
    hiring: number;
    preferential_treatment: string;
  }[];
  company_name: string;
  military: boolean;
  company_profile_url: string;
}

export interface IMyRecruitmentListResponse {
  my_recruitments: {
    id: number;
    recruitment_areas: { jobs: string[]; hiring: number };
    created_at: string;
  }[];
}

export interface IRecruitmentCheck {
  winter_intern: boolean;
  experiential: boolean;
}
