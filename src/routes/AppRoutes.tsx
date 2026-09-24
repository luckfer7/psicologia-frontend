import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import MainLayout from '../components/layout/MainLayout';
import Pacientes from '../pages/Pacientes/Pacientes';
import NovoPaciente from '../pages/Pacientes/NovoPaciente';



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* aqui dentro do routes ficam todas as paginas */}
                
                <Route path='/login' element={<Login />} />

                <Route element={<PrivateRoute />} >
                    <Route element={<MainLayout />} >
                        <Route 
                            path="/dashboard"
                            element={<Dashboard />} 
                        />
                        <Route 
                            path="/pacientes"
                            element={<Pacientes />} 
                        />
                        <Route 
                            path="/pacientes/novo"
                            element={<NovoPaciente />}
                        />
                    </Route>
                </Route>
                <Route path='*' element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

