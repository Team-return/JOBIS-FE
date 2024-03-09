import { fileUpload, requestPresignedURL } from "@/apis/files";
import { useMutation } from "@tanstack/react-query";

export const useCreatePresignedURL = () => {
  return useMutation((body: File[]) => fileUpload(body), {
    onSuccess: ({ data, files }) => {
      const { urls } = data;
      urls.map(({ pre_signed_url }, idx) => {
        requestPresignedURL(pre_signed_url, files[idx]);
      });
    },
  });
};
