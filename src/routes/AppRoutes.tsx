import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';



const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* aqui dentro do routes ficam todas as paginas */}
                
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
                <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;