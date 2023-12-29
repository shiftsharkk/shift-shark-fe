import { create } from 'zustand';
import { TUser } from '../types/user';

type TUserStoreData = {
  user: TUser | null;
};

type TUserStoreActions = {
  setUser: (user: TUser | null) => void;
};

export const useUserStore = create<TUserStoreData & TUserStoreActions>(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })
);
