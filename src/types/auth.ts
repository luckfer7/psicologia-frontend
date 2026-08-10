export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    acess_token: string;
    token_type: string;
}