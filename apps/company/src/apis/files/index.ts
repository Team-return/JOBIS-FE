import { instance } from "../axios";

const router = "/files";

type ImageType = "LOGO_IMAGE" | "EXTENSION_FILE";

export const fileUpload = async (
  body: FormData,
  imageType: ImageType = "EXTENSION_FILE"
) => {
  const { data } = await instance.post(`${router}?type=${imageType}`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
