export const applicationStatus = {
  REQUESTED: "승인요청",
  APPROVED: "승인",
  FAILED: "불합격",
  PASS: "합격",
  REJECTED: "반려",
  FIELD_TRAIN: "현장실습",
  ACCEPTANCE: "근로계약",
  SEND: "전송",
} as const;

export const applicationStatusTextColor = {
  REQUESTED: "#F1C40F",
  APPROVED: "#2ECC71",
  FAILED: "#E74C3C",
  PASS: "#004079",
  REJECTED: "#F17B0F",
  FIELD_TRAIN: "#7401DF",
  ACCEPTANCE: "#BC7A1E",
  SEND: "#135C9D",
} as const;
