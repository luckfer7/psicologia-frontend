import { createContext, useEffect, useState, type ReactNode } from "react";
import { login as loginService } from "../services/auth.service";
import type { LoginRequest } from "../types/auth";

interface AuthContextData {
    token: string | null;
    login: (dados: LoginRequest) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export function AuthProvider ({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const tokenSalvo = localStorage.getItem("token");

        if(tokenSalvo) {
            setToken(tokenSalvo)
        }

        setLoading(false);

        //se o usuário fecha o navegador e abre novamente, o token continua disponível
    }, [])

    async function login(dados: LoginRequest) {
        //recebe o dados que são login e senha

        const resposta = await loginService(dados);
        //aqui se recebe a string do token criptografa e o tal do bearer

        localStorage.setItem(
            "token",
            resposta.access_token
        );

        setToken(resposta.access_token); //atualiza o react
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider 
                value={{
                    token,
                    login,
                    logout,
                    loading,
                }}
        >
            {children}
        </AuthContext.Provider>    
    )
}

