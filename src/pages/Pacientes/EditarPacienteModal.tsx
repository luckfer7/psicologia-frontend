import { useState } from "react";
import type { Paciente } from "../../types/paciente";
import { atualizarPaciente } from "../../services/pacientes.service";
import { FiSave, FiX } from "react-icons/fi";

interface EditarPacienteModalProps {
    paciente: Paciente;
    onClose: () => void;
    onSaved: () => Promise<void>;
}

export default function EditarPacienteModal({ paciente, onClose, onSaved, }: EditarPacienteModalProps) {
    const [nome, setNome] = useState(paciente.nome);
    const [telefone, setTelefone] = useState(paciente.telefone ?? "");
    const [email, setEmail] = useState(paciente.email ?? "");
    const [dataNascimento, setDataNascimento] = useState(paciente.data_nascimento?.slice(0, 10) ?? "");
    const [observacoes, setObservacoes] = useState(paciente.observacoes ?? "");

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErro("");

        if(!nome.trim()) {
            setErro("O nome do paciente é obrigatório");
            return;
        }
        setSalvando(true);

        try {
            await atualizarPaciente(paciente.id, {
                nome: nome.trim(),
                telefone: telefone.trim() || null,
                email: email.trim() || null,
                data_nascimento: dataNascimento || null,
                observacoes: observacoes.trim() || null,
            });

            await onSaved();
        } catch (error) {
            console.error("Erro ao atualizar paciente:", error);
            setErro("Não foi possível atualizar o paciente. Confira os dados e tente novamente");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onMouseDown={(event) => {
            if (event.target === event.currentTarget && !salvando) {
                onClose();
            }
        }}
    >
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="editar-paciente-titulo"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2
                        id="editar-paciente-titulo"
                        className="text-xl font-bold text-gray-900"
                    >
                        Editar paciente
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Atualize as informações do paciente.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    disabled={salvando}
                    aria-label="Fechar modal"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                >
                    <FiX size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label
                        htmlFor="nome"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Nome completo *
                    </label>

                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="telefone"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Telefone
                        </label>

                        <input
                            id="telefone"
                            type="tel"
                            value={telefone}
                            onChange={(event) =>
                                setTelefone(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            E-mail
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="dataNascimento"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Data de nascimento
                    </label>

                    <input
                        id="dataNascimento"
                        type="date"
                        value={dataNascimento}
                        onChange={(event) =>
                            setDataNascimento(event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="observacoes"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Observações
                    </label>

                    <textarea
                        id="observacoes"
                        value={observacoes}
                        onChange={(event) =>
                            setObservacoes(event.target.value)
                        }
                        rows={4}
                        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {erro && (
                    <div
                        role="alert"
                        className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                    >
                        {erro}
                    </div>
                )}

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={salvando}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={salvando}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FiSave />
                        {salvando ? "Salvando..." : "Salvar alterações"}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

// O que esse componente faz?
// - Recebe o paciente selecionado e preenche os campos com seus dados atuais.
// - Mantém o que você digita no estado do React usando useState.
// - Envia as alterações ao backend ao clicar em Salvar alterações.
// - Exibe uma mensagem de erro caso a API recuse a atualização.
// - Chama onSaved() quando a atualização termina, para o componente pai buscar os dados novos.