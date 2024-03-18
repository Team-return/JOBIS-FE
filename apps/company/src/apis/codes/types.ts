export type CodeType = "JOB" | "TECH" | "BUSINESS_AREA";

export interface ICode {
  code: number;
  keyword: string;
  job_type?: string;
}

export interface ICodeResponse {
  codes: ICode[];
}

export interface IAddCodeRequest {
  code_type: CodeType;
  job_type?: string;
  keyword: string;
}

export interface IAddCodeResponse {
  code_id: number;
}
