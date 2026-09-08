export default function Dashboard() {
    return (
        <div>

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Bem-vindo ao sistema de gestão.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Pacientes
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        0
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Sessões hoje
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        0
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Pendências
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        0
                    </p>
                </div>

            </div>

        </div>
    );
}