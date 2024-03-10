import { checkBusinessNumber } from "@/apis/company";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@jobis/ui";

export const useCheckBusinessNumber = (businessNumber: string) => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation(() => checkBusinessNumber(businessNumber), {
    onSuccess: res => {
      const { exists, company_name } = res;
      if (!exists) {
        const companyNameEncode = encodeURIComponent(company_name);
        router.push(
          `/registration?name=${companyNameEncode}&business-number=${businessNumber}`
        );
        toast({
          payload: {
            type: "message",
            message: "등록되지 않은 기업입니다.",
          },
        });
      }
    },
  });
};
