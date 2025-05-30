import './Principal_administrador.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from 'react';

// Add these functions near your other handler functions (like handleEquipo, handleEquipodeIncidencia, etc.)


export const Principal_otro = () => {
    
    const handleGuardarSolucion = async () => {
        try {
            const response = await axios.post('http://localhost:3000/GuardarSolucion', {
                id_incidencia: id_incidencia,
                solucion: solucionPersonalizada
            });
    
            if (response.status === 200) {
                alert('Solución guardada correctamente');
            } else {
                alert('Error al guardar la solución');
            }
        } catch (error) {
            console.error('Error al guardar la solución:', error);
            alert('Error al guardar la solución');
        }
    };
    const [otroDiagnostico, setOtroDiagnostico] = useState(''); 
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [contrasenia, setContrasenia] = useState('');
    const [permisos, setPermisos] = useState('');
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [showModal7, setShowModal7] = useState(false);
    const [folios, setFolios] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [estados, setEstados] = useState([]);
    const [colores, setColores] = useState([]);
    const [selectedIncidencia, setSelectedIncidencia] = useState(null);
    const [especializaciones, setEspecializaciones] = useState([]);
    const [especializacion, setEspecializacion] = useState('');
    const [tecnicoId, setTecnicoId] = useState([]);
    const [tecnico, setTecnico] = useState('');
    const [tecnicoNom, setTecnicoNom] = useState('');
    const [tecnicos, setTecnicos] = useState([]);
    const [hrEnvio, setHrEnvio] = useState('');
    const [hrInicio, setHrInicio] = useState('');
    const [hrFin, setHrFin] = useState('');
    const [nomPrioridad, setNombrePrioridad] = useState('');
    const [descPrioridad, setDescPrioridad] = useState('');
    const [nomEspacio, setNomEspacio] = useState('');
    const [ubiEspacio, setUbiEspacio] = useState('');
    const [ubiEdificio, setUbiEdificio] = useState('');
    const [nomEdificio, setNomEdificio] = useState('');
    const [responsable, setResponsable] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoIncidencia, setTipoIncidencia] = useState('');
    const [estado, setEstado] = useState('');
    const [id_incidencia, setId_incidencia] = useState('');
    const [prioridades, setPrioridades] = useState([]);
    const [prioridad, setPrioridad] = useState('');
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showPiezas, setShowPiezas] = useState(false);
    const [diags, setDiags] = useState([]);
    const [diag, setDiag] = useState('');
    const [softwares, setSoftwares] = useState([]);
    const [softwaresSelected, setSoftwaresSelected] = useState([]);
    const [piezas, setPiezas] = useState([]);
    const [pieza, setPieza] = useState('');
    const [btnDiag, setBtnDiag] = useState('');
    const [autorizar, setAutorizar] = useState([]);
    const [autorizados, setAutorizados] = useState([]);
    const [btnAutorizaciones, setBtnAutorizaciones] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [servicio, setServicio] = useState('');
    const [autorizado, setAutorizado] = useState('');
    const [autoriza, setAutoriza] = useState('');
    const [sers, setSers] = useState([]);
    const [ser, setSer] = useState('');
    const [btnAcyRe, setBtnAcyRe] = useState(true);
    const [horaIncial, setHoraInicial] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [tiempoMinutos, setTiempoMinutos] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);
    const [detalleHora, setDetalleHora] = useState('');
    const [servicioDuracion, setServicioDuracion] = useState(null);
    const [infoPieza, setInfoPieza] = useState('');
    const [showModal8, setShowModal8] = useState(false);
    const [causas, setCausas] = useState([]);
    const [causa, setCausa] = useState('');
    const [errorEncontrado, setErrorEncontrado] = useState('');
    const [erroresConocidos, setErroresConocidos] = useState([]);
    const [errorConocido, setErrorConocido] = useState('');
    const [eC, setEC] = useState('');
    const [eI, setEI] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [expandedL, setExpandedL] = useState(false);
    const [idDiag, setIdDiag] = useState('');
    const [diagNom, setDiagNom] = useState('');
    const [idPza, setIdPza] = useState('');
    const [pzaNom, setPzaNom] = useState('');
    const [serNom, setSerNom] = useState('');
    const [idSer, setIdSer] = useState('');
    const [serDur, setSerDur] = useState('');
    const [idEr, setIdEr] = useState('');
    const [erDes, serErDes] = useState('');
    const [idCau, serIdCau] = useState('');
    const [caunom, setCauNom] = useState('');
    const [cauDes, setCauDes] = useState('');
    const [btnAutorizacion, setBtnAutorizacion] = useState('');
    const [det, setDet] = useState('');
    const [solucionPersonalizada, setSolucionPersonalizada] = useState('');


    const handleRatingClick = (value) => {
        setSelectedRating(value);
    };
    
    const [equipo, setEquipo] = useState({
        tipo: '', // Inicializa como string vacío
        equipo: {},
        detalles: {}, // Inicializa como objeto vacío
        softwares: [] // Inicializa como array vacío
    });

    useEffect(() => {
        const storedPermisos = localStorage.getItem('permisos');
        if (storedPermisos) {
            setPermisos(storedPermisos); // Actualiza el estado permisos
        }
        handleDetalleTabla(storedPermisos); // Pasas la variable local solo al cargar
    }, [softwaresSelected]);

    const handleTodos = () => {
        handleDetalleTabla(permisos);
    };

    const handleEnviados = () => {
        handleDetalleTablaEnviados(permisos);
    };

    const handleEnProceso = () => {
        handleDetalleTablaEnProceso(permisos);
    };

    const handleTerminados = () => {
        handleDetalleTablaTerminados(permisos);
    };

    const handleLiberados = () => {
        handleDetalleTablaLiberados(permisos);
    };

    const handleRechazados = () => {
        handleDetalleTablaRechazados(permisos);
    };


    const handleDetalleTablaRechazados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONRechazados');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoRechazados',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio)
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }
            else if(permisos === '4' || permisos === '5'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoRechazados',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
                const autorizarA = detalles.map(d => d.autoriza);
                const autorizadosA = detalles.map(d => d.autorizado);
                const sersA = detalles.map(d => d.servicio);
                const dH = detalles.map(d => d.detalleHora);
                const auto = detalles.map(d => d.btnAutorizacion);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                    tipoIncidencia: tipo, 
                    descripcion: descripcionesA[index] 
                })));
                setEstados(estadosA);
                setColores(coloresA);
                setAutorizar(autorizarA);
                setAutorizados(autorizadosA);
                setSers(sersA);
                setDetalleHora(dH);
                setBtnAutorizaciones(auto);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const handleDetalleTablaTerminados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONTerminados');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoTerminados',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }
            else if(permisos === '4' || permisos === '5'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoTerminados',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
                const autorizarA = detalles.map(d => d.autoriza);
                const autorizadosA = detalles.map(d => d.autorizado);
                const sersA = detalles.map(d => d.servicio);
                const dH = detalles.map(d => d.detalleHora);
                const auto = detalles.map(d => d.btnAutorizacion);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                    tipoIncidencia: tipo, 
                    descripcion: descripcionesA[index] 
                })));
                setEstados(estadosA);
                setColores(coloresA);
                setAutorizar(autorizarA);
                setAutorizados(autorizadosA);
                setSers(sersA);
                setDetalleHora(dH);
                setBtnAutorizaciones(auto);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const handleDetalleTablaLiberados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONLiberados');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoLiberados',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }
            else if(permisos === '4' || permisos === '5'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoLiberados',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
                const autorizarA = detalles.map(d => d.autoriza);
                const autorizadosA = detalles.map(d => d.autorizado);
                const sersA = detalles.map(d => d.servicio);
                const dH = detalles.map(d => d.detalleHora);
                const auto = detalles.map(d => d.btnAutorizacion);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                    tipoIncidencia: tipo, 
                    descripcion: descripcionesA[index] 
                })));
                setEstados(estadosA);
                setColores(coloresA);
                setAutorizar(autorizarA);
                setAutorizados(autorizadosA);
                setSers(sersA);
                setDetalleHora(dH);
                setBtnAutorizaciones(auto);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const handleDetalleTablaEnProceso = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONEnProceso');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoEnProceso',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }
            else if(permisos === '4' || permisos === '5'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoEnProceso',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
                const autorizarA = detalles.map(d => d.autoriza);
                const autorizadosA = detalles.map(d => d.autorizado);
                const sersA = detalles.map(d => d.servicio);
                const dH = detalles.map(d => d.detalleHora);
                const auto = detalles.map(d => d.btnAutorizacion);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                    tipoIncidencia: tipo, 
                    descripcion: descripcionesA[index] 
                })));
                setEstados(estadosA);
                setColores(coloresA);
                setAutorizar(autorizarA);
                setAutorizados(autorizadosA);
                setSers(sersA);
                setDetalleHora(dH);
                setBtnAutorizaciones(auto);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const handleDetalleTablaEnviados = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMONEnviado');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoEnviado',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    })));
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }
            else if(permisos === '4' || permisos === '5'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnicoEnviado',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
                const autorizarA = detalles.map(d => d.autoriza);
                const autorizadosA = detalles.map(d => d.autorizado);
                const sersA = detalles.map(d => d.servicio);
                const dH = detalles.map(d => d.detalleHora);
                const auto = detalles.map(d => d.btnAutorizacion);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(tiposIncidenciaA.map((tipo, index) => ({ 
                    tipoIncidencia: tipo, 
                    descripcion: descripcionesA[index] 
                })));
                setEstados(estadosA);
                setColores(coloresA);
                setAutorizar(autorizarA);
                setAutorizados(autorizadosA);
                setSers(sersA);
                setDetalleHora(dH);
                setBtnAutorizaciones(auto);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const handleDetalleTabla = async (permisos) => {
        const id_departamento = localStorage.getItem('idDepartamentoPertenece');
        const id_usuario = localStorage.getItem('idUsuario');
        try{
            if(permisos === '1'){
                const response = await axios.get('http://localhost:3000/DetalleTablaADMON');
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    });
                    const departamentosA = detalles.map(d => d.nombre);
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDepartamentos(departamentosA);
                    setDetalles(prevDetalles => [
                        ...prevDetalles, 
                        ...tiposIncidenciaA.map((tipo, index) => ({ 
                            tipoIncidencia: tipo, 
                            descripcion: descripcionesA[index] 
                        }))
                    ]);
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }else if(permisos === '2' || permisos === '3'){
                const response = await axios.get('http://localhost:3000/DetalleTablaDepartamento',
                    {params: { id_departamento: id_departamento }}
                );
                const detalles = response.data;
                if (detalles.length > 0) {
                    const foliosA = detalles.map(d => d.id_incidencia);
                    const fechasA = detalles.map(d => {
                        const date = new Date(d.fecha);
                        const year = date.getUTCFullYear();
                        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const day = String(date.getUTCDate()).padStart(2, '0');
                        return `${day}-${month}-${year}`;
                    });
                    const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                    const descripcionesA = detalles.map(d => d.descripcion);
                    const estadosA = detalles.map(d => d.estado);
                    const coloresA = detalles.map(d => d.color);
                    const autorizarA = detalles.map(d => d.autoriza);
                    const autorizadosA = detalles.map(d => d.autorizado);
                    const sersA = detalles.map(d => d.servicio);
                    const dH = detalles.map(d => d.detalleHora);
                    const auto = detalles.map(d => d.btnAutorizacion);
        
                    setFolios(foliosA);
                    setFechas(fechasA);
                    setDetalles(prevDetalles => [
                        ...prevDetalles, 
                        ...tiposIncidenciaA.map((tipo, index) => ({ 
                            tipoIncidencia: tipo, 
                            descripcion: descripcionesA[index] 
                        }))
                    ]);
                    setEstados(estadosA);
                    setColores(coloresA);
                    setAutorizar(autorizarA);
                    setAutorizados(autorizadosA);
                    setSers(sersA);
                    setDetalleHora(dH);
                    setBtnAutorizaciones(auto);
                }
            }
            else if(permisos === '4' || permisos === '5'){
                const response = await axios.get('http://localhost:3000/DetalleTablaTecnico',
                    {params: { id_usuario: id_usuario }}
                );
                const detalles = response.data;
            if (detalles.length > 0) {
                const foliosA = detalles.map(d => d.id_incidencia);
                const fechasA = detalles.map(d => {
                    const date = new Date(d.fecha);
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                });
                const departamentosA = detalles.map(d => d.nombre);
                const tiposIncidenciaA = detalles.map(d => d.nombreIncidencia);
                const descripcionesA = detalles.map(d => d.descripcion);
                const estadosA = detalles.map(d => d.estado);
                const coloresA = detalles.map(d => d.color);
                const autorizarA = detalles.map(d => d.autoriza);
                const autorizadosA = detalles.map(d => d.autorizado);
                const sersA = detalles.map(d => d.servicio);
                const dH = detalles.map(d => d.detalleHora);
                const auto = detalles.map(d => d.btnAutorizacion);
    
                setFolios(foliosA);
                setFechas(fechasA);
                setDepartamentos(departamentosA);
                setDetalles(prevDetalles => [
                    ...prevDetalles, 
                    ...tiposIncidenciaA.map((tipo, index) => ({ 
                        tipoIncidencia: tipo, 
                        descripcion: descripcionesA[index] 
                    }))
                ]);
                setEstados(estadosA);
                setColores(coloresA);
                setAutorizar(autorizarA);
                setAutorizados(autorizadosA);
                setSers(sersA);
                setDetalleHora(dH);
                setBtnAutorizaciones(auto);
                }
            }
        }catch(error){
            console.error('Error al obtener los tipos de incidencias', error);
        }
    };

    const selectEspecializaciones = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectEspecializaciones');
            setEspecializaciones(response.data);
            setEspecializacion(response.data[0].id_especializacion);
            selectPrioridad(response.data[0].id_prioridad);
            selectTecnicos(response.data[0].id_especializacion);
        }catch(error){
            console.error('Error al obtener las especializaciones', error);
        }
    }

    const selectPrioridad = async () => {
        try{
            const response = await axios.get('http://localhost:3000/Prioridad');
            setPrioridades(response.data);
            setPrioridad(response.data[0].id_prioridad);
        }catch(error){
            console.error('Error al obtener las prioridades', error);
        }
    }

    const handleEspecializacionChange = (e) => {
        const idEspecializacion = e.target.value;
        setEspecializacion(idEspecializacion);
        selectTecnicos(idEspecializacion);
    }

    const selectTecnicos = async (idEspecializacion) => {
        try{
            const response = await axios.get('http://localhost:3000/SelectTecnicos',{
                params: {id_especializacion: idEspecializacion}
            });
            setTecnicos(response.data);
            if (response.data.length > 0) {
                setTecnico(response.data[0].id_usuario);
            } else {
                alert('No hay técnicos disponibles para esta especialización.');
            }
        }catch(error){
            console.error('Error al obtener los tecnicos', error);
        }
    }

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/Principal');
    };

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('idDepartamentoPertenece');
        localStorage.removeItem('permisos');
        navigate('/Login');
    };

    const handleChangePasswordClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleValidar = (e) => {
        e.preventDefault();
        if(!contrasenia){
            alert('Necesita escribir una contraseña');
            return;
        }
        handleGuardarCambios();
    };

    const handleGuardarCambios = async() => {
        const idUsuario = localStorage.getItem('idUsuario');
        alert(`El id del usuario si llego a lo de la contra, es ${idUsuario}`);
        console.log('ID de Usuario:', idUsuario);
        try {
            const response = await axios.put('http://localhost:3000/CambiarContrasenia', {idUsuario, contrasenia});
            if (response.status === 200) {
                alert('Contraseña cambiada exitosamente');
                setShowModal(false);
            } else {
                alert('No se pudo cambiar la contraseña. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Hubo un error al cambiar la contraseña');
        }
    };

    const handleEquipo = () => {
        navigate('/EquipoBodega');
    };
    const handleEquipodeIncidencia = () => {
        navigate('/EquipodeIncidencia');
    };

    const handleOrdenTrabajo = (incidencia) => {
        setSelectedIncidencia(incidencia);
        selectEspecializaciones();
        selectErroresConocidos();
        setShowModal2(true);
    };
    
    const handleCloseModal2 = () => {
        setShowModal2(false);
        handleDetalleTabla(permisos);
    };
    
    const handleEnviar = async () => {
        // Verificar si los campos esenciales están completos
        if (!especializacion || !tecnico) {
            alert('Complete los espacios en blanco');
            return;
        } else {
            try {
                // Si errorConocido está vacío, realizar la solicitud sin el parámetro de errorConocido
                if (!errorConocido) {
                    const response = await axios.put('http://localhost:3000/AsignarTecnico', {
                        id_incidencia: selectedIncidencia.id_incidencia,
                        id_usuario: tecnico,
                        id_prioridad: prioridad
                    });
                    alert('Técnico asignado exitosamente');
                }
                // Si errorConocido tiene un valor, incluirlo en la solicitud
                else {
                    const response = await axios.put('http://localhost:3000/AsignarTecnicoError', {
                        id_incidencia: selectedIncidencia.id_incidencia,
                        id_usuario: tecnico,
                        id_prioridad: prioridad,
                        id_error: errorConocido // Incluir errorConocido
                    });
                    alert('Técnico asignado con error conocido exitosamente');
                }
            } catch (error) {
                alert('Hubo un problema al asignar al técnico');
                console.error(error.message);
            }
            handleCloseModal2();
        }
    };

    const handleCloseModal3 = () => {
        setShowModal3(false);
        handleDetalleTabla(permisos);
    };
    
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handlePieza = async (incidencia) => {
        try {
            const response = await axios.post('http://localhost:3000/TraerInfoPieza',{
                id_incidencia: incidencia,
            })
            setInfoPieza(response.data.nombre);
        } catch (error) {
            alert('Hubo un problema al traer la info de pieza');
            console.error(error.message);
        }

    }

    const handleRechazarIncidencia = async (incidencia) => {
        try {
            const response = await axios.put('http://localhost:3000/RechazarIncidencia',{
                id_incidencia: incidencia,
            })
            alert('Incidencia Rechazada exitosamente');
        } catch (error) {
            alert('Hubo un problema al rechazar la incidencia');
            console.error(error.message);
        }
        setBtnAcyRe(false);
        handleDetalleTabla(permisos);
    }
    
    const handleAceptarIncidencia = async (incidencia) => {
        try {
            const response = await axios.put('http://localhost:3000/AceptarIncidencia',{
                id_incidencia: incidencia,
            })
            alert('Incidencia aceptada exitosamente');
            setBtnAcyRe(false);
        } catch (error) {
            alert('Hubo un problema al aceptar la incidencia');
            console.error(error.message);
        }
        handleDetalleTabla(permisos);
    }
    
    const handleLiberarIncidencia = async (incidencia) => {
        try {
            setId_incidencia(incidencia);
            const resp = await axios.post('http://localhost:3000/Horas', {
                id_incidencia: incidencia
            })

            const horaInicial = resp.data.hora_inicial ? formatTime(resp.data.hora_inicial) : "";
            const horaFinal = resp.data.hora_final ? formatTime(resp.data.hora_final) : "";

            setHoraInicial(horaInicial);
            setHoraFinal(horaFinal);
            setTiempoMinutos(resp.data.duracion_minutos);

            const tec = await axios.post('http://localhost:3000/TecnicoIncidencia', {
                id_incidencia: incidencia
            })

            setTecnicoId(tec.data.tecnico);
            setTecnicoNom(tec.data.nombre);

            const r = await axios.post('http://localhost:3000/DuracionServicio',{
                id_incidencia: incidencia
            })
            setServicioDuracion(r.data.duracion);


            const response = await axios.put('http://localhost:3000/LiberarIncidencia',{
                id_incidencia: incidencia
            });
            alert('Incidencia Liberada exitosamente');
        } catch (error) {
            alert('Hubo un problema al liberar la incidencia');
            console.error(error.message);
        }
        setShowModal7(true);
    }

    const handleCloseModal7 = () => {
        setShowModal7(false);
        handleDetalleTabla(permisos);
    };

    const handleCalificar = async () => {
        try {
            const response = await axios.put('http://localhost:3000/CalificarIncidencia', {
                id_incidencia: id_incidencia,
                selectedRating: selectedRating
            })
            alert('Incidencia Finalizada exitosamente');
        } catch (error) {
            alert('Hubo un problema al finalizar la incidencia');
            console.error(error.message);
        }
        setShowModal7(false);
        handleDetalleTabla(permisos);
    }

    const selectTecnico = async (incidencia) => {
        try {
            const tec = await axios.post('http://localhost:3000/TecnicoIncidencia', {
                id_incidencia: incidencia
            })

            setTecnicoId(tec.data.tecnico);
            setTecnicoNom(tec.data.nombre);

        } catch (error) {
            alert('Hubo un problema al traer el tecnico');
            console.error(error.message);
        }
    }

    const handleFinalizar = async  () => {
        try {
            const hora_final = obtenerHoraActual();
            const response = await axios.put('http://localhost:3000/FinalizarIncidencia', {
                id_incidencia: id_incidencia,
                hora_final: hora_final
            })
            alert('Incidencia Finalizada exitosamente');
        } catch (error) {
            alert('Hubo un problema al finalizar la incidencia');
            console.error(error.message);
        }
        handleCloseModal6();
        handleCloseModal3();
        handleDetalleTabla(permisos);
    }
    
    const obtenerHoraActual = () => {
        const now = new Date();
        const horas = now.getHours().toString().padStart(2, '0');
        const minutos = now.getMinutes().toString().padStart(2, '0');
        const segundos = now.getSeconds().toString().padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`; 
    };

    const handleRegistrar = async () => {
        try {
            const hora_inicial = obtenerHoraActual();
            const pza = await axios.post('http://localhost:3000/pieza', {
                id_incidencia: id_incidencia
            })
            const response = await axios.put('http://localhost:3000/RegistrarServicio', {
                id_incidencia: id_incidencia,
                pieza: pza.data[0].id_pieza,
                servicio: servicio,
                hora_inicial: hora_inicial
            })
            alert('Incidencia registrada exitosamente');
            setShowModal6(false);
            handleDetalleTabla(permisos);
        } catch (error) {
            alert('Hubo un problema al registrar el servicio');
            console.error(error.message);
        }
    }

    const handleDiagnostico = () => {
        setShowModal3(false);
        if(permisos === '5'){
            handleProcesoPrevio();
        }
        selectDiagnostico();
        selectPieza();
        setShowModal5(true);
    }

    const handleCloseModal5 = () => {
        setShowModal5(false);
        setShowPiezas(false);
    };

    const handleProcesoPrevio = () => {
        selectCausas();
        setShowModal8(true);
    }

    const selectServicios = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectServicios');
            setServicios(response.data);
        }catch(error){
            console.error('Error al obtener los servicios', error);
        }
    }

    const handleDetallesServicios = async (incidencia) => {
        try {
            const response = await axios.get('http://localhost:3000/DetalleIncidencia',{
                params: {id_incidencia: incidencia.id_incidencia}
            })
            
            selectTecnico(incidencia.id_incidencia);

            const detalle = response.data;
                if (detalle) {
                    setFecha(incidencia.fecha)
                    setTipoIncidencia(incidencia.tipoIncidencia);
                    setDescripcion(incidencia.descripcion);
                    setHrEnvio(formatTime(detalle.hora_envio));
                    setHrInicio(formatTime(detalle.hora_disponible_inicio));
                    setHrFin(formatTime(detalle.hora_disponible_fin));
                    setNombrePrioridad(detalle.nombre_prioridad);
                    setDescPrioridad(detalle.descripcion_prioridad);
                    setNomEspacio(detalle.nombre_espacio);
                    setUbiEspacio(detalle.ubicacion_esp);
                    setUbiEdificio(detalle.ubicacion_edificio);
                    setResponsable(detalle.responsable);
                    setNomEdificio(detalle.nombre_edificio);
                    setEstado(incidencia.estado);
                    setId_incidencia(detalle.id_incidencia);
                    setAutorizado(incidencia.autorizado);
                    selectServicios();
                    setShowModal6(true);
                    setSer(incidencia.serv);
                }
                handlePieza(incidencia.id_incidencia);
        } catch (error) {
            alert('Hubo un problema traer el detalle de la incidencia');
                console.error(error.message);
        }
    };

    const handleCloseModal6 = () => {
        setShowModal6(false);
        handleDetalleTabla(permisos);
    };

    const selectDiagnostico = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectDiagnostico');
            setDiags(response.data);
        }catch(error){
            console.error('Error al obtener los diagnosticos', error);
        }
    }

    const handleCheckboxChange = (id) => {
        setSoftwaresSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Si ya está seleccionado, lo quitamos
                return prevSelected.filter((selectedId) => selectedId !== id);
            } else {
                // Si no está seleccionado, lo agregamos
                return [...prevSelected, id];
            }
        });
    };

    const selectSoftwares = async () => {
        try {
            const idEquipo = await axios.get(`http://localhost:3000/SelectEquipoDeIncidencia`, {
                params: {
                    id_incidencia: id_incidencia
                }
            });
            const response = await axios.post('http://localhost:3000/SelectSoftwares2', {
                id_incidencia: id_incidencia,
                id_equipo: idEquipo.data[0].id_equipo
            });
            setSoftwares(response.data);
        } catch (error) {
            console.error('Error al obtener los softwares', error);
        }
    };

    const handleDiagChange = async (e) => {
        const selectedDiag = e.target.value;
        setDiag(selectedDiag);
    
        if (selectedDiag === '3') {
            selectSoftwares();
        }
    };

    
    const handleListaProblemas = (e) => {
        e.preventDefault();
        navigate('/problemas');
    };
    
    const handleAsociarProblemas = (e) => {
        e.preventDefault();
        navigate('/asociar-problemas');
    };
    const handleGuardarDiagnostico = async () => {
        try {
            const tIncidencia = await axios.post(`http://localhost:3000/tIncidencia`, {
                id_incidencia: id_incidencia
            });
    
            const tipoIncidencia = tIncidencia.data[0].id_tipoIncidencia;
    
            if (diag === '3') {
                const idEquipo = await axios.get(`http://localhost:3000/SelectEquipoDeIncidencia`, {
                    params: {
                        id_incidencia: id_incidencia
                    }
                });
    
                await axios.post('http://localhost:3000/GuardarDiagnosticoSoftware', {
                    id_incidencia: id_incidencia,
                    id_equipo: idEquipo.data[0].id_equipo,
                    softwares: softwaresSelected,
                    diag: diag,
                    tipoIncidencia: tipoIncidencia
                });
            }else if (diag === 'otro') {
            // Handle "otro" case with the description
            await axios.post('http://localhost:3000/GuardarDiagnostico', {
                id_incidencia: id_incidencia,
                diag: diag,
                tipoIncidencia: tipoIncidencia,
                otroDiagnostico: otroDiagnostico  // Pass the custom diagnosis
            });
         }  
             else {
                await axios.post('http://localhost:3000/GuardarDiagnostico', {
                    id_incidencia: id_incidencia,
                    diag: diag,
                    tipoIncidencia: tipoIncidencia
                });
            }
            console.log("Cambios guardados correctamente");
            alert('Incidencia terminada, esperar a que sea liberada');
            handleDetalleTabla(permisos);
            handleCloseModal5();
        } catch (error) {
            console.error("Error al guardar los cambios", error);
        }
    };

    //----------------- DETALLE EQUIPO
    const handleDetalleEquipo = async () => {
        try{
            const idEquipo = await axios.get(`http://localhost:3000/SelectEquipoDeIncidencia`,{
                params: {
                    id_incidencia: id_incidencia // Pasar id_incidencia como query param
                }
            }) // Obtener el id_equipo desde data-id-equipo
            //setIdEquipo(idEquipo);
            detalleEquipo(idEquipo.data[0].id_equipo); // Pasar el idEquipo correctamente
            setShowModal4(true);
        } catch (err) {
            setEquipo([]);
            alert('Error al obtener el equipo que se esta atendiendo en la incidencia');
            console.error(err);
        }
    };

    const handleCloseModal4 = () => {
        setShowModal4(false);
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
    // ----------- TERMINA DETALLE EQUIPO

    const selectPieza = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectPieza');
            setPiezas(response.data);
        }catch(error){
            console.error('Error al obtener las piezas', error);
        }
    }

    const handleGuardarRFC = async() => {
        try{
            const tIncidencia = await axios.post(`http://localhost:3000/tIncidencia`, {
                id_incidencia: id_incidencia
            });
    
            const tipoIncidencia = tIncidencia.data[0].id_tipoIncidencia;

            const idEquipo = await axios.get(`http://localhost:3000/SelectEquipoDeIncidencia`, {
                params: {
                    id_incidencia: id_incidencia
                }
            });

            const response = await axios.post(`http://localhost:3000/GuardarRFC`, {
                id_incidencia: id_incidencia,
                pieza: pieza,
                diag: diag,
                tipoIncidencia: tipoIncidencia,
                id_equipo: idEquipo.data[0].id_equipo
            });
            alert('Guardado exitosamente. Debe esperar la autorización');
            handleDetalleTabla(permisos);
            setShowModal5(false);
        }catch(err){
            console.error('Error guardar el RFC', err);
        }
    }

    const handleAgregarProblema = async() => {
        try {
            const response = await axios.put('http://localhost:3000/AgregarProblema', {
                id_incidencia: id_incidencia
            });
            alert('Se asignó el problema');
            setShowModal6(false);
            setShowModal3(false);
            setBtnAcyRe(false);
            handleDetalleTabla(permisos);
        } catch (error) {
            console.error('Error guardar el problema', error);
        }
    }

    const handleErrorCausa = async () => {
        try {
            const response = await axios.post('http://localhost:3000/AltaError', {
                id_incidencia: id_incidencia, causa: causa, errorEncontrado
            });
            alert('Se dió de alta el error');
            setShowModal8(false);
        } catch (error) {
            console.error('Error al dar de alta el error', error);
        }
    };

    const handleCloseModal8 = () => {
        setShowModal8(false);
        handleDiagnostico();
    };

    const selectCausas = async () => {
        try{
            const response = await axios.get('http://localhost:3000/SelectCausa');
            setCausas(response.data);
        }catch(error){
            console.error('Error al obtener las causas', error);
        }
    }

    const handleDetalles = async (incidencia) => {
        try {
            // Solicitar detalle de la incidencia
            const detalleResponse = await axios.get('http://localhost:3000/DetalleIncidencia', {
                params: { id_incidencia: incidencia.id_incidencia }
            });
    
            const detalle = detalleResponse.data;

            selectTecnico(incidencia.id_incidencia);

            if (detalle) {
                setFecha(incidencia.fecha);
                setTipoIncidencia(incidencia.tipoIncidencia);
                setDescripcion(incidencia.descripcion);
                setHrEnvio(formatTime(detalle.hora_envio));
                setHrInicio(formatTime(detalle.hora_disponible_inicio));
                setHrFin(formatTime(detalle.hora_disponible_fin));
                setNombrePrioridad(detalle.nombre_prioridad);
                setDescPrioridad(detalle.descripcion_prioridad);
                setNomEspacio(detalle.nombre_espacio);
                setUbiEspacio(detalle.ubicacion_esp);
                setUbiEdificio(detalle.ubicacion_edificio);
                setResponsable(detalle.responsable);
                setNomEdificio(detalle.nombre_edificio);
                setEstado(incidencia.estado);
                setId_incidencia(detalle.id_incidencia);
                setAutorizado(incidencia.autorizado);
                setAutoriza(incidencia.autoriza);
                setShowModal3(true);
            }
    
            handlePieza(incidencia.id_incidencia);
    
            // Realizar múltiples solicitudes en paralelo
            const [btnDiagRes, btnAutorizacionRes, errorIncidenciaRes, errorConocidoRes] = await Promise.all([
                axios.get('http://localhost:3000/btnDiag', { params: { id_incidencia: incidencia.id_incidencia } }),
                axios.get('http://localhost:3000/btnAutorizacion', { params: { id_incidencia: incidencia.id_incidencia } }),
                axios.get('http://localhost:3000/errorIncidencia', { params: { id_incidencia: incidencia.id_incidencia } }),
                axios.get('http://localhost:3000/errorConocido', { params: { id_incidencia: incidencia.id_incidencia } })
            ]);
    
            // Configurar los estados
            setBtnDiag(btnDiagRes.data.btnDiag);
            setBtnAutorizacion(btnAutorizacionRes.data.btnAutorizacion);
            setEI(errorIncidenciaRes.data.errorConocido);
            setEC(errorConocidoRes.data.eC);

            // Realizar la solicitud de solución
            const solucionResponse = await axios.post('http://localhost:3000/Solucion', {
                error_incidencia: errorIncidenciaRes.data.errorConocido
            });
    
            const solucion = solucionResponse.data;
    
            setIdDiag(solucion.diagnostico);
            setDiagNom(solucion.diagnom);
            setIdPza(solucion.pieza);
            setPzaNom(solucion.pzanom);
            setSerNom(solucion.sernom);
            setSerDur(solucion.duracion);
            setIdSer(solucion.id_servicio);
            setIdEr(solucion.id_error);
            serErDes(solucion.descripcion);
            serIdCau(solucion.id_causa_raiz);
            setCauNom(solucion.caunom);
            setCauDes(solucion.caudes);
    
        } catch (error) {
            console.error('Hubo un problema al traer el detalle de la incidencia:', error.message);
            alert('Hubo un problema traer el detalle de la incidencia');
        }
    };
    

    const selectErroresConocidos = async () => {
        try{
            const response = await axios.get('http://localhost:3000/selectErroresConocidos');
            setErroresConocidos(response.data);
            setErrorConocido('');
        }catch(error){
            console.error('Error al obtener los errores conocidos', error);
        }
    }
    const handleTodasIncidencias = (e) => {
        e.preventDefault();
        navigate('/todas-incidencias');
    };
    const handleSolucion = async (e) => {
        e.preventDefault();
        try {
            if (!expanded) {
                // Si es primera vez que se abre, intenta cargar la solución existente
                try {
                    const response = await axios.get('http://localhost:3000/ObtenerSolucion', {
                        params: { id_incidencia: id_incidencia }
                    });
                    if (response.data && response.data.solucion) {
                        setSolucionPersonalizada(response.data.solucion);
                    }
                } catch (error) {
                    console.error('Error al cargar la solución:', error);
                }
            }
            setExpanded(!expanded);
        } catch (error) {
            console.error('Error al abrir/cerrar sección de solución:', error);
        }
    };
    
    const handleLugar = async (e) => {
        e.preventDefault();
        try {
            setExpandedL(!expandedL);
            
        } catch (error) {
            console.error('Error al obtener el lugar', error);
        }
    };

    const handlePeticion = async () => {
        try {
            const tIncidencia = await axios.post(`http://localhost:3000/tIncidencia`, {
                id_incidencia: id_incidencia
            });
    
            const tipoIncidencia = tIncidencia.data[0].id_tipoIncidencia;

            const idEquipo = await axios.get(`http://localhost:3000/SelectEquipoDeIncidencia`, {
                params: {
                    id_incidencia: id_incidencia
                }
            });

            const r = await axios.post(`http://localhost:3000/GuardarRFC`, {
                id_incidencia: id_incidencia,
                pieza: idPza,
                diag: idDiag,
                tipoIncidencia: tipoIncidencia,
                id_equipo: idEquipo.data[0].id_equipo
            });

            const hora_inicial = obtenerHoraActual();

            const r1 = await axios.put('http://localhost:3000/RegistrarServicio', {
                id_incidencia: id_incidencia,
                pieza: idPza,
                servicio: idSer,
                hora_inicial: hora_inicial
            })

            const r2 = await axios.post(`http://localhost:3000/cambiarBtnAutorizacion`, {
                id_incidencia: id_incidencia
            });
             setBtnAutorizacion(r2.data.btnAutorizacion);

            alert('Petición solicitada. Debe esperar la autorización');
            handleDetalleTabla(permisos);
            setShowModal3(false);
            
        } catch (error) {
            console.error('Error al solicitar petición', error);
        }
    };
    
    return (
        <div className="principal-admin-container">
        <div className="principal-admin-buttons">
        <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Menú principal</button>
        
        {(permisos === '1' || permisos === '4') && (
            <button className="btn btn-primary principal-admin-btn" onClick={handleEquipo}>Equipo</button>
        )}
        
        <button type="button" className="btn btn-danger principal-admin-btn" onClick={handleEquipodeIncidencia}>Nueva Solicitud</button>
        
        <button type="button" className="btn btn-warning principal-admin-btn" onClick={handleListaProblemas}>Lista de Problemas</button>
        
        {permisos === '1' && (
            <button type="button" className="btn btn-primary principal-admin-btn" onClick={handleAsociarProblemas}>
            Asociar Problemas
            </button>
        )}
        
        <button 
            type="button" 
            className="btn btn-info principal-admin-btn" 
            onClick={handleTodasIncidencias}
        >
            Todas las Incidencias
        </button>
        
        <button type="button" className="btn btn-success principal-admin-btn" onClick={handleChangePasswordClick}>Contraseña</button>
        <button type="button" className="btn btn-info principal-admin-btn" onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>
            <div className='pO-div-tabla'>
                <table class="tabla" className='pO-tabla-centrado'>
                    <thead className='pO-tabla-encabezado color-blanco'>
                        <tr class="encabezado">
                            <th className='pO-folio pO-border-encabezado'>Folio</th>
                            <th className='pO-fecha pO-border-encabezado'>Fecha de Solicitud</th>
                            {(permisos === '1') && (
                                <th className='pO-departamento pO-border-encabezado'>Departamento</th>
                            )}
                            <th className='pO-descripcion pO-border-encabezado'>Descripción</th>
                            <th className='pO-estatus pO-border-encabezado'>Estatus</th>
                            <th className='pO-acciones pO-border-encabezado'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folios.map((folio, index) => (
                            <tr key={index} className='renglon pO-border-cuerpo-general'>
                                <td className='pO-border-cuerpo nito'>{folio}</td>
                                <td className='pO-border-cuerpo'>{fechas[index]}</td>
                                {(permisos === '1') && (
                                    <td className='pO-border-cuerpo'>{departamentos[index]}</td>
                                )}
                                <td className='pO-border-cuerpo'>Incidencia: {detalles[index]?.tipoIncidencia}
                                    <br />
                                    Descripción Adicional: {detalles[index]?.descripcion}
                                </td>
                                <td className='pO-border-cuerpo nito' style={{ color: colores[index] }}>{estados[index]}</td>
                                <td className='pO-border-cuerpo'> 
                                    {(permisos === '1') && (
                                        <>
                                            {estados[index] === 'Enviado' && (
                                                <button className='pO-orden-trabajo color-blanco' onClick={() => handleOrdenTrabajo({
                                                        id_incidencia: folio,
                                                        fecha: fechas[index],
                                                        departamento: departamentos[index],
                                                        tipoIncidencia: detalles[index]?.tipoIncidencia,
                                                        descripcion: detalles[index]?.descripcion
                                                })}>Orden de Trabajo</button>
                                            )}
                                            {(autorizar[index] === 1 && autorizados[index] === 0 && btnAcyRe) &&(
                                                <>
                                                    <button 
                                                        className='pO-orden-trabajo color-blanco' 
                                                        onClick={() => handleRechazarIncidencia(folio)}>
                                                        Rechazar
                                                    </button>
                                                    <button 
                                                        className='pO-orden-trabajo color-blanco' 
                                                        onClick={() => handleAceptarIncidencia(folio)}>
                                                        Aceptar
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                    {((permisos === '1' || permisos === '2') && estados[index] === 'Terminado') && (
                                        <button 
                                            className='pO-orden-trabajo color-blanco' 
                                            onClick={() => handleLiberarIncidencia(folio)}>
                                            Liberar
                                        </button>
                                    )}
                                    {(estados[index] !== 'Enviado') && (
                                        ((permisos === '4' || permisos === '5') && autorizados[index] === 1) ? (
                                            <button
                                                className='pO-orden-trabajo color-blanco'
                                                onClick={() => handleDetallesServicios({
                                                    id_incidencia: folio,
                                                    fecha: fechas[index],
                                                    departamento: departamentos[index],
                                                    tipoIncidencia: detalles[index]?.tipoIncidencia,
                                                    descripcion: detalles[index]?.descripcion,
                                                    estado: estados[index],
                                                    autorizado: autorizados[index],
                                                    serv: sers[index]
                                                })}
                                            >
                                                Detalles
                                            </button>
                                        ) : (
                                            <button
                                                className='pO-orden-trabajo color-blanco'
                                                onClick={() => handleDetalles({
                                                    id_incidencia: folio,
                                                    fecha: fechas[index],
                                                    departamento: departamentos[index],
                                                    tipoIncidencia: detalles[index]?.tipoIncidencia,
                                                    descripcion: detalles[index]?.descripcion,
                                                    estado: estados[index],
                                                    autorizado: autorizados[index],
                                                    autoriza: autorizar[index]
                                                })}
                                            >
                                                Detalles
                                            </button>
                                        )
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cambiar Contraseña</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="inputNewPassword" className="form-label">Nueva Contraseña</label>
                                        <div className="input-container">
                                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="inputNewPassword" placeholder="Ingresa la nueva contraseña aquí" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)}/>
                                            <button 
                                                type="button" 
                                                className="show-password-button" 
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? 'Ocultar' : 'Mostrar'}
                                            </button>
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
                            <div className="modal-header">
                                <h5 className="modal-title">Orden de Trabajo</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div className='pO-div-noEditable'>
                                            <label htmlFor="inputText" className="form-label">Folio: </label>
                                            <span> {selectedIncidencia.id_incidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Fecha de Solicitud: </label>
                                            <span> {selectedIncidencia.fecha}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Departamento: </label>
                                            <span> {selectedIncidencia.departamento}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span> {selectedIncidencia.tipoIncidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span> {selectedIncidencia.descripcion}</span>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="" className="form-label nito">Especialización: </label>
                                            <select className="form-select" value={especializacion} onChange={handleEspecializacionChange}>
                                                {especializaciones.map((esp, index) => (
                                                    <option value={esp.id_especializacion} key={esp.id_especializacion}> {esp.nombre} </option>
                                                ))}
                                            </select>
                                            <label htmlFor="inputNewPassword" className="form-label nito">Prioridad: </label>
                                            <select className="form-select" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                                {prioridades.map((prio, index) => (
                                                    <option value={prio.id_prioridad} key={prio.id_prioridad}> {prio.nombre} </option>
                                                ))}
                                            </select>
                                            <label htmlFor="inputNewPassword" className="form-label nito">Errores conocidos: </label>
                                            <select 
                                                className="form-select" 
                                                value={errorConocido || ''} 
                                                onChange={(e) => setErrorConocido(e.target.value)}
                                            >
                                                <option value="">Seleccione un error conocido</option>
                                                {erroresConocidos.map((eC) => (
                                                    <option value={eC.id_error} key={eC.id_error}>
                                                        {eC.descripcion}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="" className="form-label nito">Asignar a: </label>
                                            <select className="form-select" value={tecnico} onChange={(e) => setTecnico(e.target.value)}>
                                                {tecnicos.map((tec, index) => (
                                                    <option value={tec.id_usuario} key={tec.id_usuario}> {tec.nombre} - {tec.num_incidencias}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal2}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleEnviar}>Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal3 && (
                <div className="modal-overlay" onClick={handleCloseModal3}>
                    <div className="modal-dialog" style={{ maxWidth: '60%' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles de Incidencia</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    
                                    <div className="mb-3">
                                        <div>
                                            <label htmlFor="inputText" className="form-label pO-fecha-solicitud">Fecha de Solicitud: </label>
                                            <span> {fecha}</span>
                                            <label htmlFor="inputText" className="form-label pO-hr-solicitud">Hora de Solicitud: </label>
                                            <span> {hrEnvio}</span>
                                            <button type="button" className="btn btn-outline-danger pO-btn-equipo" onClick={handleDetalleEquipo}>Equipo</button>
                                            {(permisos === '1' && estado === 'En Proceso') && (
                                                <button type="button" className="btn-AP" onClick={handleAgregarProblema} title="Agregar incidencia a problema">&#10133;</button>
                                            )}
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span> {tipoIncidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Técnico Asignado: </label>
                                            <span> {tecnicoNom}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span> {descripcion}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Disponibilidad de Horario: </label>
                                            <span> {hrInicio} a {hrFin}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Prioridad: </label>
                                            <span> {nomPrioridad}</span>
                                            <br />

                                            <label htmlFor="inputText" className="form-label">Descripción Prioridad: </label>
                                            <span> {descPrioridad}</span>
                                            <br />
                                            
                                            <div className='scrollable'>
                                                <button className="nito color-naranja custom-buttonEB tam-dI" onClick={handleLugar}>
                                                    Lugar
                                                </button>
                                                {expandedL && (
                                                    <div>
                                                        <span>Edificio: {nomEdificio}</span>
                                                        <br />
                                                        <span>Ubicación Edificio: {ubiEdificio}</span>
                                                        <br />
                                                        <span>Nombre Espacio: {nomEspacio}</span>
                                                        <br />
                                                        <span>Ubicación Espacio: {ubiEspacio}</span>
                                                        <br />
                                                        <span>Responsable: {responsable}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    { estado === 'En Proceso' && (permisos === '4' || permisos === '5') &&  btnDiag === false && (
                                        <button type="button" className="tam-letra-17px color-boton-lila color-blanco btn-sin-border btn-tam-diagnostico" onClick={handleDiagnostico}>Diagnóstico</button>
                                    )}
                                    {( permisos === '1') && (
                                        <>
                                        <span className='nito'>Solución Personalizada: </span>
                                        <span>{solucionPersonalizada}</span>
                                        </>
                                    )}
                                    {( permisos === '2' && infoPieza) && (
                                        <>
                                        <span className='nito'>Cambio de pieza: </span>
                                        <span>{infoPieza}</span>
                                        </>
                                    )}
                                    {(permisos === '4' || permisos === '5') && eC && (
                                        <div className="scrollable">
                                            <button className="nito color-naranja custom-buttonEB tam-dI" onClick={handleSolucion}>
                                                SOLUCIÓN
                                            </button>
                                            {expanded && (
                                                <div>
                                                    <div className="mt-3 mb-4">
                                                        <span className='nito'>Solución Personalizada: </span>
                                                        <textarea
                                                            className="form-control mt-2"
                                                            rows="4"
                                                            placeholder="Describe la solución aplicada a esta incidencia..."
                                                            value={solucionPersonalizada}
                                                            onChange={(e) => setSolucionPersonalizada(e.target.value)}
                                                        ></textarea>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-sm btn-success mt-2" 
                                                            onClick={handleGuardarSolucion}
                                                        >
                                                            Guardar solución
                                                        </button>
                                                    </div>
                                                    
                                                    
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="modal-footer">
                                {(permisos === '4' || permisos === '5') && eC && btnAutorizacion === false && (
                                    <button type="button" className="btn btn-primary" onClick={handlePeticion}>Autorización</button>
                                )}
                                {(permisos === '4' || permisos === '5') && eC && autorizado === 1 && estado === 'En Proceso' && (
                                    <button type="button" className="btn btn-primary" onClick={handleFinalizar}>Finalizar</button>
                                )}
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal3}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal4 && (
                <div className="modal-overlay" onClick={handleCloseModal4}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                        <p></p>
                        <button type="button" class="btn-close" aria-label="Close" onClick={handleCloseModal4}></button>
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
                                            {/*{equipo.softwares.map((soft, index) => (
                                                <span key={index} className="form-span">{soft.nombre}</span>
                                            ))}*/}
                                            <br />
                                        </div>
                                    )}

                                    {/* Computadora y Servidor */}
                                    {(equipo.tipo === 'Computadora' || equipo.tipo === 'Servidor') && (
                                        <>
                                            <label htmlFor="procesador" className="form-label nito">Procesador: </label>
                                            <br />
                                            <span className="form-span"> {equipo.detalles.procesador}</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.nucleos} nucleos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.hilos} hilos</span>
                                            <br />
                                            <span className="form-span">{equipo.detalles.cache} GB</span>
                                            <br />

                                            <label htmlFor="ram" className="form-label nito">Memoria RAM: </label>
                                            <span className="form-span"> {equipo.detalles.memoria_RAM}</span>
                                            <br />

                                            <label htmlFor="almacenamiento" className="form-label nito">Almacenamiento: </label>
                                            <span className="form-span"> {equipo.detalles.almacenamiento}</span>
                                            <br />

                                            <label htmlFor="tarjetaGrafica" className="form-label nito">Tarjeta Gráfica: </label>
                                            <span className="form-span"> {equipo.detalles.tarjeta_grafica}</span>
                                            <br />

                                            <label htmlFor="sistemaOperativo" className="form-label nito">Sistema Operativo: </label>
                                            <br />
                                            <span className="form-span"> {equipo.detalles.sistemaOperativo}</span>
                                            <br />
                                            <span className="form-span">Tipo de interfaz: {equipo.detalles.interfaz}</span>
                                            <br />
                                            <span className="form-span">Licencia: {equipo.detalles.licencia}</span>
                                            <br />

                                            <label htmlFor="configuracionRed" className="form-label nito">Configuración de red: </label>
                                            <span className="form-span"> {equipo.detalles.tarjetaRed}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Impresora */}
                                    {(equipo.tipo === 'Impresora') && (
                                        <>
                                            <label htmlFor="tipoImpresora" className="form-label nito">Tipo de Impresora: </label>
                                            <span className="form-span"> {equipo.detalles.tipo_impresora}</span>
                                            <br />
                                            <label htmlFor="resolucion" className="form-label nito">Resolución: </label>
                                            <span className="form-span"> {equipo.detalles.resolucion}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span"> {equipo.detalles.conectividad}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Switch */}
                                    {(equipo.tipo === 'Switch') && (
                                        <>
                                            <label htmlFor="numeroPuertos" className="form-label nito">Número de puertos: </label>
                                            <span className="form-span"> {equipo.detalles.numero_puertos}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span"> {equipo.detalles.velocidad}</span>
                                            <br />
                                            <label htmlFor="tipoSwitch" className="form-label nito">Tipo de Switch: </label>
                                            <span className="form-span"> {equipo.detalles.tipo_switch}</span>
                                            <br />
                                            <label htmlFor="conectividad" className="form-label nito">Conectividad: </label>
                                            <span className="form-span"> {equipo.detalles.conectividad}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Router */}
                                    {(equipo.tipo === 'Router') && (
                                        <>
                                            <label htmlFor="tipoConexion" className="form-label nito">Tipo de conexión: </label>
                                            <span className="form-span"> {equipo.detalles.tipo_conexion}</span>
                                            <br />
                                            <label htmlFor="soporteVPN" className="form-label nito">Soporte VPN: </label>
                                            <span className="form-span"> {equipo.detalles.soporte_vpn}</span>
                                            <br />
                                            <label htmlFor="numeroInterfaces" className="form-label nito">Número de Interfaces Giga, Fast: </label>
                                            <span className="form-span"> {equipo.detalles.numero_interfaces}</span>
                                            <br />
                                            <label htmlFor="numeroSeriales" className="form-label nito">Número de Seriales: </label>
                                            <span className="form-span"> {equipo.detalles.numero_seriales}</span>
                                            <br />
                                            <label htmlFor="frecuenciaRuta" className="form-label nito">Frecuencia de Ruta: </label>
                                            <span className="form-span"> {equipo.detalles.frecuencia_ruta}</span>
                                            <br />
                                            <label htmlFor="protocolosRuta" className="form-label nito">Prótocolos de Ruta: </label>
                                            <span className="form-span"> {equipo.detalles.protocolos_ruta}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Switch y Router */}
                                    {(equipo.tipo === 'Switch' || equipo.tipo === 'Router') && (
                                        <>
                                            <label htmlFor="capacidad" className="form-label nito">Capacidad: </label>
                                            <span className="form-span"> {equipo.detalles.capacidad}</span>
                                            <br />
                                            <label htmlFor="consumoEnergia" className="form-label nito">Consumo de Energía: </label>
                                            <span className="form-span"> {equipo.detalles.consumo_energia}</span>
                                            <br />
                                        </>
                                    )}

                                    {/* Escáner */}
                                    {(equipo.tipo === 'Escaner') && (
                                        <>
                                            <label htmlFor="tipoEscaner" className="form-label nito">Tipo de Escaner: </label>
                                            <span className="form-span"> {equipo.detalles.tipo_escaner}</span>
                                            <br />
                                            <label htmlFor="velocidad" className="form-label nito">Velocidad: </label>
                                            <span className="form-span"> {equipo.detalles.velocidad}</span>
                                            <br />
                                        </>
                                    )}

                                </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal4}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal5 && (
                <div className="modal-overlay" onClick={handleCloseModal5}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Diagnóstico</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <select className="form-select" value={diag} onChange={handleDiagChange}>
                                            <option value="" disabled>Seleccione un diagnóstico</option>
                                            {diags.map((diag, index) => (
                                                <option value={diag.id_diagnostico} key={diag.id_diagnostico} > {diag.nombre}</option>
                                            ))}   
                                        </select>

                                        {(diag === '1') && (
                                            <div className='PO-separacion-btn-rfc'>
                                                <button className="tam-letra-17px color-boton-lila color-blanco btn-sin-border btn-tam-diagnostico btn-posicion" onClick={(e) => {e.preventDefault(); setShowPiezas(true);}}>RFC</button>
                                            </div>
                                        )}
                                        {(diag === '3') && (
                                            <div className='PO-separacion-btn-rfc'>
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
                                        {showPiezas && (
                                        <div className="mb-3">
                                            <select className="form-select" value={pieza} onChange={(e) => setPieza(e.target.value)}>
                                                <option value="" disabled>Seleccione una pieza</option>
                                                {piezas.map((pza, index) => (
                                                    <option value={pza.id_pieza} key={pza.id_pieza} > {pza.nombre}</option>
                                                ))}   
                                            </select>                                        
                                        </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal5}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={showPiezas ? handleGuardarRFC : handleGuardarDiagnostico}>
                                    {showPiezas ? 'Guardar' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
         
            {showModal6 && (
                <div className="modal-overlay" onClick={handleCloseModal6}>
                    <div className="modal-dialog" style={{ maxWidth: '60%' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles de Incidencia</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div>
                                            <label htmlFor="inputText" className="form-label pO-fecha-solicitud">Fecha de Solicitud: </label>
                                            <span> {fecha}</span>
                                            <label htmlFor="inputText" className="form-label pO-hr-solicitud">Hora de Solicitud: </label>
                                            <span> {hrEnvio}</span>
                                            <button type="button" className="btn btn-outline-danger pO-btn-equipo" onClick={handleDetalleEquipo}>Equipo</button>
                                            {(permisos === '1' && estado === 'En Proceso') && (
                                                <button type="button" className="btn-AP" onClick={handleAgregarProblema} title="Agregar incidencia a problema">&#10133;</button>
                                            )}
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Tipo de Incidencia: </label>
                                            <span> {tipoIncidencia}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Técnico Asignado: </label>
                                            <span> {tecnicoNom}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Adicional: </label>
                                            <span> {descripcion}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Disponibilidad de Horario: </label>
                                            <span> {hrInicio} a {hrFin}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Prioridad: </label>
                                            <span> {nomPrioridad}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Descripción Prioridad: </label>
                                            <span> {descPrioridad}</span>
                                            <br />
                                            <label htmlFor="inputText" className="form-label">Lugar </label>
                                            <div className='pO-div-lugar'>
                                                <span>Edificio: {nomEdificio}</span>
                                                <br />
                                                <span>Ubicación Edificio: {ubiEdificio}</span>
                                                <br />
                                                <span>Nombre Espacio: {nomEspacio}</span>
                                                <br />
                                                <span>Ubicación Espacio: {ubiEspacio}</span>
                                                <br />
                                                <span>Responsable: {responsable}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {autorizado === 1 && estado !== 'Liberado' && ser === 0 && (
                                        <>
                                        <label htmlFor="inputNewPassword" className="form-label nito">Servicio: </label>
                                        <select className="form-select" value={servicio} onChange={(e) => setServicio(e.target.value)} disabled={ser === 1} >
                                            <option value="" disabled>Seleccione un servicio</option>
                                            {servicios.map((ser, index) => (
                                                <option value={ser.id_servicio} key={ser.id_servicio}> {ser.nombre} - {ser.duracion} minutos</option>
                                            ))}
                                        </select>
                                        </>
                                    )}
                                    {( estado === 'Liberado' && infoPieza) && (
                                        <>
                                        <span className='nito'>Cambio de pieza: </span>
                                        <span>{infoPieza}</span>
                                        </>
                                    )}
                                </form>
                            </div>
                            <div className="modal-footer">
                                {( (permisos === '4' || permisos === '5') && ser === 0) && (
                                    <button type="button" className="btn btn-primary" onClick={handleRegistrar}>Registrar</button>
                                )}
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal6}>Cancelar</button>
                                {( (permisos === '4' || permisos === '5') && ser === 1 && estado === 'En Proceso') && (
                                        <button type="button" className="btn btn-primary" onClick={handleFinalizar}>Finalizar</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal7 && (
                <div className="modal-overlay" onClick={handleCloseModal7}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Evaluación</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <span className='nito pO-hI-posicion'>Hora Inicial: </span>{horaIncial}
                                        <span className='nito pO-hF-posicion'>Hora Final: </span>{horaFinal}
                                        <br />
                                        {servicioDuracion && (
                                            <>
                                            <span className='nito nito pO-DM-posicion'>
                                                Duración del servicio en Minutos: 
                                            </span>
                                            <span> {servicioDuracion}</span>
                                            </>
                                        )}
                                        <br />
                                        <span className='nito nito pO-DM-posicion'>Duración del técnico en Minutos: </span>{tiempoMinutos}
                                    </div>
                                    <hr className='color-lila'/>
                                    <span className='color-lila nito pO-ct-posicion'>Califica al Técnico</span>
                                    <div className="btn-group me-2" role="group" aria-label="Second group">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                className={`btn ${selectedRating === value ? 'btn-info' : 'btn-light'}`}
                                                onClick={() => handleRatingClick(value)}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                    <span className='nito color-naranja'>Técnico: </span> {tecnicoNom}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal7}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleCalificar}>Calificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal8 && (
                <div className="modal-overlay" onClick={handleCloseModal8}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar el error</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mt-2">
                                        <span className='nito'>Error encontrado:</span>
                                        <input type="text" className="form-control" value={errorEncontrado} onChange={(e) => setErrorEncontrado(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <span className='nito'>Causa Raíz</span>
                                        <select className="form-select" value={causa} onChange={(e) => setCausa(e.target.value)}>
                                            <option value="" disabled>Seleccione una causa raíz</option>
                                            {causas.map((c, index) => (
                                                <option value={c.id_causa_raiz} key={c.id_causa_raiz} > {c.nombre}</option>
                                            ))}   
                                        </select>                                        
                                    </div>
                                    <div className="mt-2">
                                        {causa && (
                                            <>
                                            <span className='nito'>Descripción</span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={causas.find((c) => c.id_causa_raiz === parseInt(causa))?.descripcion || 'No hay descripción disponible'}
                                                disabled 
                                            />
                                            </>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal8}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleErrorCausa}>Continuar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}