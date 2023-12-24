import { create } from 'zustand';

import { TCompanyDetails, THirerUserDetails } from '../types/user';

type THirerSignupStoreData = {
  userDetails: THirerUserDetails | null;
  companyDetails: TCompanyDetails | null;
};

type THirerSignupStoreActions = {
  setUserDetails: (userDetails: THirerUserDetails) => void;
  setCompanyDetails: (companyDetails: TCompanyDetails) => void;
};

export const useHirerSignupStore = create<
  THirerSignupStoreData & THirerSignupStoreActions
>((set) => ({
  userDetails: null,
  companyDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),
  setCompanyDetails: (companyDetails) => set({ companyDetails }),
}));
