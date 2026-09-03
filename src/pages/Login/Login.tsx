import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
    email: z
        .email("digite um email válido"),

    senha: z
    .string()
    .min(1, "Digite sua senha."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const { token, login, loading } = useAuth();

    const { register, handleSubmit, formState: { errors },} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        //aqui está o reacthookform. ele controla o formulário
    });

    async function onSubmit(data: LoginFormData) {
        try {
            await login({
                email: data.email,
                senha: data.senha,
            });

            console.log(token, "Login realizado com sucesso!");
            
        } catch (error) {
            console.error("erro ao fazer login:", error);
        }
    }

    return (
        <div className="min-w-screen bg-gray-100 flex items-center justify-center px-4" >
            <div className=" w-full max-w-md " >
                <div className=" bg-white rounded-2xl shadow-lg p-8 " >
                    <div className=" text-center mb-8 " >
                        <h1 className="text-3xl font-bold text-gray-900" >Gestão para psicólogos</h1>
                        <p className=" text-gray-500 mt-2 " >Entre na sua conta</p>
                    </div>
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5" 
                    >
                        {/* {EMAIL} */}
                        <div>
                            <label 
                                htmlFor="email"
                                className=" block text-sm font-medium text-gray-700 mb-1 "
                                >
                                    Email
                            </label>
                            <input 
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                {... register("email")} //esse register liga no outro register lá em cima
                                className=" w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-blue-500 focus:border-blue-500 "
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1" >
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* {SENHA} */}
                        <div>
                            <label 
                                htmlFor="senha"
                                className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Senha
                                </label>
                            <input
                                id="senha" 
                                type="text"
                                placeholder="Digite sua senha"
                                {... register("senha")}
                                className=" w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-blue-500 focus:border-blue-500 " 
                            />
                            {errors.senha && (
                                <p className="text-red-500 text-sm mt-1" >
                                    {errors.senha.message}
                                </p>
                            )}
                        </div>

                        {/* {BOTÃO} */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}