export interface Anotacao {
    id: number;
    texto: string;
    data_criacao: string;
    sessao_id: number;
}

export interface CriarAnotacaoRequest {
    texto: string;
    sessao_id: number;
}