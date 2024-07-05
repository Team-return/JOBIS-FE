export type CodesResponse = {
  codes: CodeType[];
};

export type CodeType = {
  code: number;
  keyword: string;
};

export type CodesTypeEnum = "JOB" | "TECH" | "BUSINESS_AREA";
