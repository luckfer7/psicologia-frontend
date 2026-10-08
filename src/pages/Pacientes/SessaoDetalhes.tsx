import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Sessao } from "../../types/paciente";
import type { Anotacao } from "../../types/anotacao";
import { criarAnotacao, listarSessoes } from "../../services/pacientes.service";
import { FiArrowLeft, FiCalendar, FiClock, FiFileText, FiSave } from "react-icons/fi";

export default function SessaoDetalhes() {
    const { id, sessaoId } = useParams();
    const [sessao, setSessao] = useState<Sessao | null>(null);
    const [anotacoes, setanotacoes] = useState<Anotacao[]>([]);
    const [texto, setTexto] = useState("");
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");
    const [erroAnotacao, setErroAnotacao] = useState("");

    useEffect(() => {
        async function carregarDados() {
            try {
                setLoading(true);
                setErro("");

                const pacienteId = Number(id);
                const sessaoIdNumber = Number(sessaoId);

                const sessoes = await listarSessoes(pacienteId);

                const sessaoEncontrada = sessoes.find((item) => item.id === sessaoIdNumber);

                if(!sessaoEncontrada) {
                    setErro("Sessao não encontrada.");
                    return;
                }

                setSessao(sessaoEncontrada);

                const anotacoesDaSessao = await listarAnotacoes(sessaoIdNumber);
                setanotacoes(anotacoesDaSessao);
            } catch (error) {
                console.error("Erro ao carregar sessão:", error);
                setErro("Não foi possível carregar os dados da sessão");
                
            } finally {
                setLoading(false)
            }
        }

        carregarDados();
    }, [id, sessaoId]);

    async function handleAdicionarAnotacao(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(!texto.trim()) {
            setErroAnotacao("Digite uma anotação antes de salvar.")

            return;
        }

        try {
            setSalvando(true);
            setErroAnotacao("");

            const novaAnotacao = await criarAnotacao({
                texto: texto.trim(),
                sessao_id: Number(sessaoId),
            });

            setanotacoes((anteriores) => [
                ...anteriores,
                novaAnotacao,
            ]);

            setTexto("");
        } catch (error) {
            console.error("Erro ao criar anotação:", error);
            setErroAnotacao("Não foi possível salvar a anotação");
        } finally {
            setSalvando(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center" >
                <p className="text-gray-500" >
                    Carregando sessão...
                </p>
            </div>
        );
    }

    if (erro || !sessao) {
        return (
            <div>
                <Link to={`/pacientes/${id}`} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900" >
                    <FiArrowLeft size={18} />
                    Voltar para o paciente
                </Link>
                <div className="rounded-xl bg-red-50 p-6 text-red-700" >
                    {erro || "Sessao não encontrada."}
                </div>
            </div>
        )
    }

    const data = new Date(sessao.data_horario);
    const dataFormatada = data.toLocaleDateString("pt-BR");
    const horarioFormatado = data.toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    return (
        <div>
            <div className="mb-6" >
                <Link to={`/pacientes/${id}`} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900" >
                    <FiArrowLeft size={18} />
                    Voltar para o paciente
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900" >
                        Detalhes da sessão
                    </h1>
                    <p className="mt-1 text-gray-500" >
                        Registro de sessão e anotações
                    </p>
                </div>
            </div>

            {/* Informações da sessão */}
            <div className="rounded-xl bg-white p-6 shadow-sm" >
                <div className="mb-6 flex items-center gap-3" >
                    <div className="rounded-lg bg-purple-100 p-2 text-purple-600" >
                        <FiCalendar size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900" >
                            Informações da sessão
                        </h2>
                        <p className="text-sm text-gray-500" >
                            Dados do atendimento
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3" >
                    <div>
                        <div className="flex items-center gap-2" >  
                            <FiCalendar size={16} className="text-gray-400" />
                            <p className="text-sm text-gray-500" >
                                Data
                            </p>
                        </div>
                        <p className="mt-1 font-medium text-gray-900"  >
                            {dataFormatada}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2" >
                            <FiClock size={16} className="text-gray-400" />
                            <p className="text-sm text-gray-500" >
                                Horário
                            </p>
                        </div>
                        <p className="mt-1 font-medium text-gray-900" >
                            {horarioFormatado}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500" >
                            Status
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700" >
                            {sessao.status}
                        </span>
                    </div>                    
                </div>
            </div>
            {/* Anotações */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm" >
                <div className="flex items-center gap-3" >
                    <div className="rounded-lg bg-blue-100 p-2 text-blue-600" >
                        <FiFileText size={20} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900" >
                            Anotações da sessão
                        </h2>
                        <p className="text-sm text-gray-500" >
                            Registre Informações importantes sobre o atendimento
                        </p>
                    </div>
                </div>

                {/* formulário */}
                <form action="">
                    <label htmlFor="">

                    </label>
                    <textarea  />
                    {erroAnotacao && (
                        <p className="mt-2 text-sm text-red-500" >
                            {erroAnotacao}
                        </p>
                    )}
                    <div className="mt-3 flex justify-end" >
                        <button>
                            <FiSave size={18} />
                            {salvando ? "Salvando..." : "Salvado anotação"}
                        </button>
                    </div>
                </form>

                {/* Lista de anotações */}
                <div className="mt-8 border-t pt-6" >
                    <h3 className="font-medium text-gray-900" >
                        Histórico de anotações
                    </h3>

                    {anotacoes.length === 0 ? (
                        <div className="mt-4 rounded-lg bg-gray-50 p-6 text-center" >
                            <p className="text-sm text-gray-500" >
                                Nenhuma anotação encontrada nesta sessão.
                            </p>
                        </div>
                    ): (
                        <div className="mt-4 space-y-4">
                            {anotacoes.map(
                                (anotacao) => {
                                    const dataAnotacao =
                                        new Date(
                                            anotacao.data_criacao
                                        );

                                    return (
                                        <div
                                            key={
                                                anotacao.id
                                            }
                                            className="rounded-lg border border-gray-200 p-4"
                                        >
                                            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                                <p className="text-xs text-gray-500">
                                                    {dataAnotacao.toLocaleDateString(
                                                        "pt-BR"
                                                    )}{" "}
                                                    às{" "}
                                                    {dataAnotacao.toLocaleTimeString(
                                                        "pt-BR",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </p>
                                            </div>

                                            <p className="mt-3 whitespace-pre-wrap text-gray-700">
                                                {
                                                    anotacao.texto
                                                }
                                            </p>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}