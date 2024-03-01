import { IArea } from "@/apis/recruitments/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAreaState {
  area: IArea;
  setArea: (area: IArea) => void;
  resetArea: () => void;
}

export const useAreaState = create<IAreaState>()(
  devtools((set) => ({
    area: { job_codes: [], tech_codes: [], hiring: 0, major_task: "", preferential_treatment: "" },
    setArea: (area: IArea) => set(() => ({ area })),
    resetArea: () =>
      set(() => ({ area: { job_codes: [], tech_codes: [], hiring: 0, major_task: "", preferential_treatment: "" } })),
  }))
);
