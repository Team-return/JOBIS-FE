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

export const useCompanyRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation((body: ICompanyRegisterRequest) => companyRegister(body), {
    onSuccess: res => {
      const { company_id } = res;
      // append({
      //   type: "GREEN",
      //   message: "가입에 성공하였습니다",
      // });
      router.push(`/recruitments?company-id=${company_id}`);
      queryClient.invalidateQueries(["myRecruit"]);
      queryClient.invalidateQueries(["myCompany"]);
    },
    onError: () => {
      // append({
      //   type: "RED",
      //   message: "가입에 실패하였습니다",
      // });
    },
  });
};

export const useMyCompanyInfo = () => {
  return useQuery(["myCompany"], () => myCompanyInfo());
};

export const useUpdateCompanyInfo = (body: IUpdateCompanyInfoRequest) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    (companyId: number) => updateCompanyInfo(body, companyId),
    {
      onSuccess: () => {
        // append({ type: "GREEN", message: "기업 정보 수정이 완료 되었습니다." });
        queryClient.invalidateQueries(["myCompany"]);
        router.push("/mypage");
      },
      onError: () => {
        // append({ type: "RED", message: "기업 정보 수정에 실패하였습니다." });
      },
    }
  );
};
