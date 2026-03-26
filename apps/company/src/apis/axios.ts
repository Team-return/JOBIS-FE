import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { reissueToken } from "./auth";

type ErrorResponseData = {
  message?: string;
  status?: number;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10_000
});

const cookie = new Cookies();

const clearAuthCookies = () => {
  cookie.remove("access_token", { path: "/" });
  cookie.remove("refresh_token", { path: "/" });
  cookie.remove("authority", { path: "/" });
};

const redirectTo = (path: string) => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== path) {
    window.location.href = path;
  }
};

instance.interceptors.request.use(
  config => {
    const accessToken = cookie.get("access_token");
    const returnConfig = {
      ...config
    };

    returnConfig.headers = returnConfig.headers ?? {};

    if (accessToken) {
      returnConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return returnConfig;
  },
  (error: AxiosError) => {
    throw error;
  }
);

instance.interceptors.response.use(
  async response => response,
  async (error: AxiosError<ErrorResponseData>) => {
    console.error(error);

    if (!axios.isAxiosError(error) || !error.response) {
      throw error;
    }

    const { config, response } = error;
    const refreshToken = cookie.get("refresh_token");
    const status = response.status ?? response.data?.status;
    const responseMessage = response.data?.message;
    const originalRequest = config as RetryableRequestConfig | undefined;
    const isReissueRequest = originalRequest?.url?.includes("/auth/reissue");
    const isAuthError =
      status === 401 ||
      status === 403 ||
      responseMessage === "Invalid Token" ||
      responseMessage === "Token Expired";

    if ((response.data?.status ?? response.status) >= 500) {
      redirectTo("/serverCheck");
      throw error;
    }

    if (!isAuthError) {
      throw error;
    }

    if (!originalRequest || originalRequest._retry || isReissueRequest) {
      clearAuthCookies();
      redirectTo("/");
      throw error;
    }

    if (!refreshToken) {
      clearAuthCookies();
      redirectTo("/");
      throw error;
    }

    originalRequest._retry = true;
    cookie.remove("access_token", { path: "/" });

    try {
      const res = await reissueToken(refreshToken);
      const accessExpired = new Date(res.access_expires_at);
      const refreshExpired = new Date(res.refresh_expires_at);

      cookie.set("access_token", res.access_token, {
        expires: accessExpired,
        path: "/"
      });
      cookie.set("refresh_token", res.refresh_token, {
        expires: refreshExpired,
        path: "/"
      });
      cookie.set("authority", res.authority, { path: "/" });

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${res.access_token}`;

      return instance(originalRequest);
    } catch (reissueError) {
      const reissueAxiosError = reissueError as AxiosError<ErrorResponseData>;
      const reissueStatus =
        reissueAxiosError.response?.status ??
        reissueAxiosError.response?.data?.status;

      if (
        reissueStatus === 404 ||
        reissueStatus === 401 ||
        reissueStatus === 403
      ) {
        clearAuthCookies();
        redirectTo("/");
      }

      throw reissueError;
    }
  }
);
