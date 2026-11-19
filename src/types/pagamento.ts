export interface Pagamento {
    id: number;
    sessao_id: number;
    valor: number;
    forma_pagamento: string;
    data_pagamento: string;
    observacao?: string | null;
}

export interface SessaoPendente {
    sessao_id: number;
    paciente_id: number;
    paciente_nome: string;
    data_horario: string;
    valor_cobrado: number;
    total_pago: number;
    saldo_pendente: number;
    status_financeiro: "pendente" | "parcial";
}

export interface ResumoFinanceiro {
    recebido_mes: number;
    total_pendente: number;
    quantidade_pendentes: number;

}

export interface PagamentoCreate {
    sessao_id: number;
    valor: number;
    forma_pagamento: string;
    observacao?: string;
}