import type { RecruitmentStatusKrType, WinterInternType } from "@/@types/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SelectRecruitmentIdState = {
  selectRecruitmentId: number[];
  addSelectRecruitmentId: (id: number) => void;
  deleteSelectRecruitmentId: (id: number) => void;
  resetSelectRecruitmentId: () => void;
};

export const useSelectRecruitmentId = create<SelectRecruitmentIdState>()(
  devtools(set => ({
    selectRecruitmentId: [],
    addSelectRecruitmentId: id =>
      set(prev => ({
        selectRecruitmentId: [...prev.selectRecruitmentId, id],
      })),
    deleteSelectRecruitmentId: id =>
      set(prev => ({
        selectRecruitmentId: prev.selectRecruitmentId.filter(
          selectId => selectId !== id
        ),
      })),
    resetSelectRecruitmentId: () =>
      set({
        selectRecruitmentId: [],
      }),
  }))
);

type SelectRecruitmentFilterState = {
  recruitmentFilter: {
    startDate: string | null;
    endDate: string | null;
    companyName: string;
    recruitmentStatus: RecruitmentStatusKrType | "";
    winterIntern: WinterInternType;
    year: string | number;
  };
  setDropdownRecruitmentFilter: (
    name: string,
    value: string | number | null
  ) => void;
  setInputRecruitmentFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetRecruitmentFilter: () => void;
};

export const useRecruitmentFilter = create<SelectRecruitmentFilterState>()(
  devtools(set => ({
    recruitmentFilter: {
      startDate: "",
      endDate: "",
      companyName: "",
      recruitmentStatus: "",
      winterIntern: "채용형",
      year: new Date().getFullYear(),
    },
    setDropdownRecruitmentFilter: (name, value) =>
      set(prev => ({
        recruitmentFilter: { ...prev.recruitmentFilter, [name]: value },
      })),
    setInputRecruitmentFilter: e =>
      set(prev => ({
        recruitmentFilter: {
          ...prev.recruitmentFilter,
          [e.target.name]: e.target.value,
        },
      })),
    resetRecruitmentFilter: () =>
      set({
        recruitmentFilter: {
          startDate: "",
          endDate: "",
          companyName: "",
          recruitmentStatus: "",
          winterIntern: "채용형",
          year: new Date().getFullYear(),
        },
      }),
  }))
);
