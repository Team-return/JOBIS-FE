import { ImageType, fileUpload } from "@/apis/files";
import { useMutation } from "@tanstack/react-query";

export const useFileUpload = () => {
  return useMutation((body: FormData) => fileUpload(body), {
    onSuccess: () => {},
  });
};
