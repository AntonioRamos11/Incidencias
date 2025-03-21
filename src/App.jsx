import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login } from './Componets/Login/Login';
import { Header } from './Componets/Header/Header.jsx';
import { Header_sin_editar } from './Componets/Header/Header_sin_editar.jsx';
import { Footer } from './Componets/Footer/Footer.jsx';
import { Editar_jefe_departamento } from './Componets/Editar/Editar_jefe_departamento.jsx';
import { Editar_Administrador } from './Componets/Editar/Editar_Administrador.jsx';
import { Principal_administrador } from './Componets/Principal/Principal_administrador.jsx';
import { Principal_otro } from './Componets/Principal/Principal_otro.jsx';
import { EquipoBodega } from './Componets/Equipos/Equipo_bodega.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { EquipodeIncidencia } from './Componets/Incidencias/EquipodeIncidencia.jsx';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

export function App() {
    return (
        <Router>
            <Content />
        </Router>
    );
};

function Content() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/Login';

    const permisos = localStorage.getItem('permisos');

    const renderComponent = () => {
        if (location.pathname === '/Principal') {
            if (permisos === '1') {
                return <Principal_administrador />;
            } else if (permisos === '2' || permisos === '3') {
                return <Principal_otro />;
            }
        }
        return null;
    };

    const renderHeader = () => {
        if (location.pathname === '/Principal' || location.pathname === '/Principal_administrador') {
            if (permisos === '1' || permisos === '2') {
                return <Header />;
            } else if (permisos === '3' || permisos === '4' || permisos === '5') {
                return <Header_sin_editar />;
            }
        }
        return null;
    };

    const showFooter = location.pathname === '/Principal' || location.pathname === '/Principal_administrador';

    return (
        <>
            {!hideHeaderFooter && renderHeader()}
            <Routes>
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Principal" element={<Principal_otro />} />
                <Route path="/Principal_administrador" element={<Principal_administrador />} />
                <Route path="/Editar_Administrador" element={<Editar_Administrador />} />
                <Route path="/Editar_jefe_departamento" element={<Editar_jefe_departamento />} />
                <Route path="/EquipoBodega" element={<EquipoBodega />} />
                <Route path="/EquipodeIncidencia" element={<EquipodeIncidencia />} />
            </Routes>
            {showFooter && <Footer />}
        </>
    );
}

export default App;