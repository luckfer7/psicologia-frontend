import { FiCalendar, FiDollarSign, FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
    const location = useLocation();

    const links = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: FiHome,
        },
        {
            name: "Pacientes",
            path: "/pacientes",
            icon: FiUsers,
        },
        {
            name: "Agenda",
            path: "/agenda",
            icon: FiCalendar,
        },
        {
            name: "Financeiro",
            path: "/financeiro",
            icon: FiDollarSign,
        },
        {
            name: "Configurações",
            path: "/configuracoes",
            icon: FiSettings
        },
    ];

    return (
        <aside className=" fixed left-0 top-0 z-40 hidden h-screen w-64 bg-white border-r md:block " >
            <div className="flex h-16 items-center border-b px-6" >
                <h1 className="text-xl font-bold text-gray-900" >
                    Psicologia
                </h1>
            </div>

            <nav className="p-4" >
                <ul className="space-y-2" >
                    {links.map((link) => {
                        const Icon = link.icon;

                        const active = location.pathname === link.path;

                        return (
                            <li key={link.path} >
                                <Link to={link.path}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                    active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                                
                                >
                                    <Icon size={20} />
                                    <span>
                                        {link.name}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}