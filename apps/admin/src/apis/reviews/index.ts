import { useQuery } from "@tanstack/react-query";
import {
  instance,
  type ReviewDetailResponse,
  type ReviewsResponse,
} from "@/apis";

const router = "/reviews";

export const useGetReviews = (id: number) => {
  return useQuery({
    queryKey: ["getReviews", id],
    queryFn: async () => {
      const { data } = await instance.get<ReviewsResponse>(`${router}/${id}`);
      return data;
    },
  });
};

export const useGetReviewDetail = (id: string) => {
  return useQuery({
    queryKey: ["getReviewDetail", id],
    queryFn: async () => {
      const { data } = await instance.get<ReviewDetailResponse>(
        `${router}/details/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
};
