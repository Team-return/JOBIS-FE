import {
  addRecruitArea,
  createRecruitmentsRequest,
  deleteRecruitArea,
  myRecruitment,
  myRecruitmentList,
  recruitmentCheck,
  recruitmentDetail,
  updateRecruitArea,
  updateRecruitment,
} from "@/apis/recruitments";
import {
  IArea,
  IEditRecruitmentRequest,
  IRecruitment,
} from "@/apis/recruitments/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@jobis/ui";
import { AxiosError } from "axios";

/** 모집의뢰 작성 */
export const useCreateRecruitmentRequest = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation((body: IRecruitment) => createRecruitmentsRequest(body), {
    onSuccess: () => {
      toast({
        payload: {
          type: "success",
          message: "모집의뢰서 작성에 성공하였습니다",
        },
      });
      router.push("/my");
    },
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response?.status === 400) {
        toast({
          payload: {
            type: "error",
            message: "입력되지 않은 필드가 있습니다.",
          },
        });
      } else if (err.response?.data.message === "Recruitment Already Exist") {
        toast({
          payload: {
            type: "error",
            message: "모집의뢰서가 이미 존재합니다.",
          },
        });
      } else {
        toast({
          payload: {
            type: "error",
            message: "모집의뢰서 작성에 실패하였습니다",
          },
        });
      }
    },
  });
};

/** 내 모집의뢰서 조회 */
export const useMyRecruitment = () => {
  return useQuery(["myRecruit"], () => myRecruitment(), {
    retry: 1,
  });
};

/**모집의뢰서 존재 여부 체크 */
export const useCheckRecruitment = () => {
  return useQuery(["recruitment"], () => recruitmentCheck());
};

/** 모집의뢰서 수정 */
export const useUpdateRecruitment = (id: string) => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(
    (body: IEditRecruitmentRequest) => updateRecruitment(body, id),
    {
      onSuccess: () => {
        toast({
          payload: {
            type: "success",
            message: "수정이 완료되었습니다",
          },
        });
        router.push("/my");
      },
      onError: () => {
        toast({
          payload: {
            type: "error",
            message: "수정에 실패하였습니다",
          },
        });
      },
    }
  );
};

/** 내 모집의뢰서 내역 조회 */
export const useMyRecruitmentList = () => {
  return useQuery(["myRecruitList"], () => myRecruitmentList());
};

/** 모집 분야 추가 */
export const useAddRecruitArea = (recruitmentId: string) => {
  const { toast } = useToast();

  return useMutation((body: IArea) => addRecruitArea(body, recruitmentId), {
    onError: () => {
      toast({
        payload: {
          type: "error",
          message: "모집분야 추가에 실패하였습니다",
        },
      });
    },
  });
};

/** 모집 분야 수정 */
export const useUpdateRecruitArea = () => {
  const { toast } = useToast();
  return useMutation(
    (body: IArea) => updateRecruitArea(body, body.id as number),
    {
      onError: () => {
        toast({
          payload: {
            type: "error",
            message: "모집분야 수정에 실패하였습니다",
          },
        });
      },
    }
  );
};

/** 모집 분야 삭제 */
export const useDeleteRecruitArea = () => {
  const { toast } = useToast();
  return useMutation(
    (recruitAreaId: number) => deleteRecruitArea(recruitAreaId),
    {
      onError: () => {
        toast({
          payload: {
            type: "error",
            message: "모집분야 삭제에 실패하였습니다",
          },
        });
      },
    }
  );
};

/** 모집의뢰서 상세 조회 */
export const useRecruitmentDetail = (recruitmentId: string) => {
  return useQuery(["recruitmentDetail", recruitmentId], () =>
    recruitmentDetail(recruitmentId)
  );
};
