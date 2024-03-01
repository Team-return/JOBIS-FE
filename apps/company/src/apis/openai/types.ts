type YesOrNO = "Y" | "N";

export interface RequiredLicensesListResponse {
  currentCount: number;
  data: RequiredLicensesList[];
  matchCount: number;
  page: number;
  perPage: number;
  totalCount: number;
}

export interface RequiredLicensesList {
  사용여부: YesOrNO;
  시행여부: string;
  입고대상여부: YesOrNO;
  종목등록일: string;
  종목명: string;
  종목영문명: string;
  해당등급: string;
  해당등급등록일: string;
}
