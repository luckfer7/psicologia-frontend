
import NavBar from "./NavBar";
import SideBar from "./Sidebar";
import { Outlet } from "react-router-dom";

// interface MainLayoutProps {
//     children: ReactNode;
// }


export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100" >
            <SideBar />
            <div className="md:ml-64" >
                <NavBar />
                <main className="p-6" >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
