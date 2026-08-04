import Container from "./Container";
import NavBar from "./NavBar";
import SideBar from "./Sidebar";

const MainLayout = () => {
    return (
        <div className="flex" >
            <SideBar />
            <div className="flex flex-col flex-1" >
                <NavBar />
                <Container>
                    "outlet"
                </Container>
            </div>
        </div>
    )
}

export default MainLayout;