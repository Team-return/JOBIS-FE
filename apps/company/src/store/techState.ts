import { ICode } from "@/apis/codes/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ITechState {
  techList: ICode[];
  appendTechList: (tech: ICode) => void;
  setTechList: (techs: ICode[]) => void;
  deleteTechList: (id: number) => void;
  resetTechList: () => void;
}

export const useTechState = create<ITechState>()(
  devtools(set => ({
    techList: [],
    appendTechList: tech =>
      set(state => ({ techList: [...state.techList, tech] })),
    setTechList: techs => set(() => ({ techList: techs })),
    deleteTechList: id =>
      set(state => ({
        techList: state.techList.filter(tech => tech.code !== id),
      })),
    resetTechList: () => set(() => ({ techList: [] })),
  }))
);
