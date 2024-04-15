export type RefreshResponse = {
  access_token: string;
  access_token_expired_at: Date;
  refresh_token: string;
  refresh_token_expired_at: Date;
  authority: string;
};
