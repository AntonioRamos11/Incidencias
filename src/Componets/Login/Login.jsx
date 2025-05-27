import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contra, setContra] = useState("");
    const navigate = useNavigate();
    
    const handledformsubmit = (e) => {
        e.preventDefault();
    }

    const handleValidar = (e) => {
        e.preventDefault();
        if (!usuario) {
            alert("Ingresa tu usuario");
            return;
        }
        if (!contra) {
            alert("Ingresa tu Contraseña");
            return;
        }
        handleLogin();
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Login', { usuario: usuario, contra: contra });
            const { esValido, idUsuario, idDepartamentoPertenece} = response.data;
            if (esValido) {
                localStorage.setItem('usuario', usuario);
                localStorage.setItem('idUsuario', idUsuario);
                localStorage.setItem('idDepartamentoPertenece', idDepartamentoPertenece);
                await handlePermisos();
                navigate('/Principal');
            } else {
                alert('Usuario y/o Contraseña incorrectos');
            }
        } catch (error) {
            alert("Algo malo pasó :(");
            console.error("Error en la solicitud de inicio de sesión:", error.response ? error.response.data : error.message);
        }
    }

    const handlePermisos = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Permisos', { usuario: usuario });
            const resultado = response.data.permisos;

            console.log(resultado);

            if (resultado > 0) {
                localStorage.setItem('permisos', resultado);
            } else {
                alert('No se pudo obtener sus permisos');
            }
        } catch (error) {
            alert("Algo malo pasó :( Permisos");
            console.log(error.message);
        }
    }
    
    return (
        <form className='formLogin' onSubmit={handledformsubmit}>
            <div className='Login-div-IS'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Ingresa el usuario aquí"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Usuario</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Ingresa la contraseña aquí"
                        value={contra}
                        onChange={(e) => setContra(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <div className="button-group">
                    <button onClick={handleValidar} className='button-custom'>
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </form>
    );
}