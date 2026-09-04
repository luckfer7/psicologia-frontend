import type { LoginRequest, LoginResponse } from "../types/auth";
import api from "./api";

export async function login ( dados: LoginRequest ): Promise<LoginResponse> {

        const formData = new URLSearchParams();

        formData.append("username", dados.email);
        formData.append("password", dados.senha);

        const response = await api.post<LoginResponse>(
            "/auth/login",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

    return response.data;
}

//Promise<LoginResponse>

// significa: 
// "Essa função assíncrona vai retornar uma Promise cujo resultado é um LoginResponse."