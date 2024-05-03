import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { instance, type CompanyResponse } from "@/apis";
import type { CompanyType } from "@/@types/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const router = "/companies";

/** 기업을 조회하는 api입니다. */
export const useGetAllCompany = () => {
  return useQuery({
    queryKey: ["getAllCompany"],
    queryFn: async () => {
      const { data } = await instance.get<CompanyResponse>(`${router}/teacher`);
      return data;
    },
  });
};

/** 기업 구분 변경 */
export const useChangeCompanyType = (
  type: CompanyType,
  companyIds: number[],
  options: MutationOptions
) => {
  const data = {
    company_ids: companyIds,
    company_type: type,
  };

  return useMutation({
    ...options,
    mutationFn: () => instance.patch(`${router}/type`, data),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            toast.error("해당 기업을 찾을 수 없어요.");
            break;

          case 500:
            toast.error("개발자에게 문의해주세요.");
            break;
        }
      } else {
        toast.error("네트워크 연결을 확인해주세요.");
      }
    },
  });
};

/** 기업 협약 변경 */
export const useChangeCompanyMOU = (
  companyIds: number[],
  options: MutationOptions
) => {
  return useMutation({
    ...options,
    mutationFn: () =>
      instance.patch(`${router}/mou`, {
        company_ids: companyIds,
      }),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            toast.error("해당 기업을 찾을 수 없어요.");
            break;

          case 500:
            toast.error("개발자에게 문의해주세요.");
            break;
        }
      } else {
        toast.error("네트워크 연결을 확인해주세요.");
      }
    },
  });
};
