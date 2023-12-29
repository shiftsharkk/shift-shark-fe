import { create } from 'zustand';

import {
  TAdditionalDetailsSchema,
  TBankingDetailsSchema,
  TPersonalDetailsSchema,
} from '@/validations/profile';

type TServiceProviderSignupStoreData = {
  basicDetails: TPersonalDetailsSchema | null;
  bankingDetails: TBankingDetailsSchema | null;
  additionalDetails: TAdditionalDetailsSchema | null;
};

type TServiceProviderSignupStore = {
  setBasicDetails: (basicDetails: TPersonalDetailsSchema) => void;
  setBankingDetails: (bankingDetails: TBankingDetailsSchema) => void;
  setAdditionalDetails: (additionalDetails: TAdditionalDetailsSchema) => void;
};

export const useServiceProviderSignupStore = create<
  TServiceProviderSignupStoreData & TServiceProviderSignupStore
>((set) => ({
  basicDetails: null,
  bankingDetails: null,
  additionalDetails: null,
  setBasicDetails: (basicDetails) => set({ basicDetails }),
  setBankingDetails: (bankingDetails) => set({ bankingDetails }),
  setAdditionalDetails: (additionalDetails) => set({ additionalDetails }),
}));
