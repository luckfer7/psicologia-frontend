// import type { LoginRequest, LoginResponse } from "../types/auth";
import api from "./api";

export async function login () {
//     dados: LoginRequest
// ): Promise<LoginResponse> {

        const formData = new URLSearchParams();

        formData.append("username", "lucas@teste.com");
        formData.append("password", "123456");

    const response = await api.post(
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