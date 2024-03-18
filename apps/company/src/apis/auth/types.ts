export type IAuthority = "TEACHER" | "COMPANY" | "STUDENT";
export type PlatformType = "WEB" | "ANDROID" | "IOS";
export interface IAuthorizationResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: string;
}

export interface ICompanyLoginRequest {
  business_number: string;
  auth_code: string;
}

export interface ICompanyLoginResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: IAuthority;
  platform_type: PlatformType;
}
