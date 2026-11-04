import { useNavigate } from "react-router-dom";
import type { Paciente } from "../../types/paciente";
import type { Sessao } from "../../types/sessao";
import { useEffect, useMemo, useState } from "react";
import { listarPacientes } from "../../services/pacientes.service";
import { FiCalendar, FiClock, FiExternalLink, FiUser, FiX } from "react-icons/fi";
import FullCalendar, { type EventClickInfo, } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import ptBrLocale from "@fullcalendar/react/locales/pt-br";

interface SessaoSelecionada {
    paciente: Paciente;
    sessao: Sessao;
}

const coresStatus: Record<string, string> = {
    agendada: "#6366f1",
    realizada: "#16a34a",
    cancelada: "ef4444",
    faltou: "#f59e0b",
};

const nomesStatus: Record<string, string> = {
    agendada: "Agendada",
    realizada: "Realizada",
    cancelada: "Cancelada",
    faltou: "Paciente faltou",
};

function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(data));
}

function formatarHorario(data: string | Date) {
    return new Intl.DateTimeFormat("pt-BR",{
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(data));
}

export default function Agenda() {
    const navigate = useNavigate();

    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [sessaoSelecionada, setSessaoSelecionada] = useState<SessaoSelecionada | null>(null);

    useEffect(() => {
        async function carregarAgenda() {
            try {
                setLoading(true);
                setErro("");

                const dados = await listarPacientes();
                setPacientes(dados);
            } catch (error) {
                console.error("Erro ao carregar agenda:", error);
                setErro("Não foi possível carregar as sessões da agenda.");
            } finally {
                setLoading(false)
            }
        }

        carregarAgenda();
    }, []);

    const eventos = useMemo(() => {
        return pacientes.flatMap((paciente) => {
            return (paciente.sessoes ?? []).map((sessao) => {
                const inicio = new Date(sessao.data_horario);
                const fim = new Date(inicio.getTime() + 50 * 60 * 1000);

                return {
                    id: String(sessao.id),
                    title: paciente.nome,
                    start: inicio,
                    end: fim,
                    backgroundColor: coresStatus[sessao.status] ?? "#64748b",
                    borderColor: coresStatus[sessao.status] ?? "#64748b",
                    extendedProps: {
                        paciente,
                        sessao,
                    },
                };
            });
        });

    }, [pacientes]);

    function handleCliqueSessao(info: EventClickInfo) {
        const paciente = info.event.extendedProps.paciente as Paciente;
        const sessao = info.event.extendedProps.sessao as Sessao;

        setSessaoSelecionada({ paciente, sessao });
    }

    if (loading) {
        return (
            <div className="flex min-h-96 items-center justify-center" >
                <p className="text-sm text-gray-500" >Carregando agenda...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5" >
                <p className="text-sm text-red-700" >{erro}</p>
                <button type="button" onClick={() => window.location.reload()} className="mt-3 text-sm font-semibold text-red-700 hover:underline" >Tentar novamente</button>
            </div>
        );
    }

    return (
        <div className="space-y-6" >
            <div>
                <div className="flex items-center gap-2" >
                    <FiCalendar className="text-indigo-600" size={24} />
                    <h1 className="text-2xl font-bold text-gray-900" >Agenda</h1>
                </div>
                <p className="mt-1 text-sm text-gray-500" >Visualize e organize os atendimentos dos pacientes</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-gray-200 bg-white px-4 py-3" >
                {Object.entries(nomesStatus).map(([status, nome]) => (
                    <div key={status} className="flex items-center gap-2" >
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: coresStatus[status] }} />
                        <span className="text-xs text-gray-600" >{nome}</span>
                    </div>
                ))}
                
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-5" >
                <div className="agenda-calendar" >
                    <FullCalendar  
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        initialView="timeGridWeek"
                        locale={ptBrLocale}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridDay,timeGridWeek,dayGridMonth",
                        }}
                        buttons={{
                            today: { text: "Hoje", },
                            timeGridDay: { text: "Dia", },
                            timeGridWeek: { text: "Semana", },
                            dayGridMonth: { text: "Mês", } ,
                        }}
                        events={eventos}
                        eventClick={handleCliqueSessao}
                        nowIndicator={true}
                        allDaySlot={false}
                        slotMinTime="07:00:00"
                        slotMaxTime="22:00:00"
                        slotDuration="00:30:00"
                        height="auto"
                        expandRows={true}
                        weekends={true}
                        dayMaxEvents={true}
                        eventDisplay="block"
                        eventTimeFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        }}
                        noEventsContent="Nenhuma sessão neste período."
                    />
                </div>
            </div>
            {sessaoSelecionada && (
                <div className="fixed inset-0 z-50 bg-black/40" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                        setSessaoSelecionada(null);
                    }
                }} >
                    <aside 
                        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-detalhes-sessao"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-5" >
                            <h2 id="titulo-detalhes-sessao" className="text-lg font-semibold text-gray-900" >Detalhes da sessão</h2>
                            <button type="button" onClick={() => setSessaoSelecionada(null)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Fechar detalhes" >
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-6 p-5" >
                            <div>
                                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor:
                                    coresStatus[sessaoSelecionada.sessao.status] ?? "#64748b",
                                 }} >
                                    {nomesStatus[sessaoSelecionada.sessao.status] ?? sessaoSelecionada.sessao.status}
                                </span>
                                <h3 className="mt-4 text-2xl font-bold text-gray-900" >
                                    {sessaoSelecionada.paciente.nome}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500" >
                                    Atendimento psicológico
                                </p>  
                            </div>
                            <div className="space-y-4 rounded-xl bg-gray-50 p-4" >
                                <div className="flex items-start gap-3" >
                                    <FiCalendar className="mt-0.5 text-indigo-600" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-500" >Data</p>
                                        <p className="text-sm font-medium text-gray-800" >
                                            {formatarData(sessaoSelecionada.sessao.data_horario

                                            )}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3" >
                                    <FiClock className="mt-0.5 text-indigo-600" size={18} />
                                    <div>
                                        <p className="text-xs text-gray-500" >Horário</p>
                                        <p>{formatarHorario(
                                            sessaoSelecionada.sessao.data_horario
                                        )}
                                        {" - "}
                                        {formatarHorario(
                                            new Date(
                                                new Date(
                                                    sessaoSelecionada.sessao.data_horario
                                                ).getTime() + 50 * 60 * 1000
                                            )
                                        )}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500" >
                                            Duração visual: 50 minutos
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3" >
                                    <FiUser className="mt-0.5 text-indigo-600" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500" >
                                            Paciente
                                        </p>
                                        <p className="text-sm font-medium text-gray-800" >
                                            {sessaoSelecionada.paciente.nome}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3" >
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50" type="button" onClick={() => navigate(
                                    `/pacientes/${sessaoSelecionada.paciente.id}`
                                )} >
                                        <FiUser size={17} />
                                        Ver cadastro do paciente
                                        <FiExternalLink size={14} />
                                </button>
                                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700" type="button" onClick={() => navigate(`/pacientes/${sessaoSelecionada.paciente.id}/sessoes/${sessaoSelecionada.sessao.id}`)} >
                                    <FiCalendar size={17} />
                                    Abrir detalhes da sessão
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
            )}
        </div>
    )
}