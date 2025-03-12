export type CompanyResponse = {
  companies: CompanyType[];
};

export type CompanyType = {
  company_id: number;
  company_name: string;
  region: string;
  business_area: string;
  workers_count: number;
  take: number;
  company_type: "PARTICIPATING";
  convention: boolean;
  personal_contact: boolean;
  recent_recruit_year: number | null;
  total_acceptance_count: number;
  review_count: number;
};

export type RegisterCompanyRequest = {
  companyName: string;
  businessNumber: string;
  companyProfileUrl: string;
};
