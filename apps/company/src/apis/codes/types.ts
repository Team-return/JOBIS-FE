export type CodeType = "JOB" | "TECH" | "BUSINESS_AREA";

export interface ICode {
  code: number;
  keyword: string;
  job_type?: string;
}

export interface ICodeResponse {
  codes: ICode[];
}
