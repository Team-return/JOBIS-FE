import { checkBusinessNumber } from "@/apis/company";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCheckBusinessNumber = (businessNumber: string) => {
  const router = useRouter();
  return useMutation(() => checkBusinessNumber(businessNumber), {
    onSuccess: res => {
      const { company_id, company_name } = res;

      if (company_id) {
        router.push(`/recruitments?company-id=${company_id}`);
      } else {
        const companyNameEncode = encodeURIComponent(company_name);
        router.push(
          `/registration?name=${companyNameEncode}&business-number=${businessNumber}`
        );
      }
    },
  });
};
