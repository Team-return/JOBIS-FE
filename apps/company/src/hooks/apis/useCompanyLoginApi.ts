import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { companyLogin } from "@/apis/auth";
import { ICompanyLoginRequest } from "@/apis/auth/types";
import { useToast } from "@jobis/ui";
import { Cookies } from "react-cookie";

export const useCompanyLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const cookie = new Cookies();

  return useMutation((body: ICompanyLoginRequest) => companyLogin(body), {
    onSuccess: res => {
      const {
        access_token,
        access_expires_at,
        refresh_expires_at,
        refresh_token,
        authority,
      } = res;
      const accessTokenExpire = new Date(access_expires_at);
      const refresTokenExpire = new Date(refresh_expires_at);
      cookie.set("access_token", access_token, {
        expires: accessTokenExpire,
        path: "/",
      });
      cookie.set("refresh_token", refresh_token, {
        expires: refresTokenExpire,
        path: "/",
      });
      cookie.set("authority", authority);
      toast({
        payload: {
          type: "success",
          message: "로그인에 성공하였습니다",
        },
      });
      router.push("/my");
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        toast({
          payload: {
            type: "error",
            message: "올바르지 않은 코드입니다.",
          },
        });
        cookie.remove("access_token");
        cookie.remove("refresh_token");
        cookie.remove("authority");
      }
    },
  });
};
