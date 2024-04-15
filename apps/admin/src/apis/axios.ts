/* eslint-disable unicorn/consistent-destructuring */
import axios, { type AxiosError } from "axios";
import { Cookies } from "react-cookie";
import { reIssueToken } from "./auth";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10_000,
});

const cookies = new Cookies();
let flag = false;

instance.interceptors.request.use(
  config => {
    const accessToken = cookies.get("access_token");
    const returnConfig = { ...config };
    if (accessToken) {
      returnConfig.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return returnConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      const { config } = error;
      const refreshToken = cookies.get("refresh_token");
      if (!refreshToken) {
        cookies.remove("access_token");
        cookies.remove("refresh_token");
        window.location.href = "/signin";
        return;
      }
      if (
        error.response.data.message === "Invalid Token" ||
        error.response.data.message === "Token Expired" ||
        error.response.data.message === "Request failed with status code 403" ||
        !cookies.get("access_token")
      ) {
        if (!flag) {
          cookies.remove("access_token");
          flag = true;
          reIssueToken(refreshToken)
            .then(res => {
              flag = false;
              cookies.remove("refresh_token");
              const accessExpired = new Date(res.access_token_expired_at);
              const refreshExpired = new Date(res.refresh_token_expired_at);
              cookies.set("access_token", res.access_token, {
                expires: accessExpired,
              });
              cookies.set("refresh_token", res.refresh_token, {
                expires: refreshExpired,
              });
              if (config!.headers) {
                config!.headers.Authorization = `Bearer ${res.access_token}`;
              }
              return axios(config!);
            })
            .catch(() => {
              flag = false;
              cookies.remove("access_token");
              cookies.remove("refresh_token");
              window.location.href = "/signin";
            });
        }
      }
    }
    throw error;
  }
);
