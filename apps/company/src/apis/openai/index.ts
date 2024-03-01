import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RequiredLicensesListResponse } from "./types";

/** 국가 자격 목록 조회하는 api입니다. */
export const useGetRequiredLicensesList = (page: number, perPage: number) => {
  return useQuery(
    ["getRequiredLicensesList", page, perPage],
    async () => {
      const { data } = await axios.get<RequiredLicensesListResponse>(
        `https://api.odcloud.kr/api/15037516/v1/uddi:a4572d6a-2f56-440d-b79b-d4259f202049?page=${page}&perPage=${perPage}&serviceKey=${process.env.NEXT_PUBLIC_REQUIRED_LICENSES_ENCODING_KEY}`
      );
      return data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );
};
