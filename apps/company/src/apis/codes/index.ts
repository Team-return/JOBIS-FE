import { instance } from "../axios";
import {
  CodeType,
  IAddCodeRequest,
  IAddCodeResponse,
  ICodeResponse,
} from "./types";

const router = "/codes";

export const getCode = async (type: CodeType) => {
  const { data } = await instance.get<Promise<ICodeResponse>>(
    `${router}?type=${type}`
  );
  return data;
};

export const addCode = async (body: IAddCodeRequest) => {
  const { data } = await instance.post<Promise<IAddCodeResponse>>(
    `${router}`,
    body
  );
  return data;
};
