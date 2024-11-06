import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalType =
  | "MAIN_ADDRESS"
  | "SUB_ADDRESS"
  | "HIRING_PROGRESS"
  | "GATHER_FIELD"
  | "USE_TECH"
  | "LICENSE"
  | "EDIT_RECRUIT_AREA"
  | "ADD_RECRUIT_AREA"
  | "EDIT_COMPANY_INFO"
  | "";

export interface IModalState {
  modalState: ModalType;
  setModalState: (modalState: ModalType) => void;
}

export const ModalStateStore = create<IModalState>()(
  devtools(set => ({
    modalState: "",
    setModalState: modalState => set(() => ({ modalState })),
  }))
);
