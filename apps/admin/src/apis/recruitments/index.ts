/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "@apis/axios";
import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import type { RecruitmentFormResponse } from "@/apis";
import type { RecruitmentStatusType, WinterInternType } from "@@types/types";
import toast from "react-hot-toast";
import { winterInternStringToBool } from "@@types/enums";
import { AxiosError } from "axios";

const router = "/recruitments";

/** 모집의뢰서를 조회하는 api입니다. */
export const useGetAllRecruitmentForm = ({
  year,
  winterIntern,
}: {
  year: number;
  winterIntern: WinterInternType;
}) => {
  return useQuery({
    queryKey: ["getAllRecruitmentForm", year, winterIntern],
    queryFn: async () => {
      const { data } = await instance.get<RecruitmentFormResponse>(
        `${router}/teacher/no-page?year=${year}&winter_intern=${winterInternStringToBool[winterIntern]}`
      );
      return data;
    },
  });
};

/** 선생님 모집의뢰 상태 변경 */
export const useChangeRecruitmentsStatus = (
  status: RecruitmentStatusType,
  recruitmentIds: number[],
  options: MutationOptions
) => {
  const data = {
    recruitment_ids: recruitmentIds,
    status,
  };

  return useMutation({
    ...options,
    mutationFn: () => instance.patch(`${router}/status`, data),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            toast.error("해당 모집의뢰가 존재하지 않아요.");
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
