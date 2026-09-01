import { useState, type ReactNode } from "react";
import { login as loginService } from "../services/auth.service";
import type { LoginRequest } from "../types/auth";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider ({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    })
    
    const [loading, setLoading] = useState(false);
    
    

    // useEffect(() => {
    //     const tokenSalvo = localStorage.getItem("token");

    //     if(tokenSalvo) {
    //         setToken(tokenSalvo)
    //     }

    //     setLoading(false);

    //     //se o usuário fecha o navegador e abre novamente, o token continua disponível
    // }, [])

    async function login(dados: LoginRequest) {
        //recebe o dados que são login e senha
        try {
            const resposta = await loginService(dados);
            //aqui se recebe a string do token criptografa e o tal do bearer

            localStorage.setItem(
                "token",
                resposta.access_token
            );

            setToken(resposta.access_token); //atualiza o react
        } finally {
            setLoading(false);
        }
        
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

