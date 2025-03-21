import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Editar_Administrador.css';
import { Departamento_Alta_Baja_Cambio } from '../Departamentos/Departamento_Alta_Baja_Cambio.jsx';
import { Usuario_Alta_Baja_Cambio } from '../Usuario/Usuario_Alta_Baja_Cambio.jsx'
import { Edificios } from '../Edificios/Edificios.jsx';
import { Equipos } from '../Equipos/Equipo.jsx'

export const Editar_Administrador = () => {
    const [selectedContent, setSelectedContent] = useState('');
    const navigate = useNavigate();

    const menuItems = [
        { label: 'HOME', 
            action: () => navigate('/Principal')
          },
        { label: 'Departamento', content: <Departamento_Alta_Baja_Cambio /> },
        { label: 'Usuario', content: <Usuario_Alta_Baja_Cambio /> },
        { label: 'Edificio', content: < Edificios /> },
        { label: 'Equipo', content: <Equipos />}
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 editar-sidebar">
                    <ul className="nav flex-column">
                        {menuItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <button
                                    className="editar-nav-link btn"
                                    onClick={() => {
                                        if (item.action) {
                                            item.action();
                                        } else {
                                            setSelectedContent(item.content);
                                        }
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="col-md-9 col-lg-10 editar-content">
                    <div>{selectedContent}</div>
                </main>
            </div>
        </div>
    );
};