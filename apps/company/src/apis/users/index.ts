import { instance } from "../axios";
import { ILoginRequest, ILoginResponse } from "./types";
const router = "/users";

export const login = async (body: ILoginRequest) => {
  const { data } = await instance.post<ILoginResponse>(`${router}/login`, body);
  return data;
};
