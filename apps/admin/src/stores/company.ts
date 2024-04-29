import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SelectCompanyIdState = {
  selectCompanyId: number[];
  addSelectCompanyId: (id: number) => void;
  deleteSelectCompanyId: (id: number) => void;
  resetSelectCompanyId: () => void;
};

export const useSelectCompanyId = create<SelectCompanyIdState>()(
  devtools(set => ({
    selectCompanyId: [],
    addSelectCompanyId: id =>
      set(prev => ({
        selectCompanyId: [...prev.selectCompanyId, id],
      })),
    deleteSelectCompanyId: id =>
      set(prev => ({
        selectCompanyId: prev.selectCompanyId.filter(
          selectId => selectId !== id
        ),
      })),
    resetSelectCompanyId: () =>
      set({
        selectCompanyId: [],
      }),
  }))
);

type CompanyFilterState = {
  companyFilter: {
    division: string;
    region: string;
    businessArea: string;
    companyName: string;
  };
  setDropdownCompanyFilter: (
    name: string,
    value: string | number | null
  ) => void;
  setInputCompanyFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetCompanyFilter: () => void;
};

export const useCompanyFilter = create<CompanyFilterState>()(
  devtools(set => ({
    companyFilter: {
      division: "",
      region: "",
      businessArea: "",
      companyName: "",
    },
    setDropdownCompanyFilter: (name, value) =>
      set(prev => ({
        companyFilter: { ...prev.companyFilter, [name]: value },
      })),
    setInputCompanyFilter: e =>
      set(prev => ({
        companyFilter: {
          ...prev.companyFilter,
          [e.target.name]: e.target.value,
        },
      })),
    resetCompanyFilter: () =>
      set({
        companyFilter: {
          division: "",
          region: "",
          businessArea: "",
          companyName: "",
        },
      }),
  }))
);
