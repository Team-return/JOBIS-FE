import type { ApplicationENStatusType } from "@/@types/types";
import { instance, type ApplicationResponse } from "@/apis";
import { convertObjectToQueryString } from "@/utils";
import {
  useMutation,
  useQuery,
  type MutationOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const router = "/applications";

/** 지원서를 조회하는 api입니다. */
export const useGetAllApplication = (
  status?: "REQUESTED" | "APPROVED",
  id?: number
) => {
  return useQuery({
    queryKey: ["getAllApplication", status, id],
    queryFn: async () => {
      const { data } = await instance.get<ApplicationResponse>(
        `${router}${convertObjectToQueryString({
          application_status: status,
          recruitment_id: id,
        })}`
      );
      return data;
    },
  });
};

/** 지원서 상태 변경 */
export const useChangeApplicationStatus = (
  status: ApplicationENStatusType,
  applicationIds: number[],
  option?: MutationOptions
) => {
  const data = {
    application_ids: applicationIds,
    status: status,
  };

  return useMutation({
    ...option,
    mutationFn: () => instance.patch(`${router}/status`, data),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            toast.error("해당 학생을 찾을 수 없어요.");
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

/** 지원서 반려 */
export const useRejectApplication = (
  applicationId: number,
  message: string,
  option: MutationOptions
) => {
  return useMutation({
    ...option,
    mutationFn: () =>
      instance.patch(`${router}/rejection/${applicationId}`, {
        reason: message,
      }),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            toast.error("해당 지원서를 찾을 수 없어요.");
            break;

          case 409:
            toast.error("이미 반려한 지원서에요.");
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
