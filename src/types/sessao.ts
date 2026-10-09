export interface Sessao {
    id: number;
    data_horario: string;
    status: string;
    paciente_id: number;
}

export interface CriarSessaoRequest {
    data_horario: string;
    paciente_id: number;
    status: "agendada" | "realizada" | "cancelada" | "faltou"
}