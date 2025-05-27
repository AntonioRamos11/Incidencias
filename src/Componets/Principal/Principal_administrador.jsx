import React, { useState } from 'react';
import './Principal_administrador.css';
import { useNavigate } from 'react-router-dom';

export const Principal_administrador = () => {
    const navigate = useNavigate();

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/Principal');
    }

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('idDepartamentoPertenece');
        localStorage.removeItem('permisos');
        navigate('/Login');
    }

    return (
        <div className="principal-admin-container">
            <hr className="hr" /> 
            <div className="principal-admin-buttons">
                <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Menú principal</button>
                <button type="button" className="btn btn-danger principal-admin-btn">Solicitudes</button>
                <button type="button" className="btn btn-primary principal-admin-btn">Reportes</button>
                <button type="button" className="btn btn-info principal-admin-btn" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
        </div>
    );
}