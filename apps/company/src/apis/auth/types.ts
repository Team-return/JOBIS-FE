export type IAuthority = "TEACHER" | "COMPANY" | "STUDENT";

export interface IAuthorizationResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: string;
}
