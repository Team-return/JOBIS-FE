import { instance } from "../axios";
import {
  IArea,
  IEditRecruitmentRequest,
  IMyRecruitmentResponse,
  IRecruitment,
} from "./types";

const router = "/recruitments";

export const createRecruitmentsRequest = async (
  body: IRecruitment,
  companyId: string
) => {
  const { data } = await instance.post<IRecruitment>(
    `${router}/${companyId}`,
    body
  );
  return data;
};

export const myRecruitment = async () => {
  const { data } = await instance.get<IMyRecruitmentResponse>(`${router}/my`);
  return data;
};

export const updateRecruitment = async (
  body: IEditRecruitmentRequest,
  id: number
) => {
  const { data } = await instance.patch<IRecruitment>(`${router}/${id}`, body);
  return data;
};

export const addRecruitArea = async (body: IArea, recruitmentId: number) => {
  const { data } = await instance.post(`${router}/${recruitmentId}/area`, body);
  return data;
};

export const updateRecruitArea = async (body: IArea, id: number) => {
  const { data } = await instance.patch(`${router}/area/${id}`, body);
  return data;
};
