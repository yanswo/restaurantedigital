import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { id: string; name: string; role: string } | null;
  setAuth: (
    token: string,
    user: { id: string; name: string; role: string }
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  (set: (partial: Partial<AuthState>) => void) => ({
    token: null,
    user: null,
    setAuth: (
      token: string,
      user: { id: string; name: string; role: string }
    ) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
  })
);
