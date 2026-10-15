
import type { Anotacao, CriarAnotacaoRequest } from "../types/anotacao";
import type { Paciente } from "../types/paciente";
import type { CriarSessaoRequest, Sessao } from "../types/sessao";
import api from "./api";

export interface CriarPacienteRequest {
    nome: string;
    telefone: string | null;
    email: string | null;
    data_nascimento: string | null;
    observacoes: string | null;
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

export async function criarSessao(dados: CriarSessaoRequest): Promise<Sessao> {
    const response = await api.post<Sessao>(
        "/criar_sessao",
        dados
    )

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

export async function atualizarPaciente(pacienteId: number, dados: CriarPacienteRequest): Promise<void> {
    await api.put(
        `/pacientes/${pacienteId}`,
        dados
    );
}