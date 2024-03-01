import { instance } from "../axios";
import { CodeType, ICodeResponse } from "./types";

const router = "/codes";

export const getCode = async (type: CodeType) => {
  const { data } = await instance.get<Promise<ICodeResponse>>(`${router}?type=${type}`);
  return data;
};
