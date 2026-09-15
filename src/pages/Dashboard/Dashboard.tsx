import { useEffect, useState } from "react";
import type { Paciente, Sessao } from "../../types/paciente";
import { listarPacientes } from "../../services/pacientes.service";
import { FiCalendar, FiClock, FiUsers } from "react-icons/fi";

export default function Dashboard() {

    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarDashboard() {
            try {
                const dados = await listarPacientes();

                setPacientes(dados);
            } catch (error) {
                console.error(
                    "erro ao carregar dashboard:", error
                );
                setErro(
                    "Não foi possível carregar os dados."
                );
            } finally {
                setLoading(false)
            }
        }

        carregarDashboard();
    }, []);

    const totalPaciente = pacientes.length;
    const sessoes = pacientes.flatMap(
        (paciente) => paciente.sessoes || []
    );

    const hoje = new Date();

    const sessoesHoje = sessoes.filter((sessao) => {
        const dataSessao = new Date(
            sessao.data_horario
        );

        return (
            dataSessao.getFullYear() === hoje.getFullYear() &&
            dataSessao.getMonth() === hoje.getMonth() &&
            dataSessao.getDate() === hoje.getDate()
        );
    });

    const agora = new Date();
    const proximasSessoes = sessoes.filter((sessao) => {
        const dataSessao = new Date(
            sessao.data_horario
        );

        return dataSessao > agora;
    })
    .sort((a, b) => {
        return (
            new Date(a.data_horario).getTime() - new Date(b.data_horario).getTime()
        );
    })
    .slice(0, 5);

    function encontrarPaciente( sessao: Sessao ) {
        return pacientes.find(
            (paciente) =>
                paciente.id === sessao.paciente_id
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-10" >
                <p className="text-gray-500" >
                    Carregando dashboard...
                </p>
            </div>
        )
    }

    if (erro) {
        return (
            <div className="rounded-lg bg-red-50 p-6 text-red-700" >
                {erro}
            </div>
        )
    }

    return (
        <div>
            {/* cabeçalho */}
            <div className="mb-8" >
                <h1 className="text-2xl font-bold text-gray-900" >
                    Dashboard
                </h1>
                <p className="mt-1 text-gray-500" >
                    Visão geral da sua clínica
                </p>
            </div>

            {/* cards */}

            <div className="grid gap-6 md:grid-cols-3" >
                {/* pacientes */}

                <div className="rounded-xl bg-white p-6 shadow-sm" >
                    <div className="flex items-center justify-between" >
                        <div className="" >
                            <p className="text-sm text-gray-500" >
                                Pacientes
                            </p>
                            <p className="mt-2 text-3xl font-bold text-gray-900" >
                                {totalPaciente}
                            </p>
                        </div>
                        <div className="rounded-lg bg-blue-100 p-3" >
                            <FiUsers size={24} className="text-blue-600" />
                        </div>

                    </div>

                </div>

                {/* Sessões hoje */}
                <div className="rounded-xl bg-white p-6 shadow-sm" >
                    <div className=" flex items-center justify-between " >
                        <div>
                            <p className="text-sm text-gray-500" >
                                Sessões hoje
                            </p>
                            <p className=" mt-2 text-3xl font-bold text-gray-900 " >
                                {sessoesHoje.length}
                            </p>
                        </div>
                        <div className="rounded-lg bg-green-100 p-3" >
                            <FiCalendar size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                {/* próximas consultas */}
                <div className="rounded-xl bg-white p-6 shadow-sm" >
                    <div className="flex items-center justify-between" >
                        <div>
                            <p className="text-sm text-gray-500" >
                                Próximas consultas
                            </p>
                            <p className="mt-2 text-3xl font-bold text-gray-900" >
                                {proximasSessoes.length}
                            </p>
                        </div>
                        <div className="rounded-lg bg-purple-100 p-3" >
                            <FiClock size={24} className="text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Próximas consultas */}

            <div className="mt-8 rounded-xl bg-white shadow-sm" >
                <div className="border-b px-6 py-4" > 
                    <h2 className="text-lg font-semibold text-gray-900" >
                        Próximas consultas
                    </h2>
                </div>
            </div>

            {proximasSessoes.length === 0 ? (
                <div className="p-6 text-center text-gray-500" >
                    Nenhuma consulta agendada.
                </div>
            ) : (
                <div className="divide-y" >
                    {proximasSessoes.map((sessao) => {
                            const paciente = encontrarPaciente(sessao);
                            const data = new Date(sessao.data_horario);

                            return (
                                <div key={sessao.id} className="flex items-center justify-between px-6 py-4" >
                                    <div>
                                        <p className="font-medium text-gray-900" >
                                            {paciente?.nome ?? "Paciente"}
                                        </p>
                                        <p className="text-sm text-gray-500" >
                                            {data.toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>

                                    <div className="text-right" >
                                        <p>
                                            {data.toLocaleTimeString("pt-BR",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500" >
                                            {sessao.status}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
}