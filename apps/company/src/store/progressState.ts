import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IProgressListState {
  progressList: IProgress[];
  setProgressList: (id: number) => void;
}

interface IHiringProgressState {
  hiringProgress: Omit<IProgress, "isSelect">[];
  setHiringProgress: (id: number, name: string) => void;
  delteHiringProgress: (id: number) => void;
  dragHiringProgress: (value: Omit<IProgress, "isSelect">[]) => void;
}

interface IProgress {
  id: number;
  name: string;
  isSelect: boolean;
}

export const useProgressListStore = create<IProgressListState>()(
  devtools((set) => ({
    progressList: [
      { id: 0, name: "서류전형", isSelect: true },
      { id: 1, name: "인적성테스트", isSelect: false },
      { id: 2, name: "코딩테스트", isSelect: false },
      { id: 3, name: "라이브코딩", isSelect: false },
      { id: 4, name: "AI 면접", isSelect: false },
      { id: 5, name: "과제 제출", isSelect: false },
      { id: 6, name: "컬쳐면접", isSelect: false },
      { id: 7, name: "기술면접", isSelect: false },
      { id: 8, name: "최종면접", isSelect: false },
    ],
    setProgressList: (id: number) =>
      set((state) => ({
        progressList: state.progressList.map((progress) =>
          progress.id === id ? { ...progress, isSelect: !progress.isSelect } : progress
        ),
      })),
  }))
);

export const useHiringProgressStore = create<IHiringProgressState>()(
  devtools((set) => ({
    hiringProgress: [{ id: 0, name: "서류전형" }],
    setHiringProgress: (id: number, name: string) =>
      set((state) => ({
        hiringProgress: state.hiringProgress.concat({ id, name }),
      })),
    delteHiringProgress: (id: number) =>
      set((state) => ({
        hiringProgress: state.hiringProgress.filter((progress) => progress.id !== id),
      })),
    dragHiringProgress: (value: Omit<IProgress, "isSelect">[]) =>
      set(() => ({
        hiringProgress: value,
      })),
  }))
);
