import { ICompanyLoginResponse } from "../auth/types";
import { instance } from "../axios";
import {
  ICompanyRegisterRequest,
  ICheckBuisnessNumberResponse,
  IMyCompanyResponse,
  IUpdateCompanyInfoRequest,
} from "./types";

const router = "/companies";

export const checkBusinessNumber = async (businessNumber: string) => {
  const { data } = await instance.get<ICheckBuisnessNumberResponse>(
    `${router}/exists/${businessNumber.replaceAll("-", "")}`
  );
  return data;
};

export const companyRegister = async (body: ICompanyRegisterRequest) => {
  const { data } = await instance.post<ICompanyLoginResponse>(
    `${router}`,
    body
  );
  return data;
};

export const myCompanyInfo = async () => {
  const { data } = await instance.get<IMyCompanyResponse>(`${router}/my`);
  return data;
};

export const updateCompanyInfo = async (
  body: IUpdateCompanyInfoRequest,
  companyId: number
) => {
  const { data } = await instance.patch(`${router}/${companyId}`, body);
  return data;
};
