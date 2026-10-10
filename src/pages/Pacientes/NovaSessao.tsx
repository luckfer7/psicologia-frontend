import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { criarSessao } from "../../services/pacientes.service";
import { FiArrowLeft, FiCalendar, FiClock, FiSave } from "react-icons/fi";

type StatusSessao = "agendada" | "realizada" | "cancelada" | "faltou";

export default function NovaSessao() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [dataHorario, setDataHorario] = useState("");
    const [status, setStatus] = useState<StatusSessao>("agendada");
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErro("");

        if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            setErro("ID do paciente inválido.");
            return;
        }

        if (!dataHorario) {
            setErro("Informe a data e o horário de sessão.");
            return;
        }

        setSalvando(true);

        try {
            await criarSessao({
                paciente_id: Number(id),
                data_horario: `${dataHorario}:00`,
                status,
            });

            navigate(`/pacientes/${id}`);
        } catch (error) {
            console.error("Erro ao criar sessão:", error);
            setErro("Não foi possível cadastrar a sessão. Verifique os dados e tente novamente.");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl p-6" >
            <Link to={id ? `/pacientes/${id}` : "/pacientes"} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600" >
                <FiArrowLeft />
                Voltar ao paciente
            </Link>
            <div className="mb-6" >
                <h1 className="text-2xl font-bold text-gray-900" >
                    Nova Sessão
                </h1>
                <p className="mt-2 text-sm text-gray-500" >
                    Preencha os dados para agendar uma sessão.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm" action="">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="dataHorario">
                        Data e horário
                    </label>
                    <div className="relative" >
                        <FiCalendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="datetime-local" id="dataHorario" value={dataHorario} onChange={(event) => setDataHorario(event.target.value)} required className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <p className="mt-2 text-xs text-gray-500" >
                        Selecione quando a sessão deverá acontecer
                    </p>
                </div>
                <div>
                    <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700" >
                        Status da sessão
                    </label>
                    <div className="relative" >
                        <FiClock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select id="status" value={status} onChange={(event) => setStatus(event.target.value as StatusSessao)} className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" >
                            <option value="agendada">Agendada</option>
                            <option value="realizada">Realizada</option>
                            <option value="cancelada">Cancelada</option>
                            <option value="faltou">Paciente faltou</option>
                        </select>
                    </div>
                </div>
                {erro && (
                    <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700" >
                        {erro}
                    </div>
                )}

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5" >
                    <Link to={id ? `/pacientes/${id}` : "/pacientes"} className="rounded-lg border border-gray-300 px-4 py-2.5 text-smfont-medium text-gray-700 hover:bg-gray-50" >
                        Cancelar
                    </Link>
                    <button type="submit" disabled={salvando} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" >
                        <FiSave />
                        {salvando ? "Salvando..." : "Salver sessão"}
                    </button>
                </div>
            </form>
        </div>
    )
}