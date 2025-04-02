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

export type CompanyDetailResponse = {
  business_number: string;
  company_name: string;
  company_profile_url: string;
  company_introduce: string;
  main_address: string;
  main_address_detail: string;
  main_zip_code: string;
  manager_name: string;
  manager_phone_no: string;
  email: string;
  representative_name: string;
  representative_phone_no: string;
  founded_at: string;
  worker_number: number;
  take: number;
  recruitment_id: number | null;
  attachments: string[];
  service_name: string;
  business_area_code: number | null;
  business_area: string;
  biz_registration_url: string;
  headquarter: boolean;
};

export type CompanyDetailPatchRequest = {
  business_number?: string;
  company_name?: string;
  company_profile_url?: string;
  company_introduce?: string;
  main_address?: string;
  main_address_detail?: string;
  main_zip_code?: string;
  manager_name?: string;
  manager_phone_no?: string;
  email?: string;
  representative_name?: string;
  representative_phone_no?: string;
  founded_at?: string;
  worker_number?: number;
  take?: number;
  recruitment_id?: number | null;
  attachment_urls?: string[];
  service_name?: string;
  business_area_code?: number | null;
  business_area?: string;
  biz_registration_url?: string;
  headquarter?: boolean;
};
