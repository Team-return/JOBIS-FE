import axios from "axios";
import { instance } from "../axios";
import { PresignedURLResponse } from "./types";

const router = "/files";

export type ImageType = "LOGO_IMAGE" | "EXTENSION_FILE";

export const fileUpload = async (files: File[]) => {
  const body = files.map(file => ({
    type: "LOGO_IMAGE",
    file_name: file.name,
  }));
  const { data } = await instance.post<PresignedURLResponse>(
    `${router}/pre-signed`,
    {
      files: body,
    }
  );
  return { data, files };
};

export const requestPresignedURL = async (presignedURL: string, file: File) =>
  await axios.put(presignedURL, file);
