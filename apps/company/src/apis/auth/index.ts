import { instance } from "../axios";
import { IAuthorizationResponse } from "./types";

const router = "/auth";

export const getNoticeDetail = async (noticeId: string) => {
  const { data } = await instance.get(`${router}/${noticeId}`);
  return data;
};

export const ReissueToken = async (refreshToken: string) => {
  const response = await instance.put<IAuthorizationResponse>(
    `${router}/reissue`,
    null,
    {
      headers: {
        "X-Refresh-Token": `${refreshToken}`,
      },
    }
  );

  return response.data;
};
