import type { ReactNode } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalData = {
  children?: ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  onReset?: () => void;
};

type ModalState = {
  isOpen: boolean;
  openModal: (modalData: ModalData) => void;
  closeModal: () => void;
  modalData: ModalData;
};

export const useModal = create<ModalState>()(
  devtools(set => ({
    isOpen: false,
    modalData: {},
    openModal: modalData => set({ isOpen: true, modalData }),
    closeModal: () => set({ isOpen: false, modalData: {} }),
  }))
);
