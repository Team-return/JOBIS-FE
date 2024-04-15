import axios from "axios";
import { RefreshResponse } from "./types";

const router = "/auth";

/** 토큰 재발급 */
export const reIssueToken = async (refreshToken: string) => {
  const { data } = await axios.put<RefreshResponse>(
    `${process.env.REACT_APP_BASE_URL}${router}/reissue`,
    null,
    {
      headers: {
        "X-Refresh-Token": `${refreshToken}`,
      },
    }
  );
  return data;
};
