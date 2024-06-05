import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import fileSaver from "file-saver";

/** S3에서 파일 가져와서 다운로드 */
export const useDownloadData = () => {
  return useMutation({
    mutationFn: (url: string) =>
      axios.get(`${import.meta.env.VITE_FILE_URL}${encodeURI(url)}`, {
        responseType: "blob",
      }),
    onSuccess: (res, url) => {
      const data = new Blob([res.data], {
        type: res.headers["content-type"],
      });
      fileSaver.saveAs(data, url.split("/").at(-1)?.slice(37));
      toast.success("성공적으로 다운로드 되었습니다.");
    },
    onError: () => {
      toast.error("다운로드에 실패했습니다.");
    },
  });
};
