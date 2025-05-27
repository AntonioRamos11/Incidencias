import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Departamentos/Departamento_Alta_Baja_Cambio.css';

export const Usuario_Alta_Baja_Cambio = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [idUsuario, setIdUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [jefe, setJefe] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [permisos, setPermisos] = useState(['Administrador','Jefe de departamento','jefe de area','tecnico'])
    const [permiso, setPermiso] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [departamentos, setDepartamentos] = useState([])
    const [nombreapellido, setNombreapellido] = useState(' ');
    const [usuSelected, setUsuSelected] = useState({});
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidad, setEspecialidad] = useState('');

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/SelectUsuario');
                setUsuarios(response.data); // Guardar los usuarios en el estado
                const response_ = await axios.get('http://localhost:3000/SelectDepartamentos');
                setDepartamentos(response_.data);
                selectEspecialidades();
                
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };
        obtenerUsuarios();
    }, []); 

    const handleListo = async (e) => {
        e.preventDefault();
        //console.log(jefe)
        //console.log(jefe ? usuarios.find(usu => usu.Nombre === jefe)?.id_usuario : null)
        if (radioCheck === 'Agregar') {
            await handleAgregar(); // Llamar a handleAgregar
        } else if (radioCheck === 'Actualizar') {
            await handleActualizar(); // Llamar a handleActualizar
        } else if (radioCheck === 'Eliminar') {
            await handleBaja(); // Asegúrate de definir handleEliminar si es necesario
        }

        const response = await axios.get('http://localhost:3000/SelectUsuario');
        setUsuarios(response.data); // Guardar los usuarios en el estado
        const response_ = await axios.get('http://localhost:3000/SelectDepartamentos');
        setDepartamentos(response_.data);
    };

    const handleAgregar = async () => {
        try {
            const response = await axios.post('http://localhost:3000/AltaUsuarios', {
                nombre: nombre,
                apellido: apellido,
                departamento: departamentos.find(dep => dep.nombre === departamento).id_departamento,
                jefe : jefe ? usuarios.find(usu => usu.Nombre === jefe)?.id_usuario : null,
                correo: correo,
                telefono: telefono,
                permisos: permisos.findIndex((per) => per === permiso) + 1,
                contrasenia: contrasenia,
                especialidad: especialidad
            });
            // Obtener y mostrar el resultado
            const resultado = response.data;
            console.log(resultado);
            alert('Usuario agregado exitosamente'); // Mensaje de éxito
            limpiar();
        } catch (error) {
            alert("Hubo problemas al agregar el usuario");
            console.log(error.message);
        }
    };

    const handleActualizar = async () => {
        try{
            console.log(usuSelected);
            const dep = departamentos.find(dep => dep.nombre === departamento);
            const jef = usuarios.find(j => j.Nombre === jefe);
            const jefeId = jef ? jef.id_usuario : null;
            console.log(jef)
            const perm = permisos.findIndex((per) => per === permiso)
            console.log(`Permisos ${perm + 1}`);
            const response =  await axios.put('http://localhost:3000/ActualizaUsuarios', {
                id_usuario: usuSelected.id_usuario,
                nombre: nombre,
                apellido: apellido,
                departamento_pertenece: dep.id_departamento,
                jefe: jefeId,
                correo: correo,
                telefono: telefono,
                permisos: perm + 1
            })
            alert('Usuario actualizado');
            limpiar();
        }catch(error){
            alert("Hubo problemas al actualizar el usuario");
            console.log(error.message);
        }
    };

    const handleBaja = async () => {
        try{
            const response =  await axios.put('http://localhost:3000/BajaUsuarios', {
                id_usuario: usuSelected.id_usuario
            })
            alert('Usuario dado de baja');
            limpiar();
        }catch(error){
            alert("Hubo problemas al dar de baja el usuario");
            console.log(error.message);
        }
        
    };

    const handleSelectedCheck = async (e) => {
        e.preventDefault();
        const usuSelect = usuarios.find(usu => usu.Nombre === e.target.value);
        setUsuSelected(usuSelect);

        // Verifica si usuSelect no es undefined
        if (usuSelect) {
            setNombreapellido(usuSelect.Nombre);
            // Establece el nombre y apellido del usuario
            setNombre(usuSelect.nombre || ''); 
            setApellido(usuSelect.apellido || ''); 

            const departamento = departamentos.find(dep => dep.id_departamento === usuSelect.id_departamento_pertenece);
            setDepartamento(departamento ? departamento.nombre : '');

            const jefe = usuarios.find(j => j.id_usuario === usuSelect.id_jefe);
            setJefe(jefe ? jefe.Nombre : ' ');

            setCorreo(usuSelect.correo || ' ');
            setTelefono(usuSelect.telefono || ' ');

            const permiso = permisos[usuSelect.permisos - 1];
            setPermiso(permiso || ' ');
        } else {
            setNombreapellido('Seleccione usuario');
            setNombre(''); 
            setApellido(''); 
            setDepartamento('Seleccione departamento');
            setJefe('No tiene jefe');
            setCorreo('');
            setTelefono('');
            setPermiso('');
            console.error("Usuario no encontrado.");
        }
    };

    const selectEspecialidades = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectEspecialidades');
            setEspecialidades(response.data);
        } catch (error) {
            console.error('Error al obtener las especialidades', error);
        }
    };

    const handleRadioChange = (event) => {
        
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        console.log(valueCheck);
        limpiar();
    };

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };

    const limpiar = () => {
        setNombreapellido('Selecciona el usuario');
        setNombre('');
        setApellido('');
        setDepartamento('Selecciona el departamento');
        setJefe('No tiene jefe');
        setCorreo('');
        setTelefono('');
        setPermiso('Permisos');
        setContrasenia('');
    }

    return (
        <>
            <div className="background-half"></div>
            <form className="form-container">
                <div className="form-wrapper">
                    <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Usuario</span>

                    <div className="depCheck margin-top-20px">
                        {/* Radio buttons */}
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Agregar" onChange={handleRadioChange} checked={radioCheck === 'Agregar'} />
                            <label className="form-check-label" htmlFor="idRadioAgregar">Agregar</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Actualizar" onChange={handleRadioChange} checked={radioCheck === 'Actualizar'} />
                            <label className="form-check-label" htmlFor="idRadioActualizar">Actualizar</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Eliminar" onChange={handleRadioChange} checked={radioCheck === 'Eliminar'} />
                            <label className="form-check-label" htmlFor="idRadioEliminar">Baja</label>
                        </div>
                    </div>

                    {(radioCheck === 'Actualizar' || radioCheck === 'Eliminar') && (
                        <div>
                            <label htmlFor="inputText" className="form-label margin-top-20px">Seleccione el usuario</label>
                            <select className="form-select " aria-label="Select usuario" value={nombreapellido} onChange={handleSelectedCheck}>
                                <option value="">Selecciona el usuario</option>
                                {usuarios.map((user, index) => (
                                    <option key={user.id} value={user.id}>{user.Nombre}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Campos de formulario */}
                    {(radioCheck !== 'Eliminar') && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="inputText" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="inputText" placeholder="Ingresa el nombre aquí" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputApellido" className="form-label">Apellido</label>
                                <input type="text" className="form-control" id="inputApellido" placeholder="Ingresa el apellido aquí" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDepartamento" className="form-label">Departamento al que pertenece</label>
                                <select className="form-select" id="inputDepartamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                                    <option value="">Selecciona el departamento</option>
                                    {departamentos.map((dep, index) => (
                                        <option key={index} value={dep.nombre}>{dep.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputJefe" className="form-label">Jefe</label>
                                <select className="form-select" id="inputJefe" value={jefe} onChange={(e) => setJefe(e.target.value)}>
                                    <option value="">No tiene jefe</option>
                                    {usuarios.map((usu, index) => (
                                        <option key={index} value={usu.Nombre}>{usu.Nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="Ingresa el correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPhone" className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" id="inputPhone" placeholder="Ingresa el número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputJefe" className="form-label">Tipo de usuario</label>
                                <select className="form-select" id="inputJefe" value={permiso} onChange={(e) => setPermiso(e.target.value)}
                                >
                                    {permisos.map((per, index) => (
                                        <option key={index} value={per}>{per}</option>
                                    ))}
                                </select>
                            </div>

                            {(permiso === 'tecnico') && radioCheck === 'Agregar' && (
                                <div className="mb-3">
                                <label htmlFor="inputJefe" className="form-label">Especializacion</label>
                                <select className="form-select" id="inputJefe" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
                                    {especialidades.map((per, index) => (
                                        <option key={index} value={per.id_especializacion}>{per.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            )}
                        </div>
                    )}
                    {(radioCheck === 'Agregar') && (
                    <div className="mb-3 input-container">
                        <label htmlFor="inputContrasenia" className="form-label">Contraseña</label>
                        <input
                            type={mostrarContrasenia ? 'text' : 'password'}
                            className="form-control"
                            id="inputContrasenia"
                            placeholder="Ingresa la contraseña aquí"
                            value={contrasenia}
                            onChange={(e) => setContrasenia(e.target.value)}
                        />
                        <button
                            type="button"
                            className="show-password-button"
                            onClick={toggleMostrarContrasenia}
                        >
                            {mostrarContrasenia ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    )}

                    <div className="button-container">
                        <button onClick={handleListo} className='color-boton-azul submit-btn color-blanco'>
                            Listo
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}