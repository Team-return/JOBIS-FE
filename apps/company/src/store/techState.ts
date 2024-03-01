import { ICode } from "@/apis/codes/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ITechState {
  techList: ICode[];
  appendTechList: (tech: ICode) => void;
  deleteTechList: (id: number) => void;
  resetTechList: () => void;
}

export const useTechState = create<ITechState>()(
  devtools((set) => ({
    techList: [],
    appendTechList: (tech: ICode) => set((state) => ({ techList: [...state.techList, tech] })),
    deleteTechList: (id: number) => set((state) => ({ techList: state.techList.filter((tech) => tech.code !== id) })),
    resetTechList: () => set(() => ({ techList: [] })),
  }))
);
