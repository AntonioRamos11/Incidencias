import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';



export const Header = () => {
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();
    const [permisos, setPermisos] = useState('');

    useEffect(() => {
        const storedUsuario = localStorage.getItem('usuario');
        const storedPermisos = localStorage.getItem('permisos');
        if (storedUsuario) {
            setUsuario(storedUsuario);
        }
        if (storedPermisos) {
            setPermisos(storedPermisos);
        }
    }, []);

    const handleEditarPermisos = () => {
        if(permisos === '1'){
            navigate('/Editar_Administrador');
        }else if(permisos === '2'){
            navigate('/Editar_jefe_departamento');
        }else{
            alert('Permisos no validos para editar');
        }
    };

    return (
        <div className='div-general'>
            <div className='div-nombre-logo'>
                <span className='tam-letra nito'>Incidencias</span>
            </div>
            <div className='div-inf-actual tam-letra-18px'>
                <div className='div-usuario-header'>
                    <button 
                        className='nito btn-sin-border tam-btn-header header-editar-btn' 
                        onClick={handleEditarPermisos}
                        title="Editar perfil"
                    >
                        ⚙️
                    </button>
                    <span className='nito'>{usuario}</span>
                </div>
            </div>
        </div>
    );
};