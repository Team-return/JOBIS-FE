import {
  companyRegister,
  myCompanyInfo,
  updateCompanyInfo,
} from "@/apis/company";
import {
  ICompanyRegisterRequest,
  IUpdateCompanyInfoRequest,
} from "@/apis/company/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@jobis/ui";
import { Cookies } from "react-cookie";
import { AxiosError } from "axios";

export const useCompanyRegister = () => {
  const router = useRouter();
  const { toast } = useToast();
  const cookie = new Cookies();

  return useMutation((body: ICompanyRegisterRequest) => companyRegister(body), {
    onSuccess: res => {
      const {
        access_token,
        access_expires_at,
        refresh_token,
        refresh_expires_at,
        authority,
      } = res;
      toast({
        payload: {
          type: "success",
          message: "가입에 성공하였습니다",
        },
      });
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
      router.push(`/my`);
    },
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response?.data.message === "Company Not Exists") {
        toast({
          payload: {
            type: "error",
            message: "기업이 존재하지 않습니다.",
          },
        });
      } else if (err.response?.data.message === "Company Already Exists") {
        toast({
          payload: {
            type: "error",
            message: "이미 존재하는 기업입니다.",
          },
        });
      } else {
        toast({
          payload: {
            type: "error",
            message: "가입에 실패하였습니다",
          },
        });
      }
    },
  });
};

export const useMyCompanyInfo = (enabled?: boolean) => {
  return useQuery(["myCompany"], () => myCompanyInfo(), {
    enabled,
  });
};

export const useUpdateCompanyInfo = (companyId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation(
    (body: IUpdateCompanyInfoRequest) => updateCompanyInfo(body, companyId),
    {
      onSuccess: () => {
        toast({
          payload: {
            type: "success",
            message: "기업 정보 수정이 완료 되었습니다.",
          },
        });
        queryClient.invalidateQueries(["myCompany"]);
        router.push("/my");
      },
      onError: () => {
        // append({ type: "RED", message: "기업 정보 수정에 실패하였습니다." });
      },
    }
  );
};
