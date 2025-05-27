import '../Departamentos/Departamento_Alta_Baja_Cambio.css';
import './EquipoBodega.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const EquipoBodega = () => {
    const [radioCheckEquipo, setRadioCheckEquipo] = useState('Computadora');
    const [modelos, setModelos] = useState([]);
    const [modelo,setModelo] = useState('');
    const [estadosEquipo, setEstadosEquipo] = useState(['En uso','En reparacion','Ya no sirve','Disponible']);
    const [estadoEquipo, setEstadoEquipo] = useState('Disponible');
    const [computadoraTipos, setComputadoraTipos] = useState([]);
    const [computadoraTipo, setComputadoraTipo] = useState('');
    const [procesadores, setProcesadores] = useState([]);
    const [procesador, setProcesador] = useState('');
    const [graficas, setGraficas] = useState([]);
    const [graficaSelected, setGraficaSelected] = useState('');
    const [sistemas, setSistemas] = useState([]);
    const [sistemaSelected, setSistemaSelected] = useState('');
    const [confiRedes, setConfiRedes] = useState([]);
    const [confiRed, setConfiRed] = useState('');
    const [softwares, setSoftwares] = useState([]);
    const [softwaresSelected, setSoftwaresSelected] = useState([]);
    const [numeroSerie, setNumeroSerie] = useState('');
    const [costoEquipo, setCostoEquipo] = useState('');
    const [ram, setRAM] = useState('');
    const [memoria, setMemoria] = useState('');
    const [tipoImpresoras, setTipoImpresoras] = useState([]);
    const [tipoImpresora, setTipoImpresora] = useState('');
    const [resolucion, setResolucion] = useState('');
    const [velocidad, setVelocidad] = useState('');
    const [conectividad, setConectividad] = useState('');
    const [numPuertos, setnumPuertos] = useState('');
    const [velocidad_backplane, setVelocidadBlackplane] = useState('');
    const [tipoSwitch, settipoSwitch] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [consEnergia, setconsEnergia] = useState('');
    const [tipo_conexion, settipo_conexion] = useState('');
    const [soportes_vpn, setsoportes_vpn] = useState(['Sí', 'No']);
    const [soporte_vpn, setsoporte_vpn] = useState('No');
    const [numGigFas, setnumGigFas] = useState('');
    const [numSeriales, setnumSeriales] = useState('');
    const [frecuencia, setFrecuencia] = useState('');
    const [protocolos, setProtocolos] = useState('');
    const [tipoEscaners, settipoEscaners] = useState([]);
    const [tipoEscaner, settipoEscaner] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [expandedG, setExpandedG] = useState(false);
    const [expandedF, setExpandedF] = useState(false);
    const [expandedU2, setExpandedU2] = useState(false);
    const [expandedU3, setExpandedU3] = useState(false);
    const [expandedC, setExpandedC] = useState(false);
    const [expandedH, setExpandedH] = useState(false);
    const [expandedV, setExpandedV] = useState(false);
    const [expandedR, setExpandedR] = useState(false);

    const [gigas, setGigas] = useState([]);
    const [gigasSelected, setGigasSelected] = useState([]);
    const [fasts, setFasts] = useState([]);
    const [fastsSelected, setFastsSelected] = useState([]);
    const [consolas, setConsolas] = useState([]);
    const [consolasSelected, setConsolasSelected] = useState([]);
    const [usbs2, setUsbs2] = useState([]);
    const [usbs2Selected, setUsbs2Selected] = useState([]);
    const [usbs3, setUsbs3] = useState([]);
    const [usbs3Selected, setUsbs3Selected] = useState([]);
    const [hdmis, setHdmis] = useState([]);
    const [hdmisSelected, setHdmisSelected] = useState([]);
    const [vgas, setVgas] = useState([]);
    const [vgasSelected, setVgasSelected] = useState([]);
    const [rjs, setRjs] = useState([]);
    const [rjsSelected, setRjsSelected] = useState([]);

    const [puertos, setPuertos] = useState([]);    

    const navigate = useNavigate();

    useEffect(() => {
        //Equipo
        selectModelo();
        //Computadora
        selectTipoComputadora();
        //Computadora y Servidor
        selectProcesador();
        selectGrafica();
        selectSistemas();
        selectConfiguracionRed();
        selectSoftwares();
        //Impresora
        selectTipoImpresora();
        //Escaner
        selectTipoEscaner();

        selectGiga();
        selectFast();
        selectConsolas();
        selectHdmis();
        selectUsbs2();
        selectUsbs3();
        selectRjs();
        selectVgas()
    }, []);

    const handleExpandG = (e) => {
        e.preventDefault();
        setExpandedG(!expandedG);
    };

    const handleExpandF = (e) => {
        e.preventDefault();
        setExpandedF(!expandedF);
    };

    const handleExpandU2 = (e) => {
        e.preventDefault();
        setExpandedU2(!expandedU2);
    };

    const handleExpandU3 = (e) => {
        e.preventDefault();
        setExpandedU3(!expandedU3);
    };

    const handleExpandH = (e) => {
        e.preventDefault();
        setExpandedH(!expandedH);
    };

    const handleExpandV = (e) => {
        e.preventDefault();
        setExpandedV(!expandedV);
    };

    const handleExpandR = (e) => {
        e.preventDefault();
        setExpandedR(!expandedR);
    };

    const handleExpandC = (e) => {
        e.preventDefault();
        setExpandedC(!expandedC);
    };

    const handleCheckboxChangePuertos = (id, selected, setSelected) => {
        if (selected.includes(id)) {
          setSelected(selected.filter((selectedId) => selectedId !== id));
          setPuertos(puertos.filter((selectedId) => selectedId !== id));
        } else {
          setSelected([...selected, id]);
          setPuertos([...puertos, id]);
        }
      };

    const selectGiga = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectGiga');
            setGigas(response.data);
        } catch (error) {
            console.error('Error al obtener los gigas', error);
        }
    };

    const handleCheckboxChangeGigas = (id) => {
        handleCheckboxChangePuertos(id, gigasSelected, setGigasSelected);
      };      

    const selectFast = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectFast');
            setFasts(response.data);
        } catch (error) {
            console.error('Error al obtener los fast', error);
        }
    };

    const handleCheckboxChangeFast = (id) => {
        handleCheckboxChangePuertos(id, fastsSelected, setFastsSelected);
      };      

    const selectConsolas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectConsolas');
            setConsolas(response.data);
        } catch (error) {
            console.error('Error al obtener las consolas', error);
        }
    };

    const handleCheckboxChangeConsolas = (id) => {
        handleCheckboxChangePuertos(id, consolasSelected, setConsolasSelected);
      };  

    const selectUsbs2 = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectUsb2');
            setUsbs2(response.data);
        } catch (error) {
            console.error('Error al obtener los USBs 2.0', error);
        }
    };

    const handleCheckboxChangeUsbs2 = (id) => {
        handleCheckboxChangePuertos(id, usbs2Selected, setUsbs2Selected);
    };
    
    const selectUsbs3 = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectUsb3');
            setUsbs3(response.data);
        } catch (error) {
            console.error('Error al obtener los USBs 3.0', error);
        }
    };

    const handleCheckboxChangeUsbs3 = (id) => {
        handleCheckboxChangePuertos(id, usbs3Selected, setUsbs3Selected);
    };

    const selectHdmis = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectHdmi');
            setHdmis(response.data);
        } catch (error) {
            console.error('Error al obtener los HDMIs', error);
        }
    };

    const handleCheckboxChangeHdmis = (id) => {
        handleCheckboxChangePuertos(id, hdmisSelected, setHdmisSelected);
    };

    const selectVgas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectVga');
            setVgas(response.data);
        } catch (error) {
            console.error('Error al obtener los VGAs', error);
        }
    };

    const handleCheckboxChangeVgas = (id) => {
        handleCheckboxChangePuertos(id, vgasSelected, setVgasSelected);
    };

    const selectRjs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectRj');
            setRjs(response.data);
        } catch (error) {
            console.error('Error al obtener los RJ45', error);
        }
    };

    const handleCheckboxChangeRjs = (id) => {
        handleCheckboxChangePuertos(id, rjsSelected, setRjsSelected);
    };

    const selectTipoEscaner = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectTipoEscaner');
            settipoEscaners(response.data);
            settipoEscaner(response.data[0].id_tipoEscaner);
        }catch(error){
            console.error('Error al obtener los tipos de escaner', error);
        }
    }
    const selectTipoImpresora = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectTipoImpresora');
            setTipoImpresoras(response.data);
            setTipoImpresora(response.data[0].id_tipoImpresora);
        } catch(error){
            console.error('Error al obtener los tipos de impresoras', error);
        }
    };

    const selectSoftwares = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectSoftwares');
            setSoftwares(response.data);
        } catch (error) {
            console.error('Error al obtener los softwares', error);
        }
    };

    const selectConfiguracionRed = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ConfiguracionRed');
            setConfiRedes(response.data);
            setConfiRed(response.data[0].id_tarjeta);
        } catch (error) {
            console.error('Error al obtener las configuraciones de red', error);
        }
    };

    const selectSistemas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectSistemasOperativos');
            setSistemas(response.data);
            setSistemaSelected(response.data[0].id_sistema);
        } catch (error) {
            console.error('Error al obtener los sistemas operativos', error);
        }
    };

    const selectGrafica = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectGrafica');
            setGraficas(response.data);
            setGraficaSelected(response.data[0].id_tarjeta);
        } catch (error) {
            console.error('Error al obtener las tarjetas graficas', error);
        }
    };

    const selectModelo = async () => {
        try {
            const response = await axios.get('http://localhost:3000/SelectModelos');
            setModelos(response.data);
            setModelo(response.data[0].id_modelo);
        } catch (error) {
            console.error('Error al obtener loa modelos de equipos', error);
        }
    };

    const selectTipoComputadora = async () => {
        try {
            const response = await axios.get('http://localhost:3000/selectTipoComputadora');
            setComputadoraTipos(response.data);
            setComputadoraTipo(response.data[0].id_tipoComputadora);
        } catch (error) {
            console.error('Error al obtener los tipo de computadora:', error);
        }
    };

    const selectProcesador = async () => {
        try {
            const response = await axios.get('http://localhost:3000/selectProcesador');
            setProcesadores(response.data);
            setProcesador(response.data[0].id_procesador);
        } catch (error) {
            console.error('Error al obtener los procesadores:', error);
        }
    };

    const handleListo = async (e) => {
        e.preventDefault();
        handleAgregar();
    };

    const getFormattedDate = () => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
    
        return `${month}-${day}-${year}`;
    };
    
    const handleAgregar = async() => {
        try {
            const id_usuario = localStorage.getItem("idUsuario");
            const fechaActual = getFormattedDate();
            let id = '';

            if(radioCheckEquipo === 'Computadora') {
                const response = await axios.post('http://localhost:3000/AltaComputadora', {
                    numeroSerie: numeroSerie,
                    fechaCompra: fechaActual,
                    costo: costoEquipo,
                    id_usuario: id_usuario,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    puertos: puertos,
                    //computadora
                    tipo: computadoraTipo,
                    procesador: procesador,
                    RAM: ram,
                    memoria: memoria,
                    tarjetaGrafica: graficaSelected,
                    sistemaOperativo: sistemaSelected,
                    tarjetaRed: confiRed,
                    //software-computadora
                    softwares: softwaresSelected
                });
                id = response.data.id; 
            }
            
            if(radioCheckEquipo === 'Servidor'){
                const response = await axios.post('http://localhost:3000/AltaServidor', {
                    numeroSerie: numeroSerie,
                    fechaCompra: fechaActual,
                    costo: costoEquipo,
                    id_usuario: id_usuario,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    puertos: puertos,
                    //servidor
                    procesador: procesador,
                    RAM: ram,
                    memoria: memoria,
                    tarjetaGrafica: graficaSelected,
                    sistemaOperativo: sistemaSelected,
                    tarjetaRed: confiRed
                });
                id = response.data.id; 
            }

            if(radioCheckEquipo === 'Impresora'){
                const response = await axios.post('http://localhost:3000/AltaImpresora', {
                    numeroSerie: numeroSerie,
                    fechaCompra: fechaActual,
                    costo: costoEquipo,
                    id_usuario: id_usuario,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    puertos: puertos,
                    //impresora
                    tipoImpresora: tipoImpresora,
                    resolucion: resolucion,
                    velocidad: velocidad,
                    conectividad: conectividad
                });
                id = response.data.id; 
            }

            if(radioCheckEquipo === 'Switch'){
                const response = await axios.post('http://localhost:3000/AltaSwitch', {
                    numeroSerie: numeroSerie,
                    fechaCompra: fechaActual,
                    costo: costoEquipo,
                    id_usuario: id_usuario,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    puertos: puertos,
                    //Switch
                    numPuertos: numPuertos,
                    velocidad_backplane: velocidad_backplane,
                    tipoSwitch: tipoSwitch,
                    capacidad: capacidad,
                    consEnergia: consEnergia
                });
                id = response.data.id;
            }

            if(radioCheckEquipo === 'Router'){
                const valorSoporteVPN = soporte_vpn === 'Sí' ? 1 : 0;
                const response = await axios.post('http://localhost:3000/AltaRouter', {
                    numeroSerie: numeroSerie,
                    fechaCompra: fechaActual,
                    costo: costoEquipo,
                    id_usuario: id_usuario,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    puertos: puertos,
                    //Router
                    tipo_conexion: tipo_conexion,
                    soporte_vpn: valorSoporteVPN,
                    numGigFas: numGigFas,
                    numSeriales: numSeriales,
                    frecuencia: frecuencia,
                    protocolos: protocolos,
                    capacidad: capacidad,
                    consEnergia: consEnergia
                });
                id = response.data.id; 
            }

            if(radioCheckEquipo === 'Escaner'){
                const response = await axios.post('http://localhost:3000/AltaEscaner', {
                    numeroSerie: numeroSerie,
                    fechaCompra: fechaActual,
                    costo: costoEquipo,
                    id_usuario: id_usuario,
                    modelo: modelo,
                    garantia: null,
                    estado: estadoEquipo,
                    puertos: puertos,
                    //Escaner
                    velocidad: velocidad,
                    tipoEscaner: tipoEscaner
                });
                id = response.data.id; 
            }
            const response = await axios.get(`http://localhost:3000/NombreEquipo?id_equipo=${id}`);

            alert(`Equipo ${response.data.Nombre} insertado exitosamente`);
            limpiar();
        } catch (error) {
            alert("Hubo problemas al agregar equipo");
            console.log(error.message);
        }
    };

    const handleRadioChangeEquipo = (event) => {
        const valueCheckEquipo = event.target.value;
        setRadioCheckEquipo(valueCheckEquipo);
        console.log(valueCheckEquipo);
        limpiar();
    };

    const handleCheckboxChange = (id) => {
        const seleccionados = []
        if (softwaresSelected.includes(id)) {
            // Si ya está seleccionado, lo quitamos
            setSoftwaresSelected(softwaresSelected.filter((selectedId) => selectedId !== id));
            
        } else {
            // Si no está seleccionado, lo agregamos
            setSoftwaresSelected([...softwaresSelected, id]);
        }
        console.log(softwaresSelected);
    };

    const handleCerrar = (e) => {
        e.preventDefault();
        navigate('/Principal');
    };

    const limpiar = () => {
        //setDepartamento('Seleccione el departamento')
        //setDepartamentoPadre('Seleccione el departamento');
        //setNombre('');
        //setNomPadre('No depende de otro departamento');
        //setCorreo('');
        //setTelefono('');
   }

    const handlePuertos = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <form className="EquipoBodega-form-container">
            <div className='background-half'></div>
            <div className='EquipoBodega-form-wrapper'>
                <button type="button" class="btn-close" aria-label="Close" onClick={handleCerrar}></button>
                <span className="d-block text-center nito tam-letra-28px tipo-letra-arial">Equipo</span>
                <div className="EquipoBodega-radio-group ">
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
                </div>

                <div className="EquipoBodega-form-columns">
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Número de serie</label>
                        <input value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} type="text" className="form-control" id="inputText" placeholder="Ingresa el número de serie aquí"></input>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Costo</label>
                        <input value={costoEquipo} onChange={(e) => setCostoEquipo(e.target.value)} type="text" className="form-control" id="inputText" placeholder="Ingresa el costo aquí (00.00)"></input>
                    </div>

                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Modelo</label>
                        <select className="form-select" value={modelo} onChange={(e) => setModelo(e.target.value)} >  
                            {modelos.map((mod, index) => (
                                <option key={mod.id} value={mod.id_modelo}>{mod.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Garantia</label>
                        <select className="form-select" >
                            <option value="" >No hay garantia</option>
                        </select>
                    </div>
                    <div className="EquipoBodega-column">
                        <label htmlFor="inputText" className="form-label">Estado equipo</label>
                        <select className="form-select" value={estadoEquipo} onChange={(e) => setEstadoEquipo(e.target.value)}>
                            {estadosEquipo.map((est, index) => (
                                <option key={index} value={est}>{est}</option>
                            ))}
                        </select>
                    </div>
                    <div className="EquipoBodega-column">
                        <button htmlFor="inputText" className="tam-letra-17px color-boton-lila color-blanco btn-sin-border tam-pos-btn" onClick={handlePuertos}>Puertos</button>
                    </div>
                </div>
                <hr />

                {(radioCheckEquipo === 'Computadora') && (
                    <div className='EquipoBodega-form-columns'>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de computadora</label>
                            <select className="form-select" value={computadoraTipo} onChange={(e) => setComputadoraTipo(e.target.value)}>
                                {computadoraTipos.map((tipo, index) =>(
                                    <option key={tipo.id_tipoComputadora} value={tipo.id_tipoComputadora} >{tipo.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Computadora' || radioCheckEquipo === 'Servidor' ) && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Procesador</label>
                            <select className="form-select" value={procesador} onChange={(e) => setProcesador(e.target.value)}>
                                {procesadores.map((pro, index) => (
                                    <option value={pro.id_procesador} key={pro.id_procesador} >{`${pro.modelo}, ${pro.fabricante}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Memoria RAM</label>
                            <input value={ram} onChange={(e) => setRAM(e.target.value)}  type="text" className="form-control" placeholder="Capacidad en GB"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Almacenamiento</label>
                            <input value={memoria} onChange={(e) => setMemoria(e.target.value)}  type="text" className="form-control" placeholder="Capacidad en GB"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tarjeta Gráfica</label>
                            <select className="form-select" value={graficaSelected} onChange={(e) => setGraficaSelected(e.target.value)}>
                                {graficas.map((gra,index) => (
                                    <option value={gra.id_tarjeta} key={gra.id_tarjeta} >{`${gra.modelo}, ${gra.fabricante}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Sistema Operativo</label>
                            <select className="form-select" value={sistemaSelected} onChange={(e) => setSistemaSelected(e.target.value)}>
                                {sistemas.map((sis,index) => (
                                    <option value={sis.id_sistema} key={sis.id_sistema} >{`${sis.nombre}, ${sis.version_}, con ${sis.interfaz}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Configuración red</label>
                            <select className="form-select" value={confiRed} onChange={(e) => setConfiRed(e.target.value)}>
                                {confiRedes.map((conf,index) => (
                                    <option value={conf.id_tarjeta} key={conf.id_tarjeta} >{`${conf.modelo}, ${conf.fabricante}`}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Computadora') && (
                    <div>
                        <label htmlFor="inputText" className="form-label margin-top-sfw">Softwares</label>
                        {softwares.map((software) => (
                            <div className="form-check" key={software.id_software}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={software.id_software}
                                    //checked={softwaresSelected.includes(software.id_software)}
                                    onChange={() => handleCheckboxChange(software.id_software)}
                                />
                                <label className="form-check-label" htmlFor={software.id_software}>
                                    {`${software.nombre}, ${software.version_}`}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {(radioCheckEquipo === 'Impresora') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de impresora</label>
                            <select className="form-select" value={tipoImpresora} onChange={(e) => setTipoImpresora(e.target.value)}>
                                {tipoImpresoras.map((timpr,index) => (
                                    <option value={timpr.id_tipoImpresora} key={timpr.id_tipoImpresora} > {timpr.nombre} </option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Resolución</label>
                            <input value={resolucion} onChange={(e) => setResolucion(e.target.value)} type="text" className="form-control"  placeholder="Ingresa la resolución"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText"className="form-label">Conectividad</label>
                            <input value={conectividad} onChange={(e) => setConectividad(e.target.value)} type="text" className="form-control" placeholder="Ingresa la conectividad"></input>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Switch') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Números de puertos</label>
                            <input value={numPuertos} onChange={(e) => setnumPuertos(e.target.value)} type="number" className="form-control"  placeholder="Ingresa los números de puertos"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Velocidad</label>
                            <input value={velocidad_backplane} onChange={(e) => setVelocidadBlackplane(e.target.value)} type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa la velocidad' />
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de switch</label>
                            <input value={tipoSwitch} onChange={(e) => settipoSwitch(e.target.value)} type="text" className="form-control" placeholder="Ingresa el tipo de switch"></input>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Router') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de conexión</label>
                            <input value={tipo_conexion} onChange={(e) => settipo_conexion(e.target.value)} type="text" className="form-control" placeholder="Ingresa el tipo de conexión"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            {/* (SI O NO) */}
                            <label htmlFor="inputText" className="form-label">Soporte VPN</label>
                            <select className="form-select" value={soporte_vpn} onChange={(e) => setsoporte_vpn(e.target.value)}>
                                {soportes_vpn.map((sop, index) => (
                                    <option key={index} value={sop} > {sop} </option>
                                ))}
                            </select>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Números de interfases Giga fast</label>
                            <input value={numGigFas} onChange={(e) => setnumGigFas(e.target.value)} type="number" className="form-control"  placeholder="Ingresa los números de interfases Giga fast"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Números de Seriales</label>
                            <input value={numSeriales} onChange={(e) => setnumSeriales(e.target.value)} type="number" className="form-control"  placeholder="Ingresa los números de seriales"></input>
                        </div>
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Frecuencia ruta</label>
                            <input value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)} type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa la frecuencia ruta' />
                        </div>
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Protocolos ruta</label>
                            <input value={protocolos} onChange={(e) => setProtocolos(e.target.value)} type="text" className="form-control" placeholder="Ingresa los protocolos ruta"></input>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Switch' || radioCheckEquipo === 'Router') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Capacidad</label>
                            <input value={capacidad} onChange={(e) => setCapacidad(e.target.value)} type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa la capacidad' />
                        </div>
                        <div className="EquipoBodega-column">
                            <label for="decimalInput" className="form-label">Consumo de energía</label>
                            <input value={consEnergia} onChange={(e) => setconsEnergia(e.target.value)} type="number" className="form-control" id="decimalInput" name="decimalInput" step="0.01" placeholder='Ingresa el consumo de energía' />
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Escaner') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Tipo de Escaner</label>
                            <select className="form-select" value={tipoEscaner} onChange={(e) => settipoEscaner(e.target.value)}>
                                {tipoEscaners.map((tesc, index) => (
                                    <option value={tesc.id_tipoEscaner} key={tesc.id_tipoEscaner} >{tesc.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {(radioCheckEquipo === 'Impresora' || radioCheckEquipo === 'Escaner') && (
                    <div className="EquipoBodega-form-columns">
                        <div className="EquipoBodega-column">
                            <label htmlFor="inputText" className="form-label">Velocidad</label>
                            <input value={velocidad} onChange={(e) => setVelocidad(e.target.value)} type="text" className="form-control" placeholder="Ingresa la velocidad"></input>
                        </div>
                    </div>
                )}

                <div className="d-grid gap-2">
                    <button className='color-boton-azul submit-btn color-blanco margin-top-btn-listo' type="submit" onClick={handleListo}>Listo</button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Puertos</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3 scrollablediv">
                                            <button className="custom-buttonEB"onClick={handleExpandG}>Gigabit Ethernet</button>
                                            {expandedG && (
                                                <div className="scrollable">
                                                    {gigas.map((giga) => (
                                                        <div className='form-check' key={giga.id_nombre_puerto}>
                                                            <input
                                                                type="checkbox" className='form-check-input'
                                                                value={giga.id_nombre_puerto} 
                                                                checked={gigasSelected.includes(giga.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeGigas(giga.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={giga.id_nombre_puerto}>{giga.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="custom-buttonEB" onClick={handleExpandF}>Fast Ethernet</button>
                                            {expandedF && (
                                                <div className="scrollable">
                                                    {fasts.map((fast) => (
                                                        <div className='form-check' key={fast.id_nombre_puerto}>
                                                            <input
                                                                type="checkbox" className='form-check-input'
                                                                value={fast.id_nombre_puerto}
                                                                checked={fastsSelected.includes(fast.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeFast(fast.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={fast.id_nombre_puerto}>{fast.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <button className="custom-buttonEB" onClick={handleExpandC}>Consola - RS-232</button>
                                            {expandedC && (
                                                <div className="scrollable">
                                                    {consolas.map((consola) => (
                                                        <div className='form-check' key={consola.id_nombre_puerto}>
                                                            <input
                                                                type="checkbox" className='form-check-input'
                                                                value={consola.id_nombre_puerto} 
                                                                checked={consolasSelected.includes(consola.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeConsolas(consola.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={consola.id_nombre_puerto}>{consola.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="custom-buttonEB" onClick={handleExpandU2}>USB 2.0</button>
                                            {expandedU2 && (
                                                <div className="scrollable">
                                                    {usbs2.map((usb2) => (
                                                        <div className='form-check' key={usb2.id_nombre_puerto}>
                                                            <input 
                                                                type="checkbox" className='form-check-input'
                                                                value={usb2.id_nombre_puerto} 
                                                                checked={usbs2Selected.includes(usb2.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeUsbs2(usb2.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={usb2.id_nombre_puerto}>{usb2.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="custom-buttonEB" onClick={handleExpandU3}>USB 3.0</button>
                                            {expandedU3 && (
                                                <div className="scrollable">
                                                    {usbs3.map((usb3) => (
                                                        <div className='form-check' key={usb3.id_nombre_puerto}>
                                                            <input 
                                                                type="checkbox" className='form-check-input' 
                                                                value={usb3.id_nombre_puerto} 
                                                                checked={usbs3Selected.includes(usb3.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeUsbs3(usb3.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={usb3.id_nombre_puerto}>{usb3.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="custom-buttonEB" onClick={handleExpandH}>HDMI</button>
                                            {expandedH && (
                                                <div className="scrollable">
                                                    {hdmis.map((hdmi) => (
                                                        <div className='form-check' key={hdmi.id_nombre_puerto}>
                                                            <input 
                                                                type="checkbox" className='form-check-input' 
                                                                value={hdmi.id_nombre_puerto} 
                                                                checked={hdmisSelected.includes(hdmi.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeHdmis(hdmi.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={hdmi.id_nombre_puerto}>{hdmi.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="custom-buttonEB" onClick={handleExpandV}>VGA</button>
                                            {expandedV && (
                                                <div className="scrollable">
                                                    {vgas.map((vga) => (
                                                        <div className='form-check' key={vga.id_nombre_puerto}>
                                                            <input 
                                                                type="checkbox" className='form-check-input' 
                                                                value={vga.id_nombre_puerto} 
                                                                checked={vgasSelected.includes(vga.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeVgas(vga.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={vga.id_nombre_puerto}>{vga.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="custom-buttonEB" onClick={handleExpandR}>RJ45</button>
                                            {expandedR && (
                                                <div className="scrollable">
                                                    {rjs.map((rj) => (
                                                        <div className='form-check' key={rj.id_nombre_puerto}>
                                                            <input 
                                                                type="checkbox" className='form-check-input' 
                                                                value={rj.id_nombre_puerto} 
                                                                checked={rjsSelected.includes(rj.id_nombre_puerto)}
                                                                onChange={() => handleCheckboxChangeRjs(rj.id_nombre_puerto)}
                                                            />
                                                            <label className="form-check-label" htmlFor={rj.id_nombre_puerto}>{rj.nombre_puerto}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </form>
    );
}