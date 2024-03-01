import { companyApplicants } from "@/apis/applicants";
import { useQuery } from "@tanstack/react-query";

export const useCompanyApplicants = () => {
  return useQuery(["companyApplicants"], () => companyApplicants());
};
