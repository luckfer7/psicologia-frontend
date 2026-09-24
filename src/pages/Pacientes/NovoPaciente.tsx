import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { criarPaciente } from "../../services/pacientes.service";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";

const pacienteSchema = z.object({
    nome: z
        .string()
        .min(2, "Digite o nome do paciente"),

    telefone: z
        .string()
        .optional(),

    email: z
        .string()
        .or(z.literal(""))
        .optional(),

    data_nascimento: z
        .string()
        .optional(),

    observacoes: z
        .string()
        .optional(),
});

type PacienteFormData = z.infer<typeof pacienteSchema>;

export default function NovoPaciente() {
    const navigate = useNavigate();
    const [erro, setErro] = useState("");

    const {
        register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<PacienteFormData>({
        resolver: zodResolver(pacienteSchema),
    });

    async function onSubmit(data: PacienteFormData) {
        setErro("");

        try {
            await criarPaciente(data);
            navigate("/pacientes");
        } catch (error) {
            console.error("Erro ao cadastrar paciente:", error );
            
            setErro("Não foi possível cadastrar o paciente");
        }
    }

    return (
        <div>
            {/* Cabeçalho */}
            <div className="mb-6" >
                <button type="button" onClick={() => navigate("/pacientes")} className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900" >
                    <FiArrowLeft size={18} />
                    Voltar para pacientes
                </button>
                <h1 className="text-2xl font-bold text-gray-900" >
                    Novo paciente
                </h1>
                <p className="mt-1 text-gray-500" >
                    Cadastre um novo paciente na sua clínica
                </p>
            </div>

            {/* Erro */}
            {erro && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700" >
                    {erro}
                </div>
            )}

            {/* Formulário */}
            <div className="rounded-xl bg-white p-6 shadow-sm" >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
                    {/* Nome */}
                    <div>
                        <label htmlFor="nome" className="mb-1 block text-sm font-medium text-gray-700" >
                            Nome *
                        </label>
                        <input id="nome" type="text" placeholder="Nome completo" {...register("nome")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                            {errors.nome && (
                                <p className="mt-1 text-sm text-red-500" >
                                    {errors.nome.message}
                                </p>
                            )}
                    </div>

                    {/* Email e telefone */}
                    <div className="grid gap-6 md:grid-cols-2" >
                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700" >
                                Email
                            </label>
                            <input id="email" type="text" placeholder="paciente@email.com" {...register("email")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500" > 
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="telefone" className="mb-1 block text-sm font-medium text-gray-700" >
                                Telefone
                            </label>
                            <input id="telefone" type="text" placeholder="(21)99999-9999" {...register("telefone")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                            {errors.telefone && (
                                <p className="mt-1 text-sm text-red-500" >
                                    {errors.telefone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Data de nascimento */}
                    <div>
                        <label htmlFor="data_nascimento" className="mb-1 block text-sm font-medium text-gray-700" >
                            Data de nascimento
                        </label>
                        <input id="data_nascimento" type="text" {...register("data_nascimento")} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                        {errors.data_nascimento && (
                            <p className="mt-1 text-sm text-red-500" >
                                {errors.data_nascimento.message}
                            </p>
                        )}
                    </div>

                    {/* Observacoes */}
                    <div>
                        <label htmlFor="observacoes" className="mb-1 block text-sm font-medium text-gray-700">
                            Observações
                        </label>
                        <textarea id="observacoes" rows={5} placeholder="Observações sobre o paciente..." {...register("observacoes")} className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focs:ring-blue-500" />
                        {errors.observacoes && (
                            <p className="mt-1 text-sm text-red-500" >
                                {errors.observacoes.message}
                            </p>
                        )}
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end gap-3 border-t pt-6" >
                        <button type="button" onClick={() => navigate("/pacientes")} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50" >
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" >
                            <FiSave size={18} />
                            {isSubmitting ? "Salvando..." : "Salvar pacientes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}