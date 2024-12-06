import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
}

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  tokenDecoded: User | null;
};

export const useAuthToken = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      setToken: (token: string | null) => {
        const decodedToken = token ? jwtDecode<User>(token) : null;
        set({ token, tokenDecoded: decodedToken });
      },
      tokenDecoded: null,
    }),
    {
      name: "auth-token",
    }
  )
);
