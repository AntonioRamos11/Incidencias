import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function TodasIncidencias() {
  const navigate = useNavigate();
  const [incidencias, setIncidencias] = useState([]);
  const [problemas, setProblemas] = useState([]);
  const [selectedIncidencias, setSelectedIncidencias] = useState([]);
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState('');
  const [showNewProblemForm, setShowNewProblemForm] = useState(false);
  const [newProblemData, setNewProblemData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'hardware',
    prioridad: 'media'
  });
  
  useEffect(() => {
    fetchIncidencias();
    fetchProblemas();
  }, []);
  
  const fetchIncidencias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/TodasIncidencias');
      setIncidencias(response.data);
    } catch (error) {
      console.error('Error al obtener incidencias:', error);
    }
  };
  
  const fetchProblemas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Problemas');
      setProblemas(response.data);
    } catch (error) {
      console.error('Error al obtener problemas:', error);
    }
  };
  
  const handleIncidenciaSelect = (id) => {
    if (selectedIncidencias.includes(id)) {
      setSelectedIncidencias(selectedIncidencias.filter(item => item !== id));
    } else {
      setSelectedIncidencias([...selectedIncidencias, id]);
    }
  };
  
  const handleOpenAssociateModal = () => {
    if (selectedIncidencias.length === 0) {
      alert('Selecciona al menos una incidencia');
      return;
    }
    setShowAssociateModal(true);
  };
  
  const handleAssociateToExisting = async () => {
    try {
      // Asociar cada incidencia seleccionada al problema elegido
      const promises = selectedIncidencias.map(incidenciaId => 
        axios.post('http://localhost:3000/AsociarIncidenciaProblema', {
          id_incidencia: incidenciaId,
          id_problema: selectedProblemId
        })
      );
      
      await Promise.all(promises);
      alert('Incidencias asociadas exitosamente');
      setShowAssociateModal(false);
      setSelectedIncidencias([]);
    } catch (error) {
      console.error('Error al asociar incidencias:', error);
      alert('Error al asociar incidencias');
    }
  };
  
  const handleCreateAndAssociate = async () => {
    try {
      // Crear nuevo problema
      const createResponse = await axios.post('http://localhost:3000/CrearProblema', newProblemData);
      const newProblemId = createResponse.data.id_problema;
      
      // Asociar incidencias al problema creado
      const promises = selectedIncidencias.map(incidenciaId => 
        axios.post('http://localhost:3000/AsociarIncidenciaProblema', {
          id_incidencia: incidenciaId,
          id_problema: newProblemId
        })
      );
      
      await Promise.all(promises);
      alert('Problema creado y asociaciones realizadas exitosamente');
      setShowAssociateModal(false);
      setSelectedIncidencias([]);
      setNewProblemData({
        titulo: '',
        descripcion: '',
        categoria: 'hardware',
        prioridad: 'media'
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear problema o asociar incidencias');
    }
  };
  
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Todas las Incidencias</h2>
        <div>
          <Button 
            variant="primary" 
            onClick={handleOpenAssociateModal} 
            disabled={selectedIncidencias.length === 0}
            className="me-2"
          >
            Asociar Seleccionadas ({selectedIncidencias.length})
          </Button>
          <Button variant="secondary" onClick={() => navigate('/problemas')}>
            Ver Problemas
          </Button>
        </div>
      </div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIncidencias(incidencias.map(inc => inc.id_incidencia));
                  } else {
                    setSelectedIncidencias([]);
                  }
                }} 
              />
            </th>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map(inc => (
            <tr key={inc.id_incidencia} className={selectedIncidencias.includes(inc.id_incidencia) ? 'table-primary' : ''}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedIncidencias.includes(inc.id_incidencia)}
                  onChange={() => handleIncidenciaSelect(inc.id_incidencia)}
                />
              </td>
              <td>{inc.id_incidencia}</td>
              <td>{inc.nombreIncidencia}</td>
              <td>{inc.descripcion}</td>
              <td>{inc.fecha}</td>
              <td>
                <Badge bg={inc.color === 'rojo' ? 'danger' : inc.color === 'verde' ? 'success' : 'warning'}>
                  {inc.estado_incidencia}
                </Badge>
              </td>
              <td>
                <Button variant="info" size="sm" onClick={() => navigate(`/incidencia/${inc.id_incidencia}`)}>
                  Ver Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Modal para asociar incidencias */}
      <Modal show={showAssociateModal} onHide={() => setShowAssociateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Asociar Incidencias a Problemas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Has seleccionado {selectedIncidencias.length} incidencias</h5>
          
          <Form.Check 
            type="radio"
            id="existingProblem"
            label="Asociar a problema existente"
            name="associationType"
            onChange={() => setShowNewProblemForm(false)}
            defaultChecked
            className="mb-3"
          />
          
          {!showNewProblemForm && (
            <Form.Group className="mb-3">
              <Form.Label>Selecciona un problema:</Form.Label>
              <Form.Select 
                value={selectedProblemId} 
                onChange={(e) => setSelectedProblemId(e.target.value)}
              >
                <option value="">-- Selecciona un problema --</option>
                {problemas.map(prob => (
                  <option key={prob.id_problema} value={prob.id_problema}>
                    #{prob.id_problema}: {prob.titulo} - {prob.categoria}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          
          <Form.Check 
            type="radio"
            id="newProblem"
            label="Crear nuevo problema"
            name="associationType"
            onChange={() => setShowNewProblemForm(true)}
            className="mb-3"
          />
          
          {showNewProblemForm && (
            <div className="border p-3 rounded">
              <Form.Group className="mb-3">
                <Form.Label>Título:</Form.Label>
                <Form.Control
                  type="text"
                  value={newProblemData.titulo}
                  onChange={(e) => setNewProblemData({...newProblemData, titulo: e.target.value})}
                  placeholder="Título del problema"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Categoría:</Form.Label>
                <Form.Select
                  value={newProblemData.categoria}
                  onChange={(e) => setNewProblemData({...newProblemData, categoria: e.target.value})}
                >
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                  <option value="redes">Redes</option>
                  <option value="telefonia">Telefonía</option>
                  <option value="otros">Otros</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Prioridad:</Form.Label>
                <Form.Select
                  value={newProblemData.prioridad}
                  onChange={(e) => setNewProblemData({...newProblemData, prioridad: e.target.value})}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newProblemData.descripcion}
                  onChange={(e) => setNewProblemData({...newProblemData, descripcion: e.target.value})}
                  placeholder="Descripción del problema"
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssociateModal(false)}>
            Cancelar
          </Button>
          {showNewProblemForm ? (
            <Button 
              variant="primary" 
              onClick={handleCreateAndAssociate}
              disabled={!newProblemData.titulo}
            >
              Crear y Asociar
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleAssociateToExisting}
              disabled={!selectedProblemId}
            >
              Asociar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}