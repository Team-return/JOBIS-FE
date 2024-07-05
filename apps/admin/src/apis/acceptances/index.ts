import { type DateType, instance } from "@/apis";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

const router = "/acceptances";

/** 지원서 상태 변경 */
export const useFieldTrainApplication = (
  date: DateType,
  applicationIds: number[],
  option: MutationOptions
) => {
  const data = {
    application_ids: applicationIds,
    start_date: date.startDate,
    end_date: date.endDate,
  };

  return useMutation({
    ...option,
    mutationFn: () => instance.patch(`${router}/field-train`, data),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            toast.error("해당 지원서는 현장실습으로 변경할 수 없어요.");
            break;

          case 404:
            toast.error("해당 지원서를 찾을 수 없어요.");
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
