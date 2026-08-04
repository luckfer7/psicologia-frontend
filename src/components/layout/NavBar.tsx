import { FaBell } from "react-icons/fa";

const NavBar = () => {
    return (
        <header className="bg-white h-16 shadow px-8 flex items-center justify-between" >
            <h2 className=" font-semibold text-xl " >Gestão de psicólogos

            </h2>
            <div className=" flex items-center gap-6 " >
                <FaBell className="text-gray-500 text-xl cursor-pointer" />
                <div className="flex items-center gap-3" >
                    <div className=" w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center " >
                        L
                    </div>
                </div>

                <p className="font-semibold" >Lucas</p>
                <small className="text-gray-500" >Psicólogo</small>
            </div>
        </header>
    )
}

export default NavBar;