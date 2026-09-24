import { useEffect, useState } from "react";
import type { Paciente } from "../../types/paciente";
import { listarPacientes } from "../../services/pacientes.service";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Pacientes() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [busca, setBusca] = useState(""); //guarda o que o usuario digitou
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function carregarPacientes() {
            try {
                const dados = await listarPacientes();

                setPacientes(dados);
            } catch (error) {
                console.error("Erro ao carregar pacientes:", error);

                setErro("Não foi possível carregar os pacientes.");
                
            } finally {
                setLoading(false);
            }
            
        }

        carregarPacientes();
    }, []);

    const pacientesFiltrados = pacientes.filter((paciente) => {
        const termo = busca.toLocaleLowerCase();

        return(
            paciente.nome.toLowerCase().includes(termo) || 
            paciente.email?.toLowerCase().includes(termo) ||
            paciente.telefone?.toLowerCase().includes(termo)
        );
    });

    return (
        <div>
            {/* cabeçalho */}
            <div className="mb-6 flex items-center justify-between" >
                <div  >
                    <h1 className="text-2xl font-bold text-gray-900" >
                        Pacientes
                    </h1>
                    <p className=" mt-1 text-gray-500 " >
                        Gerencie os pacientes da sua clínica
                    </p>
                </div>
                <button onClick={() => navigate("/pacientes/novo")} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700" >
                    <FiPlus size={18} />
                    Novo paciente
                </button>
            </div>

            {/* Busca */}

            <div className="mb-6 rounded-xl bg-white p-4 shadow-sm" >
                <div className="relative max-w-md" >
                    <FiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar paciente..." className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                </div>
            </div>

            {/* Erro */}

            {erro && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700" >
                    {erro}
                </div>
            )}

            {/* Tabela */}

            <div className="Overflow-hidden rounded-xl bg-white shadow-sm" >
                {loading ? (
                    <div className="p-8 text-center text-gray-500" >
                        Carregando pacientes...
                    </div>
                ): pacientesFiltrados.length === 0 ? (
                    <div className="p-8 text-center" >
                        <p className="text-gray-500" >
                            {busca ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado"}
                        </p>
                        {!busca && (
                            <button onClick={() => navigate("/pacientes/novo")} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" >
                                Cadastrar primeiro paciente
                            </button>
                        )}
                        
                    </div>
                ): (
                    <div className="overflow-x-auto" >
                        <table className="w-full" >
                            <thead className="border-b bg-gray-50" >
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700" >
                                        Nome
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700" >
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700" >
                                        Telefone
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700" >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" >
                                {pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente.id} className="hover:bg-gray-50" >
                                        <td className="px-6 py-4 " >
                                            <Link to={`/pacientes/${paciente.id}`} className="font-medium text-blue-600 hover:text-blue-800 hover:underline" >
                                                {paciente.nome}
                                            </Link> 
                                        </td>
                                        <td className="px-6 py-4 text-gray-600" >
                                            {paciente.email || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600" >
                                            {paciente.telefone || "-"}
                                        </td>
                                        <td className="px-6 py-4" >
                                            {paciente.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}