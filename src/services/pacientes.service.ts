
import type { Anotacao, CriarAnotacaoRequest } from "../types/anotacao";
import type { Paciente } from "../types/paciente";
import type { Sessao } from "../types/sessao";
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

export async function listarSessoes(pacienteId: number): Promise<Sessao[]> {
    const response = await api.get<Sessao[]>(
        `/pacientes/${pacienteId}/sessoes`
    );

    return response.data
}

export async function listarAnotacoes(sessaoId: number): Promise<Anotacao[]> {
    const response = await api.get<Anotacao[]>(
        `/sessoes/${sessaoId}/anotacoes`
    );

    return response.data;
}

export async function criarAnotacao(dados: CriarAnotacaoRequest): Promise<Anotacao> {
    const response = await api.post<Anotacao>(
        "/anotacoes",
        dados
    );

    return response.data;
}