import { createContext } from "react";
import type { LoginRequest } from "../types/auth";

interface AuthContextData {
    token: string | null;
    login: (dados: LoginRequest) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);