import '../Departamentos/Departamento_Alta_Baja_Cambio.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Espacios = () => {
    const [radioCheck, setRadioCheck] = useState('Agregar');
    const [nombre, setNombre] = useState('');
    const [tipoEspacio, setTipoEspacio] = useState('');
    const [edificio, setEdificio] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [departamentoPertenece, setDepartamentoPertenece] = useState('');

    const [edificios, setEdificios] = useState([]);
    const [tiposEspacios, setTiposEspacios] = useState([]);
    const [nombresEspacio, setNombresEspacio] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
                const departamentoResponse = await axios.get(`http://localhost:3000/SelectDepartamento`, {
                    params: { id_pertenece: idDepartamentoPertenece },
                });
                setDepartamentoPertenece(departamentoResponse.data.result);

                const [edificiosResponse, tiposEspaciosResponse] = await Promise.all([
                    axios.get(`http://localhost:3000/SelectEdificios`),
                    axios.get(`http://localhost:3000/SelectTipoEspacios`),
                ]);
                setEdificios(edificiosResponse.data.edificios || []);
                setTiposEspacios(tiposEspaciosResponse.data.tipoEspacios || []);
                selectUsuarios();
    
                if (radioCheck === 'Actualizar' || radioCheck === 'Eliminar') {
                    //Filtro para traer edificios por departamento
                    const filteredEdificiosResponse = await axios.get(`http://localhost:3000/SelectEdificiosPorDepartamento`, {
                        params: { id_departamento: idDepartamentoPertenece },
                    });
                    setEdificios(filteredEdificiosResponse.data.edificios || []);
                    
                    //Filtro para traer tipos de espacios por edificio y departamento
                    const filteredEspaciosResponse = await axios.get(`http://localhost:3000/SelectEspaciosPorEdificio`, {
                        params: { id_edificio: edificio, id_departamento: idDepartamentoPertenece},
                    });
                    setTiposEspacios(filteredEspaciosResponse.data.tiposEspacios || []);

                    //Filtro para traer nombres por tipo de espacio, edificio y departamento
                    const filteredNombreResponse = await axios.get(`http://localhost:3000/SelectNombrePorEspacios`, {
                        params: {id_tipoEspacio: tipoEspacio, id_edificio: edificio, id_departamento: idDepartamentoPertenece},
                    });
                    setNombresEspacio(filteredNombreResponse.data.nombresEspacio || []);
                    
                    //Filtrado para traer los demas campos del espacio
                    const filteredCapacidadResponse = await axios.get(`http://localhost:3000/SelectCapacidadNombre`, {
                        params: {id_espacio: nombre},
                    });
                    const { capacidad, ubicacion, nombreEspacio, responsable} = filteredCapacidadResponse.data;
                    localStorage.setItem('nombreEspacio', nombreEspacio);
                    localStorage.setItem('id_espacio', nombre);
                    setCapacidad(capacidad);
                    setUbicacion(ubicacion);
                    //const usuarioSeleccionado = usuarios.find(usuario => usuario.id_usuario === responsable);
                    if(responsable !== null){
                        setUsuario(responsable);
                    }else{
                        setUsuario('Selecciona un responsable')
                    }
                    
                }
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
    
        fetchData();
    }, [radioCheck, edificio, nombre, tipoEspacio]);

    const handleListo = async (e) => {
        e.preventDefault();
        if (radioCheck === 'Agregar') {
            await handleAgregar();
        } else if (radioCheck === 'Actualizar') {
            await handleActualizar();
        } else if (radioCheck === 'Eliminar') {
            await handleEliminar();
        }
    };

    const selectUsuarios = async () => {
        try {
            const idDepartamento = localStorage.getItem('idDepartamentoPertenece');
            const response = await axios.get(`http://localhost:3000/SelectUsuarioDep/${idDepartamento}`);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener los usuarios', error);
        }
    };

    const handleEliminar = async (e) => {
        if(e) e.preventDefault();
        const id_espacio = localStorage.getItem('id_espacio');
        if (!nombre || !tipoEspacio || !edificio || !capacidad) {
            alert("Por favor, completa todos los campos");
            return;
        }
        try{
            const response = await axios.put('http://localhost:3000/EliminaEspacio', {
                id_espacio
            });
            alert('Espacio eliminado exitosamente');
            limpiar();
        }catch(error){
            console.error(error.message);
        }
    }

    const handleActualizar = async (e) => {
        if(e) e.preventDefault();
        const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
        const id_espacio = localStorage.getItem('id_espacio');
        const nombreEspacio = localStorage.getItem('nombreEspacio');
        if (!nombre || !tipoEspacio || !edificio || !capacidad || !usuario) {
            alert("Por favor, completa todos los campos");
            return;
        }
        try{
            const response = await axios.put('http://localhost:3000/ActualizaEspacio', {
                tipoEspacio,
                edificio,
                idDepartamentoPertenece,
                ubicacion,
                capacidad,
                nombreEspacio,
                id_espacio, 
                usuario
            });
            alert('Espacio actualizado exitosamente');
            limpiar();
        }catch(error){
            alert('Hubo un problema al actualizar el espacio');
            console.error(error.message);
        }
    }

    const handleAgregar = async (e) => {
        if (e) e.preventDefault();
        const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
        if (!nombre || !tipoEspacio || !edificio || !capacidad || !usuario) {
            alert("Por favor, completa todos los campos");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/AltaEspacios', {
                tipoEspacio,
                edificio,
                idDepartamentoPertenece,
                ubicacion,
                capacidad,
                nombre, 
                usuario

            });
            alert('Espacio agregado exitosamente');
            limpiar();
        } catch (error) {
            alert("Hubo un problema al agregar el espacio");
            console.error(error.message);
        }
    };    

    const handleRadioChange = (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        limpiar();
        console.log(valueCheck);
    };

    const limpiar = () => {
        setNombre('');
        setTipoEspacio('');
        setEdificio('');
        setUbicacion('');
        setCapacidad('');
        setUsuario('Seleccione un responsable')
    }

    return (
        <>
            <div className="background-half"></div>
            <form className="form-container">
                <div className="form-wrapper">
                    <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Espacios</span>

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
                            <label className="form-check-label" htmlFor="idRadioEliminar">Eliminar</label>
                        </div>
                    </div>

                    {/* QUE EL INPUT ESTE PREDETERMINADO SEGUN EL USUARIO QUE ESTA LOGEADO */}
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Departamento</label>
                        <input type="text" className="form-control" id="inputText" value={departamentoPertenece} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Edificio</label>
                        <select className="form-select" value={edificio} onChange={(e) => setEdificio(e.target.value)}>
                            <option value="">Selecciona un Edificio</option>
                            {Array.isArray(edificios) && edificios.length > 0 ? (
                                edificios.map((edificio) => (
                                    <option key={edificio.id_edificio} value={edificio.id_edificio}>{edificio.nombre}</option>
                                ))
                            ) : (
                                <option value="">No hay edificios disponibles</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Tipo de espacio</label>
                        <select className="form-select" value={tipoEspacio} onChange={(e) => setTipoEspacio(e.target.value)}>
                            <option value="">Selecciona un espacio</option>
                            {Array.isArray(tiposEspacios) && tiposEspacios.length > 0 ? (
                                tiposEspacios.map((tipoEspacio) => (
                                    <option key={tipoEspacio.id_tipoEspacio} value={tipoEspacio.id_tipoEspacio}>{tipoEspacio.nombre}</option>
                                ))
                            ) : (
                                <option value="">No hay tipo de espacios disponibles</option>
                            )}
                        </select>
                    </div>
                    {radioCheck === 'Agregar' ? (
                        <div className="mb-3">
                            <label htmlFor="inputNombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="inputNombre" placeholder="Ingresa el nombre aquí" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                    ) : (
                        <div className="mb-3">
                            <label htmlFor="selectNombre" className="form-label">Nombre</label>
                            <select className="form-select" id="selectNombre" value={nombre} onChange={(e) => setNombre(e.target.value)}>
                                <option value="">Selecciona un nombre</option>
                                {Array.isArray(nombresEspacio) && nombresEspacio.length > 0 ? (
                                    nombresEspacio.map((noombre) => (
                                        <option key={noombre.id_espacio} value={noombre.id_espacio}>{noombre.nombre}</option>
                                    ))
                                ) : (
                                    <option value="">No hay nombres disponibles</option>
                                )}
                            </select>
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Responsable del espacio</label>
                        <select className="form-select" value={usuario} onChange={(e) => setUsuario(e.target.value)}>
                            <option value="">Selecciona un responsable</option>
                            {Array.isArray(usuarios) && usuarios.length > 0 ? (
                                usuarios.map((usu) => (
                                    <option key={usu.id_usuario} value={usu.id_usuario}>{usu.Nombre}</option>
                                ))
                            ) : (
                                <option value="">No hay tipo de espacios disponibles</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputCapacidad" className="form-label">Capacidad</label>
                        <input type="number" className="form-control" id="inputCapacidad" placeholder="Ingresa la capacidad en número aquí" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputUbicacion" className="form-label">Ubicación</label>
                        <input type="text" className="form-control" id="inputUbicacion" placeholder="Ingresa la ubicación aquí" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <button onClick={handleListo} className='color-boton-azul submit-btn color-blanco'>
                            Listo
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};