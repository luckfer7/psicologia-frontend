import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

export default function NavBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate("/login");
    }

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6" >
            <div>
                <h2 className="text-lg font-semibold text-gray-800" >
                    Gestão para Psicólogos
                </h2>
            </div>

            <button 
                onClick={handleLogout}
                className=" flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 transition "
            >
                <FiLogOut size={18} />
                <span>
                    Sair
                </span>
            </button>
        </header>
    )
}