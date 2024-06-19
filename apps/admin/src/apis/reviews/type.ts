export type ReviewsResponse = {
  reviews: ReviewsType[];
};

export type ReviewsType = {
  review_id: string;
  year: number;
  writer: string;
  date: string;
};

export type ReviewDetailResponse = {
  qna_responses: ReviewDetailType[];
};

export type ReviewDetailType = {
  question: string;
  answer: string;
  area: string;
};
