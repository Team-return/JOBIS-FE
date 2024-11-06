export interface IUpdateCompanyInfoRequest {
  founded_at: string;
  representative_name: string;
  representative_phone_no: string;
  main_zip_code: string;
  sub_zip_code?: string;
  main_address: string;
  main_address_detail: string;
  sub_address?: string;
  sub_address_detail?: string;
  take: number | string;
  worker_number: number | string;
  company_introduce: string;
  email: string;
  manager_name: string;
  company_profile_url?: string;
  service_name: string;
  business_area_code: number | string;
  manager_phone_no: string;
}
export interface ICompanyRegisterRequest extends IUpdateCompanyInfoRequest {
  name: string;
  main_address_detail: string;
  sub_address_detail?: string;
  business_number: string;
  service_name: string;
  attachment_urls?: string[] | null;
  biz_registration_url?: string;
  headquarter?: boolean;
}

export interface ICheckBuisnessNumberResponse {
  company_name: string;
  exists: boolean;
}

export interface IMyCompanyResponse {
  company_id: number;
  name: string;
  biz_no: string;
  type: string;
  main_address: string;
  main_address_detail: string;
  main_zip_code: string;
  representative: string;
  representative_phone_no: string;
  attachment_urls: string[];
  founded_at: string;
  sales_per_year: number;
  workers_count: number;
  manager_name: string;
  email: string;
  company_introduce: string;
  company_logo_url: string;
  service_name: string;
  business_area: string;
  biz_registration_url: string;
  headquarter: boolean;
  manager_phone_no: string;
  take: number;
  sub_address?: string;
  sub_address_detail?: string;
  sub_zip_code?: string;
  sub_manager_name?: string;
  sub_manager_phone_no?: string;
  fax?: string;
}
