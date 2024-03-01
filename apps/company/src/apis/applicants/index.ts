import { instance } from "../axios";
import { ICompanyApplicantsResponse } from "./types";

const router = "/applications";

export const companyApplicants = async () => {
  const { data } = await instance.get<ICompanyApplicantsResponse>(`${router}/company`);
  return data;
};
