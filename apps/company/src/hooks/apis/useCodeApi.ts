import { getCode } from "@/apis/codes";
import { CodeType } from "@/apis/codes/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCode = (type: CodeType) => {
  return useQuery(["code", type], () => getCode(type));
};
