import React, { useCallback, useEffect, useState } from "react";
import type { Pagamento, SessaoPendente, ResumoFinanceiro } from "../../types/pagamento";
import { listarHistorico, listarPendencias, obterResumoFinanceiro, registrarPagamento } from "../../services/financeiro.service";
import { FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

function moeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export default function Financeiro() {
    const [resumo, setResumo] = useState<ResumoFinanceiro | null>(null);
    const [pendencias, setPendencias] = useState<SessaoPendente[]>([]);
    const [historico, setHistorico] = useState<Pagamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [sessaoSelecionada, setSessaoSelecionada] = useState<SessaoPendente | null>(null);

    const [valor, setValor] = useState("");
    const [forma, setForma] = useState("pix");
    const [observacao, setObservacao] = useState("");

    
        const carregarDados = useCallback(async () => {
            try {
                const [r, p, h] = await Promise.all([
                    obterResumoFinanceiro(),
                    listarPendencias(),
                    listarHistorico()
                ]);

                setResumo(r);
                setPendencias(p)
                setHistorico(h);
            } catch(error) {
                console.error("Erro ao carregar financeiro:", error);
            } finally {
                setLoading(false)
            }
        },[]);

        useEffect(() => {
            async function iniciarCarregamento() {
                await carregarDados();
            }

            iniciarCarregamento();
        }, [carregarDados]);

    async function handlePagamento(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!sessaoSelecionada) return;

        try {
            await registrarPagamento({
                sessao_id: sessaoSelecionada.sessao_id,
                valor: Number(valor),
                forma_pagamento: forma,
                observacao
            });

            setSessaoSelecionada(null);
            setValor("");
            setObservacao("");

            await carregarDados();
        } catch (error) {
            console.error("Erro ao registrar pagamento:", error);
            alert("Não foi possível registrar o pagamento");            
        }
    }

    if (loading) {
        return <p className="p-6" >Carregando financeiro...</p>
    }

    return (
        <div className="space-y-6 p-6" >
            <div  >
                <h1 className="text-2xl font-bold text-slate-800" >
                    Financeiro
                </h1>
                <p className="text-sm text-slate-800" >
                    Acompanhe os recebimentos e pagamentos pendentes
                </p>
            </div>

            <div className="grip gap-4 md:grid-cols-3" >
                <div className="rounded-2xl border bg-white p-5 shadow-sm" >
                    <FiDollarSign className="mb-3 text-2xl text-green-600" />
                    <p className="text-sm text-slate-500" >
                        Recebido neste mês
                    </p>
                    <h2 className="mt-2 text-2xl font-bold" >
                        {moeda(resumo?.recebido_mes ?? 0)}
                    </h2>
                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm" >
                    <FiClock className="mb-3 text-2xl text-amber-500" />
                    <p className="text-sm text-slate-500" >
                        Total a receber
                    </p>
                    <h2 className="mt-2 text-2xl font-bold" >
                        {moeda(resumo?.total_pendente ?? 0)}
                    </h2>
                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm" >
                    <FiCheckCircle className="mb-3 text-2xl text-indigo-600" />
                    <p className="text-sm text-slate-500" >
                        Sessões pendentes
                    </p>
                    <h2 className="mt-2 text-2xl font-bold" >
                        {resumo?.quantidade_pendentes ?? 0}
                    </h2>
                </div>
            </div>

            <section className="rounded-2xl border bg-white p-5 shadow-sm" >
                <h2 className="mb-4 text-lg font-semibold" >
                    Sessões pendentes
                </h2>

                {pendencias.length === 0 ? (
                    <p className="text-sm text-slate-500" >
                        Nenhuma sessão pendente.
                    </p>
                ): (
                    <div className="overflow-x-auto" >
                        <table className="w-full text-left text-sm" >
                            <thead className="border-b text-slate-500" >
                                <tr>
                                    <th className="p-3" >Paciente</th>
                                    <th className="p-3" >Data</th>
                                    <th className="p-3" >Valor</th>
                                    <th className="p-3" >Recebido</th>
                                    <th className="p-3" >Pendente</th>
                                    <th className="p-3" >Status</th>
                                    <th className="p-3" >Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendencias.map((item) => (
                                    <tr key={item.sessao_id} className="border-b" >
                                        <td className="p-3 font-medium" >
                                            {item.paciente_nome}
                                        </td>
                                        <td className="p-3" >
                                            {new Date(item.data_horario).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td className="p-3" >
                                            {moeda(item.valor_cobrado)}
                                        </td>
                                        <td className="p-3" >
                                            {moeda(item.total_pago)}
                                        </td>
                                        <td className="p-3" >
                                            {moeda(item.saldo_pendente)}
                                        </td>
                                        <td className="p-3" >
                                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700" >
                                                {item.status_financeiro === "parcial"
                                                    ? "Parcial" : "Pendente"}
                                            </span>
                                        </td>
                                        <td className="p-3" >
                                            <button
                                                onClick={() => {
                                                    setSessaoSelecionada(item);
                                                    setValor(item.saldo_pendente.toFixed(2));
                                                }}
                                                className="rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                                            >
                                                Receber
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="rounded-2xl border bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                    Histórico de pagamentos
                </h2>

                {historico.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        Nenhum pagamento registrado.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {historico.map((pagamento) => (
                            <div
                                key={pagamento.id}
                                className="flex items-center justify-between border-b pb-3"
                            >
                                <div>
                                    <p className="font-medium">
                                        Sessão #{pagamento.sessao_id}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {new Date(pagamento.data_pagamento).toLocaleDateString("pt-BR")}
                                        {" · "}
                                        {pagamento.forma_pagamento}
                                    </p>
                                </div>

                                <strong className="text-green-600">
                                    {moeda(pagamento.valor)}
                                </strong>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {sessaoSelecionada && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="mb-2 text-xl font-bold">
                            Registrar pagamento
                        </h2>

                        <p className="mb-5 text-sm text-slate-500">
                            {sessaoSelecionada.paciente_nome}
                        </p>

                        <form onSubmit={handlePagamento} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Valor do pagamento
                                </label>

                                <input
                                    type="number"
                                    min="0.01"
                                    max={sessaoSelecionada.saldo_pendente}
                                    step="0.01"
                                    required
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    className="w-full rounded-lg border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Forma de pagamento
                                </label>

                                <select
                                    value={forma}
                                    onChange={(e) => setForma(e.target.value)}
                                    className="w-full rounded-lg border p-3"
                                >
                                    <option value="pix">Pix</option>
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="cartao_credito">Cartão de crédito</option>
                                    <option value="cartao_debito">Cartão de débito</option>
                                    <option value="transferencia">Transferência</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Observação
                                </label>

                                <textarea
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
                                    className="w-full rounded-lg border p-3"
                                    rows={3}
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSessaoSelecionada(null)}
                                    className="rounded-lg border px-4 py-2"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                                >
                                    Confirmar pagamento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
        
}