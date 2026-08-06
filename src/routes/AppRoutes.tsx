import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = () => {
    return <h1>Login</h1>
}

const Dashboard = () => {
    return <h1>Dashboard</h1>
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* aqui dentro do routes ficam todas as paginas */}
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;