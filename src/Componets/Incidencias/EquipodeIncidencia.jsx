import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Equipos/Equipo.css';
import { useNavigate } from 'react-router-dom';

export const EquipodeIncidencia = () => {
    const navigate = useNavigate();
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const [tiposEspacios, setTiposEspacios] = useState([]);
    const [selectedTipoEspacio, setSelectedTipoEspacio] = useState(null);
    const [nombresEspacio, setNombresEspacio] = useState([]);
    const [selectedNombreEspacio, setSelectedNombreEspacio] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [departamentoPertenece, setDepartamentoPertenece] = useState('');
    const [selectedIdEspacio, setSelectedIdEspacio] = useState(null);

    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const [tipoIncidencias, setTipoIncidencias] = useState([]);
    const [tipoIncidencia, setTipoIncidencia] = useState('');
    const [hrInicial, setHrInicial] = useState('');
    const [hrFinal, setHrFinal] = useState('');
    const [descripcionGeneral, setDescripcionGeneral] = useState('');

    const [equipo, setEquipo] = useState({
        tipo: '', // Inicializa como string vacío
        equipo: {},
        detalles: {}, // Inicializa como objeto vacío
        softwares: [] // Inicializa como array vacío
    });

    const permisos = localStorage.getItem('permisos');
    const idDepartamentoPertenece = localStorage.getItem('idDepartamentoPertenece');
    const id_usuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchEdificios = async () => {
            try {
                if(permisos === '1'){
                    const response = await axios.get('http://localhost:3000/SelectEdificios');
                    setEdificios(response.data.edificios);
                }else{
                    const response = await axios.get('http://localhost:3000/SelectEdificiosPorDepartamento',
                       {params: { id_departamento: idDepartamentoPertenece }}
                    )
                    setEdificios(response.data.edificios);
                }
                const departamentoResponse = await axios.get(`http://localhost:3000/SelectDepartamento`, {
                    params: { id_pertenece: idDepartamentoPertenece },
                });
                setDepartamentoPertenece(departamentoResponse.data.result);
            } catch (err) {
                alert('Error al cargar los edificios');
                console.error(err);
            }
        }; 
        fetchEdificios();
        selectTipoIncidencia();

    }, [permisos, idDepartamentoPertenece]);

    const fetchEspacios = async (id_edificio) => {
        try {
            if (permisos === '2') {
                const response = await axios.get('http://localhost:3000/SelectEspaciosPorEdificio', {
                    params: { id_edificio: id_edificio, id_departamento: idDepartamentoPertenece },
                });
                setTiposEspacios(response.data.tiposEspacios || []);
            }
            else{
                const response = await axios.get('http://localhost:3000/SelectEspaciosPorEdificioADMON', {
                    params: {id_edificio: id_edificio},
                });
                setTiposEspacios(response.data.tiposEspacios || []);
            }
        } catch (err) {
            alert('Error al cargar los espacios');
            console.error(err);
        }
    };

    const fetchNombreEspacios = async (id_edificio, idTipoEspacio) => {
        try {
            if(permisos === '2'){
                const response = await axios.get('http://localhost:3000/SelectNombrePorEspacios', {
                    params: { id_tipoEspacio: idTipoEspacio, id_edificio: id_edificio, id_departamento: idDepartamentoPertenece },
                });
                setNombresEspacio(response.data.nombresEspacio || []);
            }else{
                const response = await axios.get('http://localhost:3000/SelectNombrePorEspaciosADMON', {
                    params: { id_tipoEspacio: idTipoEspacio, id_edificio: id_edificio},
                });
                setNombresEspacio(response.data.nombresEspacio || []);
            }
        } catch (err) {
            alert('Error al cargar los nombres de los espacios');
            console.error(err);
        }
    };

    const fetchEquipos = async (id_espacio, id_edificio, id_tipoEspacio) => {
        try {
            const response = await axios.get('http://localhost:3000/SelectEquiposPorEspacio', {
                params: { id_espacio: id_espacio, id_edificio: id_edificio, id_tipoEspacio: id_tipoEspacio },
            });
            setEquipos(response.data.equipos);
            
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdificioSelect = (edificio) => {
        if (selectedEdificio === edificio) {
            setSelectedEdificio(null);
            setTiposEspacios([]);
            setSelectedTipoEspacio(null);
            setNombresEspacio([]);
            setSelectedNombreEspacio(null);
        } else {
            setSelectedEdificio(edificio);
            fetchEspacios(edificio.id_edificio);
        }
    };

    const handleTipoEspacioSelect = (tipoEspacio) => {
        if (selectedTipoEspacio === tipoEspacio) {
            setSelectedTipoEspacio(null);
            setNombresEspacio([]);
            setSelectedNombreEspacio(null);
            setEquipos([]);
        } else {
            setSelectedTipoEspacio(tipoEspacio);
            fetchNombreEspacios(selectedEdificio.id_edificio, tipoEspacio.id_tipoEspacio);
        }
    };
    
    const handleNombreEspacioSelect = (nombreEspacio) => {
        if (selectedNombreEspacio === nombreEspacio) {
            setSelectedNombreEspacio(null);
            setSelectedIdEspacio(null);
            setEquipos([]);
        } else {
            setSelectedNombreEspacio(nombreEspacio);
            setSelectedIdEspacio(nombreEspacio.id_espacio);
            fetchEquipos(nombreEspacio.id_espacio, selectedEdificio.id_edificio, selectedTipoEspacio.id_tipoEspacio);
        }
        localStorage.setItem('id_espacio', nombreEspacio.id_espacio);
    };

     //---------------------------De aqui-----------------------------------------------------
    const handleDetalleEquipo = (event) => {
        const idEquipo = event.currentTarget.getAttribute('data-id-equipo'); // Obtener el id_equipo desde data-id-equipo
        //setIdEquipo(idEquipo);
       
        detalleEquipo(idEquipo); // Pasar el idEquipo correctamente
        setShowModal2(true);
    };

    const detalleEquipo = async (idEquipo) => {
        try {
            //const idEquipo = idEquipo;
            const response = await axios.get(`http://localhost:3000/DetalleEquipo/${idEquipo}`);
            //alert(response.data.tipo)
            setEquipo(response.data || []);
            console.log(response.data);
        } catch (err) {
            setEquipo([]);
            alert('Error al cargar el detalle de equipo, al parecer el tipo de equipo no esta especificado');
            console.error(err);
        }
    };
    //------------------------Hasta aqui-------------------------------------
    
    const handleCloseModal2 = () => {
        setShowModal2(false);
    };

    const limpiar = () => {
        
    };

    const handleNuevaSolicitud = (equipo) => {
        setEquipoSeleccionado(equipo);
        setShowModal3(true);
    };
    const handleCloseModal3 = () => {
        setShowModal3(false);
    };
    const handleHome = () => {
        navigate('/Principal');
    };

    const handleValidarModal3 = () => {
        if(!hrInicial || !hrFinal){
            alert('Necesita completar los campos');
            return;
        }
        handleGuardarIncidencia();
    };

    const getFormattedDate = () => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
    
        return `${month}-${day}-${year}`;
    };

    const obtenerHoraActual = () => {
        const now = new Date();
        const horas = now.getHours().toString().padStart(2, '0');
        const minutos = now.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`; // Retorna en formato HH:MM
    };

    const handleGuardarIncidencia = async () => {
        const fechaActual = getFormattedDate();    
        const hrEnvio = obtenerHoraActual();
        try {
            const response = await axios.post('http://localhost:3000/NuevaIncidencia', {
                id_equipo: equipoSeleccionado.id_equipo,
                descripcionGeneral: descripcionGeneral,
                fechaActual: fechaActual,
                hrEnvio: hrEnvio,
                hrInicial: hrInicial,
                hrFinal: hrFinal,
                tipoIncidencia: tipoIncidencia
            });
            navigate('/Principal');
        } catch (error) {
            console.error('Error al intentar agregar incidencia:', error);
            alert('Hubo un error al intentar agregar incidencia');
        }
    };

    const selectTipoIncidencia = async () => {
        try{
            const response = await axios.get('http://localhost:3000/TipoIncidencia');
            setTipoIncidencias(response.data);
            setTipoIncidencia(response.data[0].id_tipoIncidencia);
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    }

    return (
        <div className="equipos-container">
            <button className='eI-btn-volver' onClick={handleHome}>← Volver</button>
            <p></p>
            <h1 className="equipos-title">Equipo a reportar </h1>
            <ul className="equipos-edificio-list">
                {Array.isArray(edificios) && edificios.length > 0 ? (
                    edificios.map((edificio) => (
                        <li key={edificio.id_edificio} className="equipos-edificio-item">
                            <div className="equipos-edificio-name" onClick={() => handleEdificioSelect(edificio)} >
                                {edificio.nombre}
                            </div>
                            {selectedEdificio && selectedEdificio.id_edificio === edificio.id_edificio && (
                                <ul className="equipos-espacio-list">
                                    {Array.isArray(tiposEspacios) && tiposEspacios.length > 0 ? (
                                        tiposEspacios.map((tipoEspacio) => (
                                            <li key={tipoEspacio.id_tipoEspacio} className="equipos-espacio-item">
                                                <div className="equipos-espacio-name" onClick={() => handleTipoEspacioSelect(tipoEspacio)}>
                                                    {tipoEspacio.nombre}
                                                </div>
                                                {selectedTipoEspacio && selectedTipoEspacio.id_tipoEspacio === tipoEspacio.id_tipoEspacio && (
                                                    <ul className="equipos-nombres-list">
                                                        {Array.isArray(nombresEspacio) && nombresEspacio.length > 0 ? (
                                                            nombresEspacio.map((nombreEspacio) => (
                                                                <li key={nombreEspacio.id_espacio} className="equipos-nombre-item">
                                                                    <div className="equipos-nombre-name" onClick={() => handleNombreEspacioSelect(nombreEspacio)}>
                                                                        <span className='editar-nomEspacio nito'>{nombreEspacio.nombre}</span>
                                                                    </div>
                                                                    {selectedNombreEspacio && selectedNombreEspacio.id_espacio === nombreEspacio.id_espacio && (
                                                                        <>
                                                                            <span className='editar-responsable nito'>Responsable: </span>
                                                                            <span>  {nombreEspacio.responsable}</span>
                                                                            <ul className="equipos-lista-equipos">
                                                                            {Array.isArray(equipos) && equipos.length > 0 ? (
                                                                                        equipos.map((equipo) => (
                                                                                            <li className="equipos-equipo-item eI-juntos" key={equipo.id_equipo} >
                                                                                                <div data-id-equipo={equipo.id_equipo} onClick={handleDetalleEquipo} className="equipos-equipo-name">
                                                                                                    {equipo.clave}
                                                                                                </div>
                                                                                                <button className='eI-btn-reportar color-blanco' onClick={() => handleNuevaSolicitud(equipo)}>REPORTAR</button>
                                                                                            </li>
                                                                                        ))
                                                                                    ) : (
                                                                                        <span>No hay equipos disponibles</span>
                                                                                    )}
                                                                            </ul>
                                                                        </>
                                                                    )}     
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <span>No hay nombres de espacios disponibles</span>
                                                        )}
                                                    </ul>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <span>No hay tipos de espacios disponibles</span>
                                    )}
                                </ul>
                            )}
                        </li>
                    ))
                ) : (
                    <span>No hay edificios disponibles</span>
                )}
            </ul>
            {showModal2 && (
                <div className="modal-overlay" onClick={handleCloseModal2}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                        <p></p>
                        <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseModal2}></button>
                            <div className="modal-header">
                                <h5 className="modal-title nito">Detalle Equipo</h5>
                            </div>
                            <div className="modal-body">
                            <form>
                                <div className="mb-3">   
                                    {/* Computadora */}
                                    {(equipo.tipo === 'Computadora') && (
                                        <div className="input-container">
                                            <label htmlFor="tipoComputadora" className="form-label nito">Tipo de computadora: </label>
                                            <span className="form-span">{equipo.detalles.tipoComputadora}</span>
                                            <br />
                                            <label htmlFor="softwares" className="form-label nito">Softwares: </label>
                                             {equipo.softwares.map((soft, index) => (
                                                <span key={index} className="form-span"> <br/>{soft.software} </span>
                                            ))}
                                            <br />
                                        </div>
                                    )}

                                    {/* Computadora y Servidor */}
                                    {(equipo.tipo === 'Computadora' || equipo.tipo === 'Servidor') && (
                                        <>
                                            <label htmlFor="procesador" className="form-label nito">Procesador: </label>
                                            <br />
                                            <span className="form-span">{equipo.detalles.procesador}</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.nucleos} nucleos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.hilos} hilos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.cache} GB</span>
                                            <br />

                                            <label htmlFor="ram" className="form-label nito">Memoria RAM: </label>
                                            <span className="form-span">{equipo.detalles.memoria_RAM}</span>
                                            <br />

                                            <label htmlFor="almacenamiento" className="form-label nito">Almacenamiento: </label>
                                            <span className="form-span">{equipo.detalles.almacenamiento}</span>
                                            <br />

                                            <label htmlFor="tarjetaGrafica" className="form-label nito">Tarjeta Gráfica: </label>
                                            <span className="form-span">{equipo.detalles.tarjeta_grafica}</span>
                                            <br />

                                            <label htmlFor="sistemaOperativo" className="form-label nito">Sistema Operativo: </label>
                                            <br />
                                            <span className="form-span">{equipo.detalles.sistemaOperativo}</span>
                                            <br />
                                            <span className="form-span">Tipo de interfaz: {equipo.detalles.interfaz}</span>
                                            <br />
                                            <span className="form-span">Licencia: {equipo.detalles.licencia}</span>
                                            <br />

                                            <label htmlFor="configuracionRed" className="form-label nito">Configuración de red: </label>
                                            <span className="form-span">{equipo.detalles.tarjetaRed}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Impresora */}
                                    {(equipo.tipo === 'Impresora') && (
                                        <>
                                            <label htmlFor="tipoImpresora" className="form-label nito">Tipo de Impresora: </label>
                                            <span className="form-span">{equipo.detalles.tipo_impresora}</span>
                                            <br />
                                            <label htmlFor="resolucion" className="form-label nito">Resolución: </label>
                                            <span className="form-span">{equipo.detalles.resolucion}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span">{equipo.detalles.conectividad}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Switch */}
                                    {(equipo.tipo === 'Switch') && (
                                        <>
                                            <label htmlFor="numeroPuertos" className="form-label nito">Número de puertos: </label>
                                            <span className="form-span">{equipo.detalles.numero_puertos}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span">{equipo.detalles.velocidad}</span>
                                            <br />
                                            <label htmlFor="tipoSwitch" className="form-label nito">Tipo de Switch: </label>
                                            <span className="form-span">{equipo.detalles.tipo_switch}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span">{equipo.detalles.conectividad}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Router */}
                                    {(equipo.tipo === 'Router') && (
                                        <>
                                            <label htmlFor="tipoConexion" className="form-label nito">Tipo de conexión: </label>
                                            <span className="form-span">{equipo.detalles.tipo_conexion}</span>
                                            <br />
                                            <label htmlFor="soporteVPN" className="form-label nito">Soporte VPN: </label>
                                            <span className="form-span">{equipo.detalles.soporte_vpn}</span>
                                            <br />
                                            <label htmlFor="numeroInterfaces" className="form-label nito">Número de Interfaces Giga, Fast: </label>
                                            <span className="form-span">{equipo.detalles.numero_interfaces}</span>
                                            <br />
                                            <label htmlFor="numeroSeriales" className="form-label nito">Número de Seriales: </label>
                                            <span className="form-span">{equipo.detalles.numero_seriales}</span>
                                            <br />
                                            <label htmlFor="frecuenciaRuta" className="form-label nito">Frecuencia de Ruta: </label>
                                            <span className="form-span">{equipo.detalles.frecuencia_ruta}</span>
                                            <br />
                                            <label htmlFor="protocolosRuta" className="form-label nito">Prótocolos de Ruta: </label>
                                            <span className="form-span">{equipo.detalles.protocolos_ruta}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Switch y Router */}
                                    {(equipo.tipo === 'Switch' || equipo.tipo === 'Router') && (
                                        <>
                                            <label htmlFor="capacidad" className="form-label nito">Capacidad: </label>
                                            <span className="form-span">{equipo.detalles.capacidad}</span>
                                            <br />
                                            <label htmlFor="consumoEnergia" className="form-label nito">Consumo de Energía: </label>
                                            <span className="form-span">{equipo.detalles.consumo_energia}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Escáner */}
                                    {(equipo.tipo === 'Escaner') && (
                                        <>
                                            <label htmlFor="tipoEscaner" className="form-label nito">Tipo de Escaner: </label>
                                            <span className="form-span">{equipo.detalles.tipo_escaner}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span">{equipo.detalles.velocidad}</span>
                                            <br />
                                        </>
                                    )}

                                </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal2}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal3 && (
                <div className="modal-overlay" onClick={handleCloseModal3}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nueva Solicitud</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="inputNewPassword" className="form-label nito">Clave de Equipo: </label>
                                        <span>{equipoSeleccionado.clave}</span>
                                        <br />
                                        <label htmlFor="inputNewPassword" className="form-label nito">Tipo de Incidencia: </label>
                                        <select className="form-select" value={tipoIncidencia} onChange={(e) => setTipoIncidencia(e.target.value)}>
                                            {tipoIncidencias.map((ti, index) => (
                                                <option value={ti.id_tipoIncidencia} key={ti.id_tipoIncidencia}> {ti.nombre} </option>
                                            ))}
                                        </select>
                                        <label htmlFor="inputNewPassword" className="form-label nito">Horario Disponible Inicial: </label>
                                        <input type="time" className="form-control" placeholder="Inicio" value={hrInicial} onChange={(e) => setHrInicial(e.target.value)}></input>
                                        <label htmlFor="inputNewPassword" className="form-label nito">Horario Disponible Final: </label>
                                        <input type="time" className="form-control" placeholder="Fin" value={hrFinal} onChange={(e) => setHrFinal(e.target.value)}></input>
                                        <label htmlFor="inputNewPassword" className="form-label nito">Descripción Adicional: </label>
                                        <input type="text" className="form-control" value={descripcionGeneral} onChange={(e) => setDescripcionGeneral(e.target.value)} placeholder="Añade una descripción adicional/general"></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal3}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleValidarModal3}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );    
};