/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "@apis/axios";
import { useQuery } from "@tanstack/react-query";
import type { CodesResponse, CodesTypeEnum } from "@/apis";

const router = "/codes";

/** 기업을 조회하는 api입니다. */
export const useGetCodes = (type: CodesTypeEnum) => {
  return useQuery({
    queryKey: ["getAllCodes"],
    queryFn: async () => {
      const { data } = await instance.get<CodesResponse>(
        `${router}?type=${type}`
      );
      return data;
    },
  });
};
