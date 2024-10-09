import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
import { ReissueToken } from "./auth";
import * as Sentry from "@sentry/nextjs";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10_000,
});

const cookie = new Cookies();

instance.interceptors.request.use(
  config => {
    const accessToken = cookie.get("access_token");
    const returnConfig = {
      ...config,
    };
    if (accessToken) {
      returnConfig.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return returnConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async response => response,
  async (error: AxiosError<AxiosError>) => {
    console.error(error);
    Sentry.captureException(error);
    if (axios.isAxiosError(error) && error.response) {
      const {
        config,
        response: { data },
      } = error;
      const refreshToken = cookie.get("refresh_token");
      const { response, message } = error;

      Sentry.captureMessage(data.message);

      if (
        response.data.message === "Invalid Token" ||
        response.data.message === "Token Expired" ||
        message === "Request failed with status code 403"
      ) {
        const originalRequest = config;

        if (refreshToken) {
          cookie.remove("access_token");
          ReissueToken(refreshToken)
            .then(res => {
              const accessExpired = new Date(res.access_expires_at);
              const refreshExpired = new Date(res.refresh_expires_at);

              cookie.set("access_token", res.access_token, {
                expires: accessExpired,
                path: "/",
              });
              cookie.set("refresh_token", res.refresh_token, {
                expires: refreshExpired,
                path: "/",
              });
              cookie.set("authority", res.authority);
              if (originalRequest!.headers) {
                originalRequest!.headers.Authorization = `Bearer ${res.access_token}`;
              }
              return axios(originalRequest!);
            })
            .catch((err: AxiosError<AxiosError>) => {
              const { response: errorResponse } = err;

              if (
                errorResponse?.data.status === 404 ||
                errorResponse?.data.status === 401
              ) {
                cookie.remove("access_token");
                cookie.remove("refresh_token");
                window.location.href = "/";
              }
            });
        } else {
          cookie.remove("access_token");
          cookie.remove("refresh_token");
          window.location.href = "/";
        }
      } else {
        throw error;
      }
    }
  }
);
