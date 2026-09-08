import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// interface Props {
//     children: React.ReactNode;
// }

export default function PrivateRoute() {
        const { token, loading } = useAuth();

        if(loading) {

            //se o token existir, mostra a pagina
            return <p>Carregando...</p>
        }

        if(!token) {
            return <Navigate to="/login" replace />
        }

        return <Outlet />;
    }