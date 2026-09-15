export interface Sessao {
    id: number;
    paciente_id: number;
    data_horario: string;
    status: string;
}

export interface Paciente {
    id: number;
    nome: string;
    data_nascimento: string | null;
    telefone: string;
    email: string | null;
    observacoes: string | null;
    status: string;
    sessoes: Sessao[];
}

//o typescript vai saber o formato dos dados que vem da api 