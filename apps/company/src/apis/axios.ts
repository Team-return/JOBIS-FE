import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
import { ReissueToken } from "./auth";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

const cookie = new Cookies();

instance.interceptors.request.use(
  (config) => {
    const accessToken = cookie.get("access_token");
    const returnConfig = {
      ...config,
    };
    if (accessToken) {
      returnConfig.headers!["Authorization"] = `Bearer ${accessToken}`;
    }
    return returnConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      const { config } = error;
      const refreshToken = cookie.get("refresh_token");

      if (
        error.response.data.message === "Invalid Token" ||
        error.response.data.message === "Token Expired" ||
        error.message === "Request failed with status code 403"
      ) {
        const originalRequest = config;

        if (refreshToken) {
          ReissueToken(refreshToken)
            .then((res) => {
              const accessExpired = new Date(res.access_expires_at);
              const refreshExpired = new Date(res.refresh_expires_at);

              cookie.set("access_token", res.access_token, { expires: accessExpired, path: "/" });
              cookie.set("refresh_token", res.refresh_token, { expires: refreshExpired, path: "/" });
              if (originalRequest!.headers) originalRequest!.headers["Authorization"] = `Bearer ${res.access_token}`;
              return axios(originalRequest!);
            })
            .catch((err: AxiosError<AxiosError>) => {
              if (err.response?.data.status === 404 || err.response?.data.status === 401) {
                cookie.remove("access_token");
                cookie.remove("refresh_token");
                window.location.href = "/login";
              }
            });
        } else {
          cookie.remove("access_token");
          cookie.remove("refresh_token");
          window.location.href = "/login";
        }
      } else return Promise.reject(error);
    }
  }
);
