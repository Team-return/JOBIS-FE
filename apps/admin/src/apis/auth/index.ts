import axios from "axios";
import type { RefreshResponse } from "@/apis";

const router = "/auth";

/** 토큰 재발급 */
export const reIssueToken = async (refreshToken: string) => {
  const { data } = await axios.put<RefreshResponse>(
    `${import.meta.env.VITE_BASE_URL}${router}/reissue?platform-type=WEB`,
    null,
    {
      headers: {
        "X-Refresh-Token": `${refreshToken}`,
      },
    }
  );
  return data;
};
