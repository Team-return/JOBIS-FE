import { instance } from "../axios";
import { IAuthorizationResponse } from "./types";

const router = "/auth";

export const getNoticeDetail = async (noticeId: string) => {
  const { data } = await instance.get(`${router}/${noticeId}`);
  return data;
};

export const ReissueToken = async (refresh_token: string) => {
  const response = await instance.put<IAuthorizationResponse>(`${router}/reissue`, null, {
    headers: {
      "X-Refresh-Token": `${refresh_token}`,
    },
  });

  return response.data;
};
