export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;

    //é o que o fastapi devolve 
}