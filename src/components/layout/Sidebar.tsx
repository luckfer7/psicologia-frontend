import {
    FaHome, FaUserFriends, FaCalendarAlt, FaMoneyBillWave, FaCog
} from "react-icons/fa";

const SideBar = () => {
    return (
        <aside className="w-72 bg-slate-900 text-white min-h-screen" >
            <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-slate-700" >
                Psicologia
            </div>

            <nav className="mt-6" >
                <ul className="space-y-2" >
                    <li className="px-6 py-3 hover:bg-slate-800 cursor-pointer flex items-center gap-3" >
                        <FaHome />
                        Dashboard
                    </li>
                    <li className="px-6 py-3 hover:bg-slate-800 cursor-pointer flex items-center gap-3" >
                        <FaUserFriends />
                        Pacientes
                    </li>
                    <li className="px-6 py-3 hover:bg-slate-800 cursor-pointer flex items-center gap-3 " >
                        <FaCalendarAlt />
                        Agenda
                    </li>
                    <li className="px-6 py-3 hover:bg-slate-800 cursor-pointer flex items-center gap-3" >
                        <FaMoneyBillWave />
                        Financeiro
                    </li>
                    <li className="px-6 py-3 hover:bg-slate-800 cursor-pointer flex items-center gap-3" >
                        <FaCog />
                        Configurações
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar;