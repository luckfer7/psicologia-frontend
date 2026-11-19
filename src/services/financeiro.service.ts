import type { Pagamento, PagamentoCreate, ResumoFinanceiro, SessaoPendente } from "../types/pagamento";
import api from "./api";

export async function obterResumoFinanceiro() {
    const response = await api.get<ResumoFinanceiro>(
        "/financeiro/resumo"
    );

    return response.data;
}

export async function listarPendencias() {
    const response = await api.get<SessaoPendente[]>(
        "/financeiro/pendentes"
    );

    return response.data;
}

export async function listarHistorico() {
    const response = await api.get<Pagamento[]>(
        "/financeiro/historico"
    );

    return response.data;
}

export async function registrarPagamento(dados: PagamentoCreate) {
    const response = await api.post<Pagamento>(
        "/pagamentos",
        dados
    );

    return response.data;
}