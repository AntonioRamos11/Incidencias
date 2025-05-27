import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Equipo.css';

export const Equipos = () => {
    const [edificios, setEdificios] = useState([]);
    const [selectedEdificio, setSelectedEdificio] = useState(null);
    const [tiposEspacios, setTiposEspacios] = useState([]);
    const [selectedTipoEspacio, setSelectedTipoEspacio] = useState(null);
    const [nombresEspacio, setNombresEspacio] = useState([]);
    const [selectedNombreEspacio, setSelectedNombreEspacio] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [departamentoPertenece, setDepartamentoPertenece] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [radioCheckEquipo, setRadioCheckEquipo] = useState('Computadora');
    const [nombreEquipo, setNombreEquipo] = useState([]);
    const [claveEquipo, setClaveEquipo] = useState('');
    const [computadoras, setComputadoras] = useState([]);
    const [computadora, setComputadora] = useState('');
    const [impresoras, setImpresoras] = useState([]);
    const [impresora, setImpresora] = useState('');
    const [servidores, setServidores] = useState([]);
    const [servidor, setServidor] = useState('');
    const [swits, setSwits] = useState([]);
    const [swit, setSwit] = useState('');
    const [routers, setRouters] = useState([]);
    const [router, setRouter] = useState('');
    const [escaners, setEscaners] = useState([]);
    const [escaner, setEscaner] = useState('');
    const [selectedIdEspacio, setSelectedIdEspacio] = useState(null);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

    //Esta debes copiar y pegar
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

        selectComputadora();
        selectImpresora();
        selectServidor();
        selectSwitch();
        selectRouter();
        selectEscaner();

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
                console.log(response.data);
                setNombresEspacio(response.data.nombresEspacio || []);
            }else{
                const response = await axios.get('http://localhost:3000/SelectNombrePorEspaciosADMON', {
                    params: { id_tipoEspacio: idTipoEspacio, id_edificio: id_edificio},
                });
                console.log(response.data);
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

    const handleNewEquipo = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
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

    const handleRadioChangeEquipo = (event) => {
        const valueCheckEquipo = event.target.value;
        setRadioCheckEquipo(valueCheckEquipo);
        console.log(valueCheckEquipo);
        limpiar();
    };

    const handleValidar = (event) => {
        event.preventDefault();
        if(!claveEquipo){
            alert('Necesita completar los campos');
            return;
        }
        handleGuardarCambios();
    }

    const getFormattedDate = () => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
    
        return `${month}-${day}-${year}`;
    };

    const handleGuardarCambios = async () => {
        const fechaActual = getFormattedDate();
        let id_equipo;
        switch (radioCheckEquipo) {
            case 'Computadora':
                id_equipo = computadora;
                break;
            case 'Impresora':
                id_equipo = impresora;
                break;
            case 'Servidor':
                id_equipo = servidor;
                break;
            case 'Switch':
                id_equipo = swit;
                break;
            case 'Router':
                id_equipo = router;
                break;
            case 'Escaner':
                id_equipo = escaner;
                break;
            default:
                alert('Por favor, selecciona un tipo de equipo válido.');
                return;
        }
    
        try {
            const response = await axios.put('http://localhost:3000/AltaEquipoEnEspacio', {
                id_equipo: id_equipo,
                id_espacio: selectedIdEspacio,
                fecha_instalacion: fechaActual,
                id_usuario: id_usuario,
                clave: claveEquipo 
            });
            if (response.data.success) {
                alert('El equipo fue dado de alta en el espacio correctamente');
                handleCloseModal();
                fetchEquipos(selectedIdEspacio,selectedEdificio.id_edificio,selectedTipoEspacio.id_tipoEspacio);

                switch (radioCheckEquipo) {
                    case 'Computadora':
                        selectComputadora();
                        break;
                    case 'Impresora':
                        selectImpresora();
                        break;
                    case 'Servidor':
                        selectServidor();
                        break;
                    case 'Switch':
                        selectSwitch();
                        break;
                    case 'Router':
                        selectRouter();
                        break;
                    case 'Escaner':
                        selectEscaner();
                        break;
                    default:
                        return;
                }
                setClaveEquipo('');


            } else {
                alert('No se pudo dar de alta el equipo en el espacio.');
            }
        } catch (error) {
            console.error('Error al intentar agregar el equipo en el espacio:', error);
            alert('Hubo un error al intentar agregar el equipo en el espacio');
        }
    };

    const limpiar = () => {
        
    };

    const selectComputadora = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectComputadora');
            setComputadoras(response.data);
            setComputadora(response.data[0].id_equipo);
        }catch(error){
            console.error('Error al obtener las computadoras', error);
        }
    }

    const selectImpresora = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectImpresora');
            setImpresoras(response.data);
            setImpresora(response.data[0].id_equipo);
        }catch(error){
            console.error('Error al obtener las impresoras', error);
        }
    }

    const selectServidor = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectServidor');
            setServidores(response.data);
            setServidor(response.data[0].id_equipo);
        }catch(error){
            console.error('Error al obtener los servidores', error);
        }
    }

    const selectSwitch = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectSwitch');
            setSwits(response.data);
            setSwit(response.data[0].id_equipo);
        }catch(error){
            console.error('Error al obtener los switch', error);
        }
    }

    const selectRouter = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectRouter');
            setRouters(response.data);
            setRouter(response.data[0].id_equipo);
        }catch(error){
            console.error('Error al obtener los routers', error);
        }
    }

    const selectEscaner = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectEscaner');
            setEscaners(response.data);
            setEscaner(response.data[0].id_equipo);
        }catch(error){
            console.error('Error al obtener los escaners', error);
        }
    }

    const handleConexion = (e) => {
        e.stopPropagation();
        setShowModal3(true);
    };

    const handleCloseModal3 = () => {
        setShowModal3(false);
    };

    return (
        <div className="equipos-container scrollableEquipo">
            <h1 className="equipos-title">Gestión de Equipos </h1>
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
                                                                    <div  className="equipos-nombre-name" onClick={() => handleNombreEspacioSelect(nombreEspacio)}>
                                                                        <span className='editar-nomEspacio nito'>{nombreEspacio.nombre}</span>
                                                                    </div>
                                                                    {selectedNombreEspacio && selectedNombreEspacio.id_espacio === nombreEspacio.id_espacio && (
                                                                        <>
                                                                            <span className='editar-responsable nito'>Responsable: </span>
                                                                            <span>  {nombreEspacio.responsable}</span>
                                                                            <br />
                                                                            <button className="equipos-select-button" onClick={handleNewEquipo}>New</button>
                                                                            <ul className="equipos-lista-equipos">
                                                                                {Array.isArray(equipos) && equipos.length > 0 ? (
                                                                                    equipos.map((equipo) => (
                                                                                        <li key={equipo.id_equipo}  className="equipos-equipo-item" onClick={handleDetalleEquipo} data-id-equipo={equipo.id_equipo}>
                                                                                            <div className='div-nombre-conexion'>
                                                                                                <div  className="equipos-equipo-name">
                                                                                                {equipo.clave} 
                                                                                                </div>
                                                                                            </div>
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
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Equipo</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioAgregar" value="Computadora" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Computadora'} ></input>
                                            <label className="form-check-label" htmlFor="idRadioAgregar">Computadora</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioActualizar" value="Impresora" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Impresora'}></input>
                                            <label className="form-check-label" htmlFor="idRadioActualizar">Impresora</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Servidor" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Servidor'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Servidor</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Switch" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Switch'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Switch</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Router" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Router'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Router</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radioAAE" id="idRadioEliminar" value="Escaner" onChange={handleRadioChangeEquipo} checked={radioCheckEquipo === 'Escaner'}></input>
                                            <label className="form-check-label" htmlFor="idRadioEliminar">Escaner</label>
                                        </div>
                                        
                                        <div className="input-container">
                                            <label htmlFor="inputText" className="form-label">Selecciona el equipo</label>
                                            
                                            {(radioCheckEquipo === 'Computadora') && (
                                                <select className="form-select" value={computadora} onChange={(e) => setComputadora(e.target.value)}>
                                                    {computadoras.map((comp, index) => (
                                                        <option value={comp.id_equipo} key={comp.id_equipo} > {comp.nombre}</option>
                                                    ))}   
                                                </select>
                                            )}

                                            {(radioCheckEquipo === 'Impresora') && (
                                                <select className="form-select" value={impresora} onChange={(e) => setImpresora(e.target.value)}>
                                                    {impresoras.map((imp, index) => (
                                                        <option value={imp.id_equipo} key={imp.id_equipo} > {imp.nombre}</option>
                                                    ))}   
                                                </select>
                                            )}

                                            {(radioCheckEquipo === 'Servidor') && (
                                                <select className="form-select" value={servidor} onChange={(e) => setServidor(e.target.value)}>
                                                    {servidores.map((serv, index) => (
                                                        <option value={serv.id_equipo} key={serv.id_equipo} > {serv.nombre}</option>
                                                    ))}   
                                                </select>
                                            )}

                                            {(radioCheckEquipo === 'Switch') && (
                                                <select className="form-select" value={swit} onChange={(e) => setSwit(e.target.value)}>
                                                    {swits.map((swi, index) => (
                                                        <option value={swi.id_equipo} key={swi.id_equipo} > {swi.nombre}</option>
                                                    ))}   
                                                </select>
                                            )}

                                            {(radioCheckEquipo === 'Router') && (
                                                <select className="form-select" value={router} onChange={(e) => setRouter(e.target.value)}>
                                                    {routers.map((rou, index) => (
                                                        <option value={rou.id_equipo} key={rou.id_equipo} > {rou.nombre}</option>
                                                    ))}   
                                                </select>
                                            )}

                                            {(radioCheckEquipo === 'Escaner') && (
                                                <select className="form-select" value={escaner} onChange={(e) => setEscaner(e.target.value)}>
                                                    {escaners.map((esc, index) => (
                                                        <option value={esc.id_equipo} key={esc.id_equipo} > {esc.nombre}</option>
                                                    ))}   
                                                </select>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="inputText" className="form-label">Clave del equipo</label>
                                            <input type="text" className="form-control" id="inputText" placeholder="Ingresa la clave aquí" value={claveEquipo} onChange={(e) => setClaveEquipo(e.target.value)}></input>
                                            <label htmlFor="" className='equipo-clave-letrapequena'>Tipo de equipo: C-, I-,  Se-, Sw-, R-, E- , edificio, nombre del espacio, número de equipo de ese tipo en ese espacio.
                                                Por ejemplo: "C-EASA01" 
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleValidar}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                        <div>
                                            <label htmlFor="procesador" className="form-label nito">Procesador: </label>
                                            <br />
                                            <span className="form-span">{equipo.detalles.procesador}</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.nucleos} nucleos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.hilos} hilos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.cache} GB Cache</span>
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
                                        </div>
                                    )}

                                    {/* Impresora */}
                                    {(equipo.tipo === 'Impresora') && (
                                        <div>
                                            <label htmlFor="tipoImpresora" className="form-label nito">Tipo de Impresora: </label>
                                            <span className="form-span">{equipo.detalles.tipo_impresora}</span>
                                            <br />
                                            <label htmlFor="resolucion" className="form-label nito">Resolución: </label>
                                            <span className="form-span">{equipo.detalles.resolucion}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span">{equipo.detalles.conectividad}</span>
                                            <br />
                                        </div>
                                    )}

                                    {/* Switch */}
                                    {(equipo.tipo === 'Switch') && (
                                        <div>
                                            <label htmlFor="numeroPuertos" className="form-label nito">Número de puertos: </label>
                                            <span className="form-span">{equipo.detalles.numero_puertos}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span">{equipo.detalles.velocidad_backplane}</span>
                                            <br />
                                            <label htmlFor="tipoSwitch" className="form-label nito">Tipo de Switch: </label>
                                            <span className="form-span">{equipo.detalles.tipo_switch}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Capacidad de switching: </label>
                                            <span className="form-span">{equipo.detalles.capacidad_switching}</span>
                                            
                                        </div>
                                    )}

                                    {/* Router */}
                                    {(equipo.tipo === 'Router') && (
                                        <div>
                                            <label htmlFor="tipoConexion" className="form-label nito">Tipo de conexión: </label>
                                            <span className="form-span">{equipo.detalles.tipo_conexion}</span>
                                            <br />
                                            <label htmlFor="soporteVPN" className="form-label nito">Soporte VPN: </label>
                                            <span className="form-span">{equipo.detalles.soporte_vpn}</span>
                                            <br />
                                            <label htmlFor="numeroInterfaces" className="form-label nito">Número de Interfaces Giga, Fast: </label>
                                            <span className="form-span">{equipo.detalles.numero_interfaces_giga_fast}</span>
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
                                            <label htmlFor="conectividad" className="form-label nito">Capacidad de ruta: </label>
                                            <span className="form-span">{equipo.detalles.capacidad_ruta}</span>
                                        </div>
                                    )}

                                    {/* Switch y Router */}
                                    {(equipo.tipo === 'Switch' || equipo.tipo === 'Router') && (
                                        <div>
                                            <label htmlFor="consumoEnergia" className="form-label nito">Consumo de Energía: </label>
                                            <span className="form-span">{equipo.detalles.consumo_energia}</span>
                                            <br />
                                        </div>
                                    )}

                                    {/* Escáner */}
                                    {(equipo.tipo === 'Escaner') && (
                                        <div>
                                            <label htmlFor="tipoEscaner" className="form-label nito">Tipo de Escaner: </label>
                                            <span className="form-span">{equipo.detalles.tipo_escaner}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span">{equipo.detalles.velocidad}</span>
                                            <br />
                                        </div>
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
                        <p></p>
                        <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseModal3}></button>
                            <div className="modal-header">
                                <h5 className="modal-title nito">Conexión</h5>
                            </div>
                            <div className="modal-body">
                            <form>
                                 
                            </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal3}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );    
};