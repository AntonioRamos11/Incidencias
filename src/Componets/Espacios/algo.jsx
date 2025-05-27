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

    useEffect(() => {
        fetchDepartamento();
    }, []); 

    const fetchDepartamento = async () => {
        try {
            const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
            const departamentoResponse = await axios.get(`http://localhost:3000/SelectDepartamento`, {
                params: { id_pertenece: idDepartamentoPertenece },
            });
            setDepartamentoPertenece(departamentoResponse.data.result);
        } catch (error) {
            console.error('Error al obtener departamento:', error);
        }
    };

    const fetchEdificios = async () => {
        try {
            const edificiosResponse = await axios.get(`http://localhost:3000/SelectEdificios`);
            setEdificios(edificiosResponse.data.edificios || []);
        } catch (error) {
            console.error('Error al obtener edificios:', error);
        }
    };

    const fetchTiposEspacios = async () => {
        try {
            const tiposEspaciosResponse = await axios.get(`http://localhost:3000/SelectTipoEspacios`);
            setTiposEspacios(tiposEspaciosResponse.data.tipoEspacios || []);
        } catch (error) {
            console.error('Error al obtener tipos de espacios:', error);
        }
    };

    const fetchEdificiosPorDepartamento = async () => {
        try {
            const filteredEdificiosResponse = await axios.get(`http://localhost:3000/SelectEdificiosPorDepartamento`, {
                params: { id_departamento: localStorage.getItem('idDepartamentoPertenece') },
            });
            setEdificios(filteredEdificiosResponse.data.edificios || []);
        } catch (error) {
            console.error('Error al obtener edificios:', error);
        }
    };

    const fetchTiposEspaciosPorEdificio = async (edificioId) => {
        try {
            const filteredEspaciosResponse = await axios.get(`http://localhost:3000/SelectEspaciosPorEdificio`, {
                params: { id_edificio: edificioId, id_departamento: localStorage.getItem('idDepartamentoPertenece') },
            });
            setTiposEspacios(filteredEspaciosResponse.data.tiposEspacios || []);
        } catch (error) {
            console.error('Error al obtener tipos de espacios:', error);
        }
    };

    const fetchNombresEspacio = async () => {
        try {
            const filteredNombreResponse = await axios.get(`http://localhost:3000/SelectNombrePorEspacios`, {
                params: { id_tipoEspacio: tipoEspacio, id_edificio: edificio, id_departamento: localStorage.getItem('idDepartamentoPertenece') },
            });
            setNombresEspacio(filteredNombreResponse.data.nombresEspacio || []);
        } catch (error) {
            console.error('Error al obtener nombres de espacio:', error);
        }
    };

    const fetchCapacidad = async () => {
        try {
            const filteredCapacidadResponse = await axios.get(`http://localhost:3000/SelectCapacidadNombre`, {
                params: { id_espacio: nombre },
            });
            const { capacidad, ubicacion, nombreEspacio } = filteredCapacidadResponse.data;
            localStorage.setItem('nombreEspacio', nombreEspacio);
            localStorage.setItem('id_espacio', nombre);
            setCapacidad(capacidad);
            setUbicacion(ubicacion);
        } catch (error) {
            console.error('Error al obtener capacidad y ubicación:', error);
        }
    };

    const handleRadioChange = async (event) => {
        const valueCheck = event.target.value;
        setRadioCheck(valueCheck);
        
        if (valueCheck === 'Agregar') {
            await Promise.all([
                fetchEdificios(), // Cargar todos los edificios
                fetchTiposEspacios() // Cargar todos los tipos de espacios
            ]);
        } else if (['Actualizar', 'Eliminar'].includes(valueCheck)) {
            await fetchEdificiosPorDepartamento(); // Cargar edificios por departamento cuando sea necesario
        }

        setNombre('');
        setTipoEspacio('');
        setEdificio('');
        setUbicacion('');
        setCapacidad('');

    };

    const handleEdificioChange = async (e) => {
        const selectedEdificio = e.target.value;
        setEdificio(selectedEdificio);
        await fetchTiposEspaciosPorEdificio(selectedEdificio); // Cargar tipos de espacios para el edificio seleccionado
    };

    const handleTipoEspacioChange = async (e) => {
        const selectedTipo = e.target.value;
        setTipoEspacio(selectedTipo);
        await fetchNombresEspacio(); // Cargar nombres de espacio para el tipo seleccionado
    };

    const handleNombreChange = async (e) => {
        const selectedNombre = e.target.value;
        setNombre(selectedNombre);
        await fetchCapacidad(); // Cargar capacidad y ubicación para el espacio seleccionado
    };

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

    const handleEliminar = async () => {
        const id_espacio = localStorage.getItem('id_espacio');
        if (!nombre || !tipoEspacio || !edificio || !capacidad) {
            alert("Por favor, completa todos los campos");
            return;
        }
        try {
            await axios.delete('http://localhost:3000/EliminaEspacio', {
                params: { id_espacio }
            });
            alert('Espacio eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el espacio:', error.message);
        }
    }

    const handleActualizar = async () => {
        const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
        const id_espacio = localStorage.getItem('id_espacio');
        const nombreEspacio = localStorage.getItem('nombreEspacio');
        if (!nombre || !tipoEspacio || !edificio || !capacidad) {
            alert("Por favor, completa todos los campos");
            return;
        }
        try {
            await axios.put('http://localhost:3000/ActualizaEspacio', {
                tipoEspacio,
                edificio,
                idDepartamentoPertenece,
                ubicacion,
                capacidad,
                nombreEspacio,
                id_espacio
            });
            alert('Espacio actualizado exitosamente');
        } catch (error) {
            alert('Hubo un problema al actualizar el espacio');
            console.error('Error al actualizar el espacio:', error.message);
        }
    }

    const handleAgregar = async (e) => {
        if (e) e.preventDefault();
        const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
        if (!nombre || !tipoEspacio || !edificio || !capacidad) {
            alert("Por favor, completa todos los campos");
            return;
        }
        try {
            await axios.post('http://localhost:3000/AltaEspacios', {
                tipoEspacio,
                edificio,
                idDepartamentoPertenece,
                ubicacion,
                capacidad,
                nombre
            });
            alert('Espacio agregado exitosamente');
        } catch (error) {
            alert("Hubo un problema al agregar el espacio");
            console.error('Error al agregar el espacio:', error.message);
        }
    };

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

                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Departamento</label>
                        <input type="text" className="form-control" id="inputText" value={departamentoPertenece} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputText" className="form-label">Edificio</label>
                        <select className="form-select" value={edificio} onChange={handleEdificioChange}>
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
                        <label htmlFor="tipoEspacio" className="form-label">Tipo de Espacio</label>
                        <select className="form-select" value={tipoEspacio} onChange={handleTipoEspacioChange}>
                            <option value="">Selecciona un Tipo de Espacio</option>
                            {Array.isArray(tiposEspacios) && tiposEspacios.length > 0 ? (
                                tiposEspacios.map((tipo) => (
                                    <option key={tipo.id_tipoEspacio} value={tipo.id_tipoEspacio}>{tipo.nombre}</option>
                                ))
                            ) : (
                                <option value="">No hay tipos de espacio disponibles</option>
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
                            <label htmlFor="inputNombre" className="form-label">Nombre</label>
                            <select className="form-select" value={nombre} onChange={handleNombreChange}>
                                <option value="">Selecciona un nombre</option>
                                {Array.isArray(nombresEspacio) && nombresEspacio.length > 0 ? (
                                    nombresEspacio.map((nombre) => (
                                        <option key={nombre.id_espacio} value={nombre.id_espacio}>{nombre.nombre}</option>
                                    ))
                                ) : (
                                    <option value="">No hay nombres disponibles</option>
                                )}
                            </select>
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                        <input type="text" className="form-control" id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="capacidad" className="form-label">Capacidad</label>
                        <input type="number" className="form-control" id="capacidad" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} />
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