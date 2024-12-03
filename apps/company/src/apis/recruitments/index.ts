import { instance } from "../axios";
import {
  IArea,
  IEditRecruitmentRequest,
  IMyRecruitmentListResponse,
  IMyRecruitmentResponse,
  IRecruitment,
  IRecruitmentCheck,
} from "./types";

const router = "/recruitments";

export const createRecruitmentsRequest = async (body: IRecruitment) => {
  const { data } = await instance.post<IRecruitment>(`${router}`, body);
  return data;
};

export const myRecruitment = async () => {
  const { data } = await instance.get<IMyRecruitmentResponse>(
    `${router}/my/recent`
  );
  return data;
};

export const myRecruitmentList = async () => {
  const { data } = await instance.get<IMyRecruitmentListResponse>(
    `${router}/my`
  );
  return data;
};

export const updateRecruitment = async (
  body: IEditRecruitmentRequest,
  recruitmentId: string
) => {
  const response = await instance.patch<IRecruitment>(
    `${router}/${recruitmentId}`,
    body
  );
  return response;
};

export const addRecruitArea = async (body: IArea, recruitmentId: string) => {
  const response = await instance.post(`${router}/${recruitmentId}/area`, body);
  return response;
};

export const updateRecruitArea = async (body: IArea, id: number) => {
  const response = await instance.patch(`${router}/area/${id}`, body);
  return response;
};

export const deleteRecruitArea = async (recruitAreaId: number) => {
  const response = await instance.delete(`${router}/area/${recruitAreaId}`);
  return response;
};

export const recruitmentDetail = async (recruitmentId: string) => {
  const { data } = await instance.get<IMyRecruitmentResponse>(
    `${router}/${recruitmentId}`
  );
  return data;
};

export const recruitmentCheck = async () => {
  const { data } = await instance.get<IRecruitmentCheck>(`${router}/exists`);
  return data;
};
