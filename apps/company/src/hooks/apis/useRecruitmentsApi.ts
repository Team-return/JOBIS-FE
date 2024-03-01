import {
  addRecruitArea,
  createRecruitmentsRequest,
  myRecruitment,
  updateRecruitArea,
  updateRecruitment,
} from "@/apis/recruitments";
import {
  IArea,
  IEditRecruitmentRequest,
  IRecruitment,
} from "@/apis/recruitments/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/** 모집의뢰 작성 */
export const useCreateRecruitmentRequest = (companyId: number) => {
  const router = useRouter();

  return useMutation(
    (body: IRecruitment) => createRecruitmentsRequest(body, companyId),
    {
      onSuccess: () => {
        // append({
        //   type: "GREEN",
        //   message: "모집의뢰서 작성에 성공하였습니다",
        // });
        alert("모집의뢰서 작성에 성공하였습니다");
        router.push("/");
      },
      onError: () => {
        // append({
        //   type: "RED",
        //   message: "모집의뢰서 작성에 실패하였습니다",
        // });
        alert("모집의뢰서 작성에 실패하였습니다.");
      },
    }
  );
};

/** 내 모집의뢰서 조회 */
export const useMyRecruitment = () => {
  return useQuery(["myRecruit"], () => myRecruitment(), {
    retry: 1,
  });
};

export const useUpdateRecruitment = (body: IEditRecruitmentRequest) => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => updateRecruitment(body, id), {
    onSuccess: () => {
      // append({
      //   type: "GREEN",
      //   message: "수정이 완료되었습니다",
      // });
      queryClient.invalidateQueries(["myRecruit"]);
    },
    onError: () => {
      // append({
      //   type: "RED",
      //   message: "수정에 실패하였습니다",
      // });
    },
  });
};

export const useAddRecruitArea = (body: IArea, recruitment_id: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => addRecruitArea(body, recruitment_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["myRecruit"]);
      // append({
      //   type: "GREEN",
      //   message: "성공적으로 추가되었습니다",
      // });
    },
    onError: () => {
      // append({
      //   type: "RED",
      //   message: "추가에 실패하였습니다",
      // });
    },
  });
};

export const useUpdateRecruitArea = (body: IArea) => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => updateRecruitArea(body, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["myRecruit"]);
      // append({
      //   type: "GREEN",
      //   message: "수정이 완료되었습니다",
      // });
    },
    onError: () => {
      // append({
      //   type: "RED",
      //   message: "수정에 실패하였습니다",
      // });
    },
  });
};
