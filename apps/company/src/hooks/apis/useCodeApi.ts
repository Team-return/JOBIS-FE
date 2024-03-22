import { addCode, getCode } from "@/apis/codes";
import { CodeType, IAddCodeRequest } from "@/apis/codes/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@jobis/ui";

export const useGetCode = (type: CodeType) => {
  return useQuery(["code", type], () => getCode(type));
};

export const useAddCode = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation((type: IAddCodeRequest) => addCode(type), {
    onSuccess: () => {
      toast({
        payload: { type: "success", message: "성공적으로 추가되었습니다." },
      });
      queryClient.invalidateQueries(["code"]);
    },
    onError: () => {
      toast({
        payload: { type: "error", message: "추가에 실패하였습니다" },
      });
    },
    retry: 3,
  });
};
