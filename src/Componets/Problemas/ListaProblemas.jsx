import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Header } from '../Header/Header.jsx';
import { Header_sin_editar } from '../Header/Header_sin_editar.jsx';
import axios from 'axios'; // Add if you need API calls

export function ListaProblemas() {
  const [incidenciasAsociadas, setIncidenciasAsociadas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Add useLocation hook
  const [permisos, setPermisos] = useState('');
  const [folios, setFolios] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [colores, setColores] = useState([]);
  const [autorizar, setAutorizar] = useState([]);
  const [autorizados, setAutorizados] = useState([]);
  const [btnAcyRe, setBtnAcyRe] = useState(false);
  const [sers, setSers] = useState([]);
  
  const [problemas, setProblemas] = useState([
    // Datos de ejemplo, reemplazar con datos reales de tu API
  
  ]);
  const [showOnlyLiberado, setShowOnlyLiberado] = useState(false);

  // New state variables for modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [incidenciaDetails, setIncidenciaDetails] = useState(null);

  // Add state for category filtering
  const [categoryFilter, setCategoryFilter] = useState('');

  // Add this with your other state declarations at the top of the component
  const [allProblemas, setAllProblemas] = useState([]);

  // Agrega estos estados
  const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
  const [newProblemTitle, setNewProblemTitle] = useState('');
  const [newProblemDescription, setNewProblemDescription] = useState('');
  const [newProblemCategory, setNewProblemCategory] = useState('hardware');
  const [newProblemPriority, setNewProblemPriority] = useState('media');

  // State for associating problems
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [existingProblems, setExistingProblems] = useState([]);
  const [selectedIncidenciaId, setSelectedIncidenciaId] = useState(null);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Agrega este estado para controlar el modal de detalles de incidencia
  const [showIncidenciaDetailsModal, setShowIncidenciaDetailsModal] = useState(false);
  const [selectedIncidenciaDetails, setSelectedIncidenciaDetails] = useState(null);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/Principal');
  };
  // Navigation handlers
  const handleEquipo = (e) => {
    e.preventDefault();
    navigate('/EquipoBodega');
  };

  const handleEquipodeIncidencia = (e) => {
    e.preventDefault();
    navigate('/EquipodeIncidencia');
  };

  const handleListaProblemas = (e) => {
    e.preventDefault();
    navigate('/problemas');
  };

  const handleChangePasswordClick = (e) => {
    e.preventDefault();
    // Implementation for password change modal
    // setShowModal(true);
  };

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('idDepartamentoPertenece');
    localStorage.removeItem('permisos');
    navigate('/Login');
  };

  // Dummy handlers for button actions that would normally be implemented
  const handleOrdenTrabajo = (details) => {
    console.log("Orden de trabajo", details);
  };

  const handleRechazarIncidencia = (id) => {
    console.log("Rechazar incidencia", id);
  };

  const handleAceptarIncidencia = (id) => {
    console.log("Aceptar incidencia", id);
  };

  const handleLiberarIncidencia = (id) => {
    console.log("Liberar incidencia", id);
  };

  const handleDetallesServicios = (details) => {
    console.log("Detalles servicios", details);
  };

  const handleDetalles = (details) => {
    console.log("Ver detalles", details);
  };

  // Load user permissions
  useEffect(() => {
    const storedPermisos = localStorage.getItem('permisos');
    if (storedPermisos) {
      setPermisos(storedPermisos);
    }
    
    // Cargar problemas en lugar de incidencias liberadas
    fetchProblemas();
  }, []);
  
  // Function for badge colors
  const getBadgeColor = (prioridad) => {
    switch (prioridad) {
      case 'baja': return 'success';
      case 'media': return 'info';
      case 'alta': return 'warning';
      case 'critica': return 'danger';
      default: return 'secondary';
    }
  };

  // Add the renderHeader function
  const renderHeader = () => {
    if (location.pathname === '/Principal' || location.pathname === '/Principal_administrador') {
      if (permisos === '1' || permisos === '2') {
        return <Header />;
      } else if (permisos === '3' || permisos === '4' || permisos === '5') {
        return <Header_sin_editar />;
      }
    }
    return null;
  };

  // Add this function to your component

  const fetchLiberadoIncidencias = async () => {
    const id_departamento = localStorage.getItem('idDepartamentoPertenece');
    const id_usuario = localStorage.getItem('idUsuario');
    const permisos = localStorage.getItem('permisos');
    
    try {
      let response;
      
      // Different API endpoints based on user permissions
      if(permisos === '1') {
        // Admin user
        response = await axios.get('http://localhost:3000/DetalleTablaADMONLiberados');
      } else if(permisos === '2' || permisos === '3') {
        // Department head or other department role
        response = await axios.get('http://localhost:3000/DetalleTablaDepartamentoLiberados', {
          params: { id_departamento: id_departamento }
        });
      } else if(permisos === '4' || permisos === '5') {
        // Technical roles
        response = await axios.get('http://localhost:3000/DetalleTablaTecnicoLiberados', {
          params: { id_usuario: id_usuario }
        });
      }
      
      // Process and transform the data
      const detalles = response.data;
      console.log('Detalles de incidencias liberadas:', detalles);
      if (detalles.length > 0) {
        // Map the API response to the problemas state format
        const problemasLiberados = detalles.map(d => ({
          id: d.id_incidencia,
          titulo: d.nombreIncidencia,
          categoria: d.id_tipoIncidencia || 'N/A',
          descripcion: d.descripcion,
          prioridad: d.nombre_prioridad || 'media',
          estado: 'Liberado',
          fechaCreacion: formatFecha(d.fecha)
        }));
        
        // Update both problemas and allProblemas states
        setProblemas(problemasLiberados);
        setAllProblemas(problemasLiberados);
      }
    } catch(error) {
      console.error('Error al obtener las incidencias liberadas', error);
    }
  };

  // Helper function to format dates consistently
  const formatFecha = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Add this function to fetch all problems
  const fetchAllProblems = async () => {
    // Implement the API call to fetch all problems here
    // For example:
    // const response = await axios.get('http://localhost:3000/AllProblems');
    // setProblemas(response.data);
  };

  // Add this function to toggle the filter
  const toggleLiberadoFilter = () => {
    setShowOnlyLiberado(!showOnlyLiberado);
    if (!showOnlyLiberado) {
      fetchLiberadoIncidencias();
    } else {
      // Fetch all problems instead
      fetchAllProblems(); // Define this function to get all problems
    }
  };

  // Add this function to handle Ver button click
  const handleVerIncidencia = async (id) => {
    try {
      // Find the basic problem info
      const problema = problemas.find(p => p.id === id);
      setSelectedProblem(problema);
      
      // Fetch detailed information
      const response = await axios.get(`http://localhost:3000/DetalleIncidencia`, {
        params: { id_incidencia: id }
      });
      
      // Set the detailed information
      setIncidenciaDetails(response.data);
      
      // Fetch associated incidents
      const incidenciasResponse = await axios.get(`http://localhost:3000/IncidenciasAsociadasProblema`, {
        params: { id_problema: id }
      });
      
      // Set associated incidents
      setIncidenciasAsociadas(incidenciasResponse.data || []);
      
      // Show the modal
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error al obtener los detalles de la incidencia o incidencias asociadas', error);
    }
  };
  
  // Function to close the modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedProblem(null);
    setIncidenciaDetails(null);
  };

  // Function to handle associating an incident with a problem
  const handleAsociarProblema = async (idIncidencia) => {
    try {
      // Obtener problemas existentes
      const response = await axios.get('http://localhost:3000/Problemas');
      setExistingProblems(response.data);
      
      // Abrir modal para asociar
      setSelectedIncidenciaId(idIncidencia);
      setShowAssociateModal(true);
    } catch (error) {
      console.error('Error al preparar asociación:', error);
    }
  };

  // Función para realizar la asociación
  const handleConfirmAssociation = async () => {
    try {
      await axios.post('http://localhost:3000/AsociarIncidenciaProblema', {
        id_incidencia: selectedIncidenciaId,
        id_problema: selectedProblemId
      });
      
      // Cerrar modal y refrescar
      setShowAssociateModal(false);
      fetchLiberadoIncidencias();
      alert('Incidencia asociada exitosamente');
    } catch (error) {
      console.error('Error al asociar:', error);
      alert('Error al asociar la incidencia');
    }
  };

  // Add this function to get category badge colors
  const getCategoryBadgeColor = (categoria) => {
    switch (categoria.toLowerCase()) {
      case 'hardware': return 'danger';
      case 'software': return 'info';
      case 'redes': return 'success';
      case 'telefonia': return 'warning';
      case 'otros': return 'secondary';
      default: return 'dark';
    }
  };

  // Add this function to filter problems by category
  const filterByCategory = (category) => {
    setCategoryFilter(category);
    
    if (category) {
      // Filter problemas by selected category
      const filtered = allProblemas.filter(p => 
        p.categoria.toLowerCase() === category.toLowerCase()
      );
      setProblemas(filtered);
    } else {
      // Show all problemas or just liberados based on current state
      if (showOnlyLiberado) {
        fetchLiberadoIncidencias();
      } else {
        setProblemas(allProblemas);
      }
    }
  };

  // Añadir esta nueva función para obtener los problemas
  const fetchProblemas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Problemas');
      console.log('Problemas:', response.data);
      
      // Transformar los datos de problemas al formato esperado
      const problemasList = response.data.map(p => ({
        id: p.id_problema,
        titulo: p.titulo,
        categoria: p.categoria,
        descripcion: p.descripcion,
        prioridad: p.prioridad,
        estado: p.estado,
        fechaCreacion: formatFecha(p.fecha_creacion),
        fechaResolucion: p.fecha_resolucion ? formatFecha(p.fecha_resolucion) : null,
        numIncidencias: p.num_incidencias
      }));
      
      setProblemas(problemasList);
      setAllProblemas(problemasList);
      setShowOnlyLiberado(false);
    } catch (error) {
      console.error('Error al obtener problemas:', error);
    }
  };

  // Función para crear problema
  const handleCreateProblem = async () => {
    try {
      if (!newProblemTitle.trim()) {
        alert('El título del problema no puede estar vacío');
        return;
      }

      await axios.post('http://localhost:3000/CrearProblema', {
        titulo: newProblemTitle,
        descripcion: newProblemDescription,
        categoria: newProblemCategory,
        prioridad: newProblemPriority
      });

      // Cerrar modal y refrescar lista
      setShowCreateProblemModal(false);
      resetNewProblemForm();
      fetchProblemas();
      
      // Mostrar mensaje de éxito
      alert('Problema creado exitosamente');
    } catch (error) {
      console.error('Error al crear problema:', error);
      alert('Error al crear el problema');
    }
  };

  const resetNewProblemForm = () => {
    setNewProblemTitle('');
    setNewProblemDescription('');
    setNewProblemCategory('hardware');
    setNewProblemPriority('media');
  };

  // Función para eliminar asociación entre problema e incidencia
  const handleDeleteAssociation = async (problemaId, incidenciaId) => {
    if (!window.confirm('¿Está seguro de eliminar esta asociación?')) {
      return;
    }
    
    try {
      await axios.delete('http://localhost:3000/EliminarAsociacionProblema', {
        data: {
          id_problema: problemaId,
          id_incidencia: incidenciaId
        }
      });
      
      // Actualizar la lista de incidencias asociadas
      const updatedIncidencias = incidenciasAsociadas.filter(
        inc => inc.id_incidencia !== incidenciaId
      );
      setIncidenciasAsociadas(updatedIncidencias);
      
      // Actualizar la lista de problemas para reflejar el nuevo conteo
      fetchProblemas();
      
      // Mostrar mensaje de éxito
      alert('Asociación eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la asociación:', error);
      alert('Error al eliminar la asociación');
    }
  };

  // Función para cargar y mostrar los detalles de una incidencia específica
  const handleVerDetalleIncidencia = async (idIncidencia) => {
    try {
      // Usando DetalleIncidencia2 que tiene más información detallada
      const response = await axios.get('http://localhost:3000/DetalleIncidencia2', {
        params: { id_incidencia: idIncidencia }
      });
      
      console.log("Detalles obtenidos:", response.data);
      setSelectedIncidenciaDetails(response.data);
      setShowIncidenciaDetailsModal(true);
    } catch (error) {
      console.error('Error al cargar detalles de incidencia:', error);
      alert('Error al cargar los detalles de la incidencia');
    }
  };

  return (
    <>
      {renderHeader()}
      <div className="principal-admin-container">
        <div className="principal-admin-buttons">
        <button type="button" className="btn btn-light principal-admin-btn" onClick={handleHomeClick}>Menú principal</button>

          {(permisos === '1' || permisos === '4') && (
            <button className="btn btn-primary principal-admin-btn" onClick={handleEquipo}>Equipo</button>
          )}
          <button type="button" className="btn btn-danger principal-admin-btn" onClick={handleEquipodeIncidencia}>Nueva Solicitud</button>
          
          <button type="button" className="btn btn-warning principal-admin-btn" onClick={handleListaProblemas}>Lista de Problemas</button>
          
          {/* Nuevo botón para Todas las Incidencias */}
          <button 
            type="button" 
            className="btn btn-info principal-admin-btn" 
            onClick={() => navigate('/todas-incidencias')}
          >
            Todas las Incidencias
          </button>
          
          <button type="button" className="btn btn-success principal-admin-btn" onClick={handleChangePasswordClick}>Contraseña</button>
          <button type="button" className="btn btn-info principal-admin-btn" onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>

        {/* Main content - Lista de Problemas */}
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Lista de Problemas</h2>
            <div>
              <Button 
                variant={showOnlyLiberado ? "primary" : "outline-primary"} 
                className="me-2"
                onClick={toggleLiberadoFilter}
              >
                {showOnlyLiberado ? "Mostrando Incidencias Liberadas" : "Mostrar Problemas"}
              </Button>
              
              {/* Add category filter dropdown */}
              <select 
                className="form-select form-select-sm d-inline-block me-2" 
                style={{ width: "auto" }}
                onChange={(e) => filterByCategory(e.target.value)}
              >
                <option value="">Todas las Categorías</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="redes">Redes</option>
                <option value="telefonia">Telefonía</option>
                <option value="otros">Otros</option>
              </select>
              
              <Link to="/reportar-problema">
                <Button variant="primary">Reportar Nuevo Problema</Button>
              </Link>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {problemas.map(problema => (
                <tr key={problema.id}>
                  <td>{problema.id}</td>
                  <td>{problema.titulo}</td>
                  <td>
                    <Badge bg={getCategoryBadgeColor(problema.categoria)}>
                      {problema.categoria}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={getBadgeColor(problema.prioridad)}>
                      {problema.prioridad}
                    </Badge>
                  </td>
                  <td>{problema.estado}</td>
                  <td>{problema.fechaCreacion}</td>
                  <td>
                    <Button 
                      variant="info" 
                      size="sm"
                      onClick={() => handleVerIncidencia(problema.id)}
                    >
                      Ver
                    </Button>{' '}
                    <Link to={`/asociar-problemas?id=${problema.id}`}>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      {/* Modal for showing incidencia details */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Problema #{selectedProblem?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {incidenciaDetails ? (
            <div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p><strong>Título:</strong> {selectedProblem?.titulo}</p>
                  <p><strong>Categoría:</strong> {selectedProblem?.categoria}</p>
                  <p><strong>Prioridad:</strong> {selectedProblem?.prioridad}</p>
                  <p><strong>Estado:</strong> {selectedProblem?.estado}</p>
                  <p><strong>Fecha:</strong> {selectedProblem?.fechaCreacion}</p>
                </div>
                <div className="col-md-6">
                  {incidenciaDetails.descripcion && (
                    <p><strong>Descripción:</strong> {incidenciaDetails.descripcion}</p>
                  )}
                  {incidenciaDetails.tecnico && (
                    <p><strong>Técnico:</strong> {incidenciaDetails.tecnico}</p>
                  )}
                  {incidenciaDetails.departamento && (
                    <p><strong>Departamento:</strong> {incidenciaDetails.departamento}</p>
                  )}
                </div>
              </div>

              {/* Información de equipo y solución... */}
              
              {/* Sección para mostrar incidencias asociadas */}
              {incidenciasAsociadas && incidenciasAsociadas.length > 0 ? (
                <div className="mt-4">
                  <h5>Incidencias Asociadas ({incidenciasAsociadas.length})</h5>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Departamento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidenciasAsociadas.map((incidencia) => (
                        <tr key={incidencia.id_incidencia}>
                          <td>{incidencia.id_incidencia}</td>
                          <td>{formatFecha(incidencia.fecha)}</td>
                          <td>{incidencia.descripcion}</td>
                          <td>{incidencia.nombre_departamento}</td>
                          <td>
                            <Badge bg={
                              incidencia.estado === 'Enviado' ? 'secondary' :
                              incidencia.estado === 'En Proceso' ? 'warning' :
                              incidencia.estado === 'Terminado' ? 'success' :
                              incidencia.estado === 'Liberado' ? 'info' :
                              incidencia.estado === 'Rechazado' ? 'danger' : 'dark'
                            }>
                              {incidencia.estado}
                            </Badge>
                          </td>
                          <td>
                            <Button 
                              variant="outline-info" 
                              size="sm"
                              className="me-1"
                              onClick={() => handleVerDetalleIncidencia(incidencia.id_incidencia)}
                            >
                              Ver
                            </Button>
                            {(permisos === '1' || permisos === '4') && (
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDeleteAssociation(selectedProblem.id, incidencia.id_incidencia)}
                              >
                                Eliminar
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="alert alert-info mt-3">No hay incidencias asociadas a este problema.</div>
              )}
            </div>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Cerrar
          </Button>
          {(permisos === '1' || permisos === '4') && selectedProblem?.estado === 'Liberado' && (
            <Button variant="primary" onClick={() => handleAsociarProblema(selectedProblem?.id)}>
              Asociar a Problema
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal para crear problema */}
      <Modal show={showCreateProblemModal} onHide={() => setShowCreateProblemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Problema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="problemTitle" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="problemTitle"
              value={newProblemTitle}
              onChange={(e) => setNewProblemTitle(e.target.value)}
              placeholder="Título descriptivo del problema"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="problemCategory" className="form-label">Categoría</label>
            <select
              className="form-select"
              id="problemCategory"
              value={newProblemCategory}
              onChange={(e) => setNewProblemCategory(e.target.value)}
            >
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="redes">Redes</option>
              <option value="telefonia">Telefonía</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="problemPriority" className="form-label">Prioridad</label>
            <select
              className="form-select"
              id="problemPriority"
              value={newProblemPriority}
              onChange={(e) => setNewProblemPriority(e.target.value)}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="problemDescription" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="problemDescription"
              rows="3"
              value={newProblemDescription}
              onChange={(e) => setNewProblemDescription(e.target.value)}
              placeholder="Detalles del problema"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateProblemModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateProblem}>
            Crear Problema
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para asociar incidencia a problema */}
      <Modal show={showAssociateModal} onHide={() => setShowAssociateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Asociar Incidencia a Problema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seleccione un problema existente para asociar con esta incidencia:</p>
          <ul className="list-group mb-3">
            {existingProblems.map(problem => (
              <li key={problem.id_problema} className="list-group-item d-flex justify-content-between align-items-center">
                {problem.titulo}
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setSelectedProblemId(problem.id_problema);
                    handleConfirmAssociation();
                  }}
                >
                  Asociar
                </Button>
              </li>
            ))}
          </ul>
          
          <p>
            También puede <Link to="/reportar-problema" onClick={() => setShowAssociateModal(false)}>reportar un nuevo problema</Link> si no encuentra uno adecuado.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssociateModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para detalles de incidencia */}
      <Modal show={showIncidenciaDetailsModal} onHide={() => setShowIncidenciaDetailsModal(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Incidencia #{selectedIncidenciaDetails?.id_incidencia}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIncidenciaDetails ? (
            <div className="incident-details-container">
              <div className="mb-3">
                <h6 className="text-primary mb-3">Información General</h6>
                <p><strong>Tipo:</strong> {selectedIncidenciaDetails.nombreIncidencia || 'No especificado'}</p>
                <p><strong>Descripción:</strong> {selectedIncidenciaDetails.descripcion || 'Sin descripción'}</p>
                <p><strong>Fecha:</strong> {formatFecha(selectedIncidenciaDetails.fecha)}</p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <Badge bg={
                    selectedIncidenciaDetails.estado === 'Enviado' ? 'secondary' :
                    selectedIncidenciaDetails.estado === 'En Proceso' ? 'warning' :
                    selectedIncidenciaDetails.estado === 'Terminado' ? 'success' :
                    selectedIncidenciaDetails.estado === 'Liberado' ? 'info' :
                    selectedIncidenciaDetails.estado === 'Rechazado' ? 'danger' : 'dark'
                  }>
                    {selectedIncidenciaDetails.estado || 'Pendiente'}
                  </Badge>
                </p>
              </div>

              <div className="mb-3">
                <h6 className="text-primary mb-3">Ubicación y Responsables</h6>
                <p><strong>Departamento:</strong> {selectedIncidenciaDetails.nombre_departamento || 'No asignado'}</p>
                {selectedIncidenciaDetails.nombre_usuario && (
                  <p><strong>Técnico Asignado:</strong> {selectedIncidenciaDetails.nombre_usuario}</p>
                )}
                {selectedIncidenciaDetails.nombre_espacio && (
                  <p><strong>Espacio:</strong> {selectedIncidenciaDetails.nombre_espacio}</p>
                )}
                {selectedIncidenciaDetails.ubicacion_esp && (
                  <p><strong>Ubicación:</strong> {selectedIncidenciaDetails.ubicacion_esp}</p>
                )}
                {selectedIncidenciaDetails.nombre_edificio && (
                  <p><strong>Edificio:</strong> {selectedIncidenciaDetails.nombre_edificio}</p>
                )}
              </div>

              {selectedIncidenciaDetails.nombre_prioridad && (
                <div className="mb-3">
                  <h6 className="text-primary mb-3">Prioridad</h6>
                  <p><strong>{selectedIncidenciaDetails.nombre_prioridad}</strong></p>
                  {selectedIncidenciaDetails.descripcion_prioridad && (
                    <p>{selectedIncidenciaDetails.descripcion_prioridad}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando detalles...</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowIncidenciaDetailsModal(false)}>
            Cerrar
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/detalles-incidencia/${selectedIncidenciaDetails?.id_incidencia}`)}
          >
            Ver Completo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}