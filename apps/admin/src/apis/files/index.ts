import { MutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import fileSaver from "file-saver";

export const getFile = async (url: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_FILE_URL}${encodeURI(url)}`,
    {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/pdf",
        Accept: "application/pdf",
      },
    }
  );
  return res;
};

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

/** S3에 이미지 미리보기 링크 생성 */
export const usePresignLogoFile = (
  getFileCallback: (arg: void) => File,
  cleanUp: (arg: void) => void,
  option: MutationOptions<string>
) => {
  const file = getFileCallback();
  const presign = async (targetFile: File) => {
    const logo = {
      type: "LOGO_IMAGE",
      file_name: targetFile.name,
    };
    const { data } = await axios.post<{
      urls: {
        file_path: string;
        pre_signed_url: string;
      }[];
    }>(`${import.meta.env.VITE_BASE_URL}/files/pre-signed`, {
      files: [logo],
    });
    return { data, presignedFile: targetFile };
  };
  return useMutation({
    ...option,
    mutationFn: () =>
      presign(file).then(({ data, presignedFile }) => {
        const url = data.urls[0];

        return new Promise<string>(resolve => {
          axios
            .put(url.pre_signed_url, presignedFile)
            .then(() =>
              resolve(`${import.meta.env.VITE_FILE_URL}${url.file_path}`)
            );
        });
      }),
    onError: (err: AxiosError<AxiosError>) => {
      if (err.response) {
        if (err.response?.data.message === "Invalid Extension File") {
          toast.error("지원하지 않는 형식의 파일입니다.");
        }
      } else {
        toast.error("네트워크 연결을 확인해주세요.");
      }
      cleanUp();
    },
  });
};
