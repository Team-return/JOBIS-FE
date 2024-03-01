import { login } from "@/apis/users";
import { ILoginRequest } from "@/apis/users/types";
import { useMutation } from "@tanstack/react-query";
import cookie from "react-cookies";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useToastStore } from "@team-return/design-system";

export const useLogin = (body: ILoginRequest) => {
  const router = useRouter();
  const { append } = useToastStore();

  return useMutation(() => login(body), {
    onSuccess: (res) => {
      const { access_token, access_expires_at, refresh_expires_at, refresh_token, authority } = res;
      const accessTokenExpire = new Date(access_expires_at);
      const refresTokenExpire = new Date(refresh_expires_at);
      cookie.save("access_token", access_token, { expires: accessTokenExpire, path: "/" });
      cookie.save("refresh_token", refresh_token, { expires: refresTokenExpire, path: "/" });
      localStorage.setItem("authority", authority);
      append({
        type: "GREEN",
        message: "로그인에 성공하였습니다",
      });
      router.push("/");
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        append({ type: "RED", message: "비밀번호가 일치하지 않습니다" });
        cookie.remove("access_token");
        cookie.remove("refresh_token");
      }
    },
  });
};
