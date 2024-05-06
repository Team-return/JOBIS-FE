import type { DateType } from "@/apis";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ApplicationType = { id: number; name: string };

type SelectApplicationState = {
  selectApplication: ApplicationType[];
  addSelectApplication: (application: ApplicationType) => void;
  deleteSelectApplication: (application: ApplicationType) => void;
  resetSelectApplication: () => void;
};

export const useSelectApplication = create<SelectApplicationState>()(
  devtools(set => ({
    selectApplication: [],
    addSelectApplication: application =>
      set(prev => ({
        selectApplication: [...prev.selectApplication, application],
      })),
    deleteSelectApplication: application =>
      set(prev => ({
        selectApplication: prev.selectApplication.filter(
          selectId => selectId.id !== application.id
        ),
      })),
    resetSelectApplication: () =>
      set({
        selectApplication: [],
      }),
  }))
);

type ApplicationFilterState = {
  applicationFilter: {
    year: number;
    status: string;
    companyOrStudentName: string;
  };
  setDropdownApplicationFilter: (
    name: string,
    value: string | number | null
  ) => void;
  setInputApplicationFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetApplicationFilter: () => void;
};

export const useApplicationFilter = create<ApplicationFilterState>()(
  devtools(set => ({
    applicationFilter: {
      year: new Date().getFullYear(),
      status: "",
      companyOrStudentName: "",
    },
    setDropdownApplicationFilter: (name, value) =>
      set(prev => ({
        applicationFilter: { ...prev.applicationFilter, [name]: value },
      })),
    setInputApplicationFilter: e =>
      set(prev => ({
        applicationFilter: {
          ...prev.applicationFilter,
          [e.target.name]: e.target.value,
        },
      })),
    resetApplicationFilter: () =>
      set({
        applicationFilter: {
          year: new Date().getFullYear(),
          status: "",
          companyOrStudentName: "",
        },
      }),
  }))
);

type RejectedMessageState = {
  rejectedMessage: string;
  setRejectedMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetRejectedMessage: () => void;
};

export const useRejectedMessage = create<RejectedMessageState>()(
  devtools(set => ({
    rejectedMessage: "",
    setRejectedMessage: e =>
      set({
        rejectedMessage: e.target.value,
      }),
    resetRejectedMessage: () =>
      set({
        rejectedMessage: "",
      }),
  }))
);

type FieldTrainDateState = {
  fieldTrainDate: DateType;
  setFieldTrainDate: (date: DateType) => void;
  resetFieldTrainDate: () => void;
};

export const useFieldTrainDate = create<FieldTrainDateState>()(
  devtools(set => ({
    fieldTrainDate: {
      startDate: "",
      endDate: "",
    },
    setFieldTrainDate: date =>
      set({
        fieldTrainDate: {
          startDate: date.startDate,
          endDate: date.endDate,
        },
      }),
    resetFieldTrainDate: () =>
      set({
        fieldTrainDate: {
          startDate: "",
          endDate: "",
        },
      }),
  }))
);
