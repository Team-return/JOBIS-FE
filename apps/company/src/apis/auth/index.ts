import { instance } from "@/apis/axios";
import {
  IAuthorizationResponse,
  ICompanyLoginRequest,
  ICompanyLoginResponse,
} from "./types";

const router = "/auth";

export const companyLogin = async (body: ICompanyLoginRequest) => {
  const { data } = await instance.post<ICompanyLoginResponse>(
    `${router}/company`,
    body
  );
  return data;
};

export const ReissueToken = async (refreshToken: string) => {
  const { data } = await instance.put<IAuthorizationResponse>(
    `${router}/reissue?platform-type=WEB`,
    null,
    {
      headers: {
        "X-Refresh-Token": `${refreshToken}`,
      },
    }
  );

  return data;
};
