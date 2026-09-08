import api from "./api";

export async function listarPacientes() {
    const response = await api.get("/pacientes");

    return response.data;
}