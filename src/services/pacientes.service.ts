import type { Paciente } from "../types/paciente";
import api from "./api";

export async function listarPacientes(): Promise<Paciente[]> {
    const response = await api.get<Paciente[]>("/pacientes");

    return response.data;
}