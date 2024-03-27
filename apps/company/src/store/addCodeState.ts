import { ICode } from "@/apis/codes/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAddedJob {
  addedJob: ICode[];
  appendAddedJob: (job: ICode) => void;
  setAddedJob: (job: ICode[]) => void;
  resetAddedJob: () => void;
}

export const useAddedJob = create<IAddedJob>()(
  devtools(set => ({
    addedJob: [],
    appendAddedJob: job =>
      set(state => ({ addedJob: [...state.addedJob, job] })),
    setAddedJob: jobs => set(() => ({ addedJob: jobs })),
    resetAddedJob: () =>
      set(() => ({
        addedJob: [],
      })),
  }))
);

interface IAddedTech {
  addedTechList: ICode[];
  appendAddedTechList: (tech: ICode) => void;
  setAddedTechList: (tech: ICode[]) => void;
  resetAddedTechList: () => void;
  deleteAddedTechList: (id: number) => void;
}

export const useAddedTech = create<IAddedTech>()(
  devtools(set => ({
    addedTechList: [],
    appendAddedTechList: tech =>
      set(state => ({ addedTechList: [...state.addedTechList, tech] })),
    setAddedTechList: techs => set(() => ({ addedTechList: techs })),
    resetAddedTechList: () =>
      set(() => ({
        addedTechList: [],
      })),
    deleteAddedTechList: id =>
      set(state => ({
        addedTechList: state.addedTechList.filter(tech => tech.code !== id),
      })),
  }))
);
