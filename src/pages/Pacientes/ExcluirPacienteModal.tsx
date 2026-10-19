import React, { useState } from "react";
import type { Paciente } from "../../types/paciente";
import { deletarPaciente } from "../../services/pacientes.service";
import { FiTrash2, FiX } from "react-icons/fi";

interface DeletarPacienteModalProps {
    paciente: Paciente;
    onClose: () => void;
    onDeleted: () => Promise<void>;
}

export default function DeletarPacienteModal({ paciente, onClose, onDeleted }: DeletarPacienteModalProps) {
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErro("");
        setSalvando(true)

        try {
            await deletarPaciente(paciente.id);
            await onDeleted();
        } catch (error) {
            console.error("Erro ao deletar o paciente: ", error);
            setErro("Não foi possível deletar o paciente. Tente novamente");
            
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => {
            if (
                event.target === event.currentTarget && !salvando
            ) {
                onClose();
            }
        }} >

            <div role="dialog" aria-modal="true" aria-labelledby="titulo-exclusao" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" >
                <div className="mb-4 flex items-center gap-3" >
                    <div className="rounded-full bg-red-100 p-3 text-red-600" >
                        <FiTrash2 size={22} />
                    </div>
                    <h2 id="titulo-exclusao" className="text-xl font-semibold text-gray-900" >
                        Excluir paciente
                    </h2>
                </div>
                <p className="mb-5 text-sm text-gray-600" >
                    Tem certeza de que deseja excluir{" "}
                    <strong>{paciente.nome}</strong>?
                    Essa ação pode ser irreversível.
                </p>
                {erro && (
                    <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" >
                        {erro}
                    </p>
                )}
                <form onSubmit={handleSubmit} action="">
                    <div className="flex justify-end gap-3" >
                        <button type="button" onClick={onClose} disabled={salvando} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60" >
                            <FiX size={16} />
                            Cancelar
                        </button>
                        <button type="submit" disabled={salvando} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60" >
                            <FiTrash2 size={16} />
                            {salvando ? "Excluindo..." : "Excluir paciente"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}