import { user } from "@prisma/client";
import { create } from "zustand";
import { getToken } from "../util/window";

interface AppState {
  user: user | null;
  setUser: (user: user | null) => void;
  logout: () => void;
  token?: string;
  setToken: () => void;
}

const logMiddleware = (config) => (set, get, api) =>
  config((args) => {
    console.log("+".repeat(10), "State before update:", get());
    set(args);
    console.log("+".repeat(10), "State after update:", get());
  });

const stateCreator = (set, get: AppState): AppState => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),
  logout: () =>
    set((state) => {
      localStorage.removeItem("token");
      return { user: null };
    }),
  setToken: () => {
    set((state) => {
      const token = getToken();
      return { token };
    });
  },
});
export const useStore = create<AppState>(logMiddleware(stateCreator));
