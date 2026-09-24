
import type { Paciente } from "../types/paciente";
import api from "./api";

export interface CriarPacienteRequest {
    nome: string;
    telefone?: string;
    email?: string;
    data_nascimento?: string;
    observacoes?: string;
}

export async function listarPacientes(): Promise<Paciente[]> {
    const response = await api.get<Paciente[]>("/pacientes");

    return response.data;
}

export async function criarPaciente(dados: CriarPacienteRequest): Promise<Paciente> {
    const response = await api.post<Paciente>(
        "/adicionar_pacientes",
        dados
    );

    return response.data;
}