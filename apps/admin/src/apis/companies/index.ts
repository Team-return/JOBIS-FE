import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import {
  CompanyDetailResponse,
  instance,
  CompanyResponse,
  CompanyDetailPatchRequest,
} from "@/apis";
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

/** 기업체 등록(선생님) */
export const useRegisterCompany = (
  companyName: string,
  businessNumber: string,
  companyProfileUrl: string,
  option: MutationOptions
) => {
  return useMutation({
    ...option,
    mutationFn: () =>
      instance
        .post(`${router}/teacher`, {
          company_name: companyName,
          business_number: businessNumber,
          company_profile_url: companyProfileUrl,
        })
        .then(async () => {
          const res = await instance.get("/recruitments/teacher/manual");
          const list: {
            id: number;
            company_name: string;
            company_profile_url: string;
          }[] = res.data.recruitments;

          const target = list.find(e => e.company_name == companyName);

          if (!target) {
            throw new Error("기업이 추가되지 않았습니다.");
          }
          return target.id;
        }),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error("정보를 전부 입력해주세요.");
            break;

          case 404:
            toast.error("유효하지 않은 사업자 등록 번호입니다.");
            break;

          case 409:
            toast.error("이미 존재하는 기업입니다.");
        }
      } else {
        toast.error("네트워크 연결을 확인해주세요.");
      }
    },
  });
};

/** 회사정보 상세 조회 */
export const useGetCompanyDetail = (companyId: number) => {
  return useQuery({
    queryKey: ["getCompanyDetail", companyId],
    queryFn: async () => {
      const { data } = await instance.get<CompanyDetailResponse>(
        `${router}/${companyId}`
      );
      return data;
    },
  });
};

/** 회사정보 업데이트 */
export const useChangeCompanyDetail = (
  companyId: number,
  data: CompanyDetailPatchRequest,
  options: MutationOptions
) => {
  return useMutation({
    ...options,
    mutationFn: () => instance.patch(`${router}/${companyId}`, data),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error("유효하지 않은 입력값이 있습니다.");
            break;

          default:
            toast.error("예상할 수 없는 오류입니다.");
        }
      } else {
        toast.error("네트워크 연결을 확인해주세요.");
      }
    },
  });
};
