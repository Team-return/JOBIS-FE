export interface ILoginRequest {
  account_id: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
  authority: string;
}
