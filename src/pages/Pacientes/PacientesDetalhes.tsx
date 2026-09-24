import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FiArrowLeft,
    FiEdit,
    FiCalendar,
    FiPhone,
    FiMail,
    FiUser,
} from "react-icons/fi";

import {
    listarPacientes,
} from "../../services/pacientes.service";

import type { Paciente } from "../../types/paciente";

export default function PacienteDetalhes() {
    const { id } = useParams();

    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarPaciente() {
            try {
                setLoading(true);
                setErro("");

                const pacientes = await listarPacientes();

                const pacienteEncontrado = pacientes.find(
                    (item) => item.id === Number(id)
                );

                if (!pacienteEncontrado) {
                    setErro("Paciente não encontrado.");
                    return;
                }

                setPaciente(pacienteEncontrado);
            } catch (error) {
                console.error(
                    "Erro ao carregar paciente:",
                    error
                );

                setErro(
                    "Não foi possível carregar os dados do paciente."
                );
            } finally {
                setLoading(false);
            }
        }

        carregarPaciente();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-gray-500">
                    Carregando paciente...
                </p>
            </div>
        );
    }

    if (erro || !paciente) {
        return (
            <div>
                <Link
                    to="/pacientes"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    <FiArrowLeft size={18} />
                    Voltar para pacientes
                </Link>

                <div className="rounded-xl bg-red-50 p-6 text-red-700">
                    {erro || "Paciente não encontrado."}
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Cabeçalho */}
            <div className="mb-6">
                <Link
                    to="/pacientes"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    <FiArrowLeft size={18} />
                    Voltar para pacientes
                </Link>

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {paciente.nome}
                            </h1>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                {paciente.status}
                            </span>
                        </div>

                        <p className="mt-1 text-gray-500">
                            Informações e histórico do paciente
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <FiEdit size={18} />
                        Editar
                    </button>
                </div>
            </div>

            {/* Informações */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                            <FiUser size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Informações pessoais
                            </h2>

                            <p className="text-sm text-gray-500">
                                Dados cadastrados do paciente
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Nome
                            </p>

                            <p className="mt-1 font-medium text-gray-900">
                                {paciente.nome}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Data de nascimento
                            </p>

                            <p className="mt-1 font-medium text-gray-900">
                                {paciente.data_nascimento
                                    ? new Date(
                                          paciente.data_nascimento +
                                              "T00:00:00"
                                      ).toLocaleDateString(
                                          "pt-BR"
                                      )
                                    : "Não informado"}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <FiPhone
                                    size={16}
                                    className="text-gray-400"
                                />

                                <p className="text-sm text-gray-500">
                                    Telefone
                                </p>
                            </div>

                            <p className="mt-1 font-medium text-gray-900">
                                {paciente.telefone ||
                                    "Não informado"}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <FiMail
                                    size={16}
                                    className="text-gray-400"
                                />

                                <p className="text-sm text-gray-500">
                                    Email
                                </p>
                            </div>

                            <p className="mt-1 font-medium text-gray-900">
                                {paciente.email ||
                                    "Não informado"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Resumo */}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900">
                        Resumo
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <p className="text-sm text-gray-500">
                                Total de sessões
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {paciente.sessoes?.length || 0}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Status
                            </p>

                            <p className="mt-1 font-medium text-gray-900">
                                {paciente.status}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Observações */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900">
                    Observações
                </h2>

                <p className="mt-3 whitespace-pre-wrap text-gray-600">
                    {paciente.observacoes ||
                        "Nenhuma observação cadastrada."}
                </p>
            </div>

            {/* Sessões */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                            <FiCalendar size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Sessões
                            </h2>

                            <p className="text-sm text-gray-500">
                                Histórico de sessões do paciente
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Nova sessão
                    </button>
                </div>

                {paciente.sessoes &&
                paciente.sessoes.length > 0 ? (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="px-4 py-3 font-medium">
                                        Data
                                    </th>

                                    <th className="px-4 py-3 font-medium">
                                        Horário
                                    </th>

                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 font-medium">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {paciente.sessoes.map(
                                    (sessao) => {
                                        const data = new Date(
                                            sessao.data_horario
                                        );

                                        return (
                                            <tr
                                                key={sessao.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-4 text-gray-900">
                                                    {data.toLocaleDateString(
                                                        "pt-BR"
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-gray-600">
                                                    {data.toLocaleTimeString(
                                                        "pt-BR",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                                        {
                                                            sessao.status
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <button
                                                        type="button"
                                                        className="text-sm font-medium text-blue-600 hover:underline"
                                                    >
                                                        Ver sessão
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="mt-6 rounded-lg bg-gray-50 p-8 text-center">
                        <p className="text-gray-500">
                            Nenhuma sessão cadastrada.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}