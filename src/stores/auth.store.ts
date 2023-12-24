import { create } from 'zustand';

import { TAuthUser } from '../types/user';

type TAuthStoreData = {
  user: TAuthUser | null;
};

type TAuthStoreActions = {
  setUser: (user: TAuthUser) => void;
};

export const useAuthStore = create<TAuthStoreData & TAuthStoreActions>(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })
);
