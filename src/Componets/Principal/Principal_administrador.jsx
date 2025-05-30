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

    // Nuevos manejadores para la gestión de problemas
    const handleListaProblemas = (e) => {
        e.preventDefault();
        navigate('/problemas');
    }

    const handleReportarProblema = (e) => {
        e.preventDefault();
        navigate('/reportar-problema');
    }

    const handleAsociarProblemas = (e) => {
        e.preventDefault();
        navigate('/asociar-problemas');
    }

    return (
        <div className="principal-admin-container">
            <hr className="hr" /> 
            <div className="principal-admin-buttons">
                <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Menú principal</button>
                <button type="button" className="btn btn-danger principal-admin-btn">Solicitudes</button>
                <button type="button" className="btn btn-primary principal-admin-btn">Reportes</button>
                
                {/* Nuevos botones para la gestión de problemas */}
                <button type="button" className="btn btn-success principal-admin-btn" onClick={handleReportarProblema}>Reportar Problema</button>
                <button type="button" className="btn btn-warning principal-admin-btn" onClick={handleListaProblemas}>Lista de Problemas</button>
                <button type="button" className="btn btn-secondary principal-admin-btn" onClick={handleAsociarProblemas}>Asociar Problemas</button>
                
                <button type="button" className="btn btn-info principal-admin-btn" onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
        </div>
    );
}