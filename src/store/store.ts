import { user } from "@prisma/client";
import { create } from "zustand";

interface AppState {
  user: user | null;
  setUser: (user: user | null) => void;
  logout: () => void;
}

const logMiddleware = (config) => (set, get, api) =>
  config((args) => {
    console.log("State before update:", get());
    set(args);
    console.log("State after update:", get());
  });

export const useStore = create<AppState>((set, get) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),
  logout: () =>
    set((state) => {
      localStorage.removeItem("jwt");
      return { user: null };
    }),
}));
