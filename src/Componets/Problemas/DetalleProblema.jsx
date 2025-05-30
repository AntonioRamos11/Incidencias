import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge, Row, Col, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function DetalleProblema() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problema, setProblema] = useState(null);
  const [incidenciasAsociadas, setIncidenciasAsociadas] = useState([]);
  const [problemasSimilares, setProblemasSimilares] = useState([]);
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [allProblemas, setAllProblemas] = useState([]);
  const [selectedProblemaId, setSelectedProblemaId] = useState('');
  const [showErrorKnownForm, setShowErrorKnownForm] = useState(false);
  const [errorKnownData, setErrorKnownData] = useState({
    descripcion: '',
    causa_raiz: '',
    solucion: ''
  });
  
  useEffect(() => {
    fetchProblema();
    fetchIncidenciasAsociadas();
    fetchProblemasSimilares();
  }, [id]);
  
  const fetchProblema = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Problemas/${id}`);
      setProblema(response.data);
    } catch (error) {
      console.error('Error al obtener problema:', error);
    }
  };
  
  const fetchIncidenciasAsociadas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/IncidenciasProblema/${id}`);
      setIncidenciasAsociadas(response.data);
    } catch (error) {
      console.error('Error al obtener incidencias asociadas:', error);
    }
  };
  
  const fetchProblemasSimilares = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/ProblemasSimilares/${id}`);
      setProblemasSimilares(response.data);
    } catch (error) {
      console.error('Error al obtener problemas similares:', error);
    }
  };
  
  const handleOpenAssociateModal = async () => {
    try {
      // Obtener todos los problemas excepto el actual
      const response = await axios.get('http://localhost:3000/Problemas');
      setAllProblemas(response.data.filter(p => p.id_problema != id)); // Filtrar el problema actual
      setShowAssociateModal(true);
    } catch (error) {
      console.error('Error al obtener problemas:', error);
    }
  };
  
  const handleAssociateProblema = async () => {
    try {
      await axios.post('http://localhost:3000/AsociarProblemasSimilares', {
        id_problema_principal: id,
        id_problema_secundario: selectedProblemaId
      });
      
      alert('Problemas asociados exitosamente');
      setShowAssociateModal(false);
      fetchProblemasSimilares(); // Refrescar la lista
    } catch (error) {
      console.error('Error al asociar problemas:', error);
      alert('Error al asociar problemas');
    }
  };
  
  const handleRegisterErrorKnown = async () => {
    try {
      await axios.post('http://localhost:3000/RegistrarErrorConocido', {
        id_problema: id,
        ...errorKnownData
      });
      
      alert('Error conocido registrado exitosamente');
      setShowErrorKnownForm(false);
      fetchProblema(); // Refrescar datos del problema
    } catch (error) {
      console.error('Error al registrar error conocido:', error);
      alert('Error al registrar error conocido');
    }
  };
  
  const getBadgeColor = (prioridad) => {
    switch (prioridad) {
      case 'baja': return 'success';
      case 'media': return 'info';
      case 'alta': return 'warning';
      case 'critica': return 'danger';
      default: return 'secondary';
    }
  };
  
  const getCategoryBadgeColor = (categoria) => {
    switch (categoria?.toLowerCase()) {
      case 'hardware': return 'danger';
      case 'software': return 'info';
      case 'redes': return 'success';
      case 'telefonia': return 'warning';
      case 'otros': return 'secondary';
      default: return 'dark';
    }
  };
  
  if (!problema) {
    return (
      <Container className="mt-4">
        <p>Cargando datos del problema...</p>
      </Container>
    );
  }
  
  return (
    <Container className="mt-4">
      <div className="mb-3">
        <Button variant="secondary" onClick={() => navigate('/problemas')}>
          &larr; Volver a Lista de Problemas
        </Button>
      </div>
      
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Problema #{problema.id_problema}</h3>
          <div>
            <Button 
              variant="primary" 
              onClick={handleOpenAssociateModal} 
              className="me-2"
            >
              Asociar Problema Similar
            </Button>
            {!problema.tiene_error_conocido && (
              <Button 
                variant="warning" 
                onClick={() => setShowErrorKnownForm(true)}
              >
                Registrar Error Conocido
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h4>{problema.titulo}</h4>
              <p className="text-muted">Creado el: {new Date(problema.fecha_creacion).toLocaleDateString()}</p>
              
              <p><strong>Estado:</strong> {problema.estado}</p>
              <p>
                <strong>Categoría:</strong>{' '}
                <Badge bg={getCategoryBadgeColor(problema.categoria)}>
                  {problema.categoria}
                </Badge>
              </p>
              <p>
                <strong>Prioridad:</strong>{' '}
                <Badge bg={getBadgeColor(problema.prioridad)}>
                  {problema.prioridad}
                </Badge>
              </p>
            </Col>
            <Col md={6}>
              <h5>Descripción</h5>
              <p>{problema.descripcion}</p>
              
              {problema.tiene_error_conocido && (
                <div className="mt-3 p-3 bg-light rounded">
                  <h5 className="text-primary">Error Conocido</h5>
                  <p><strong>Causa Raíz:</strong> {problema.causa_raiz}</p>
                  <p><strong>Solución:</strong> {problema.solucion || 'No disponible'}</p>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Row>
        <Col md={6}>
          <h4>Incidencias Asociadas ({incidenciasAsociadas.length})</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {incidenciasAsociadas.map(inc => (
                <tr key={inc.id_incidencia}>
                  <td>{inc.id_incidencia}</td>
                  <td>{inc.tipo_incidencia}</td>
                  <td>{inc.estado_incidencia}</td>
                  <td>{new Date(inc.fecha).toLocaleDateString()}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => navigate(`/incidencia/${inc.id_incidencia}`)}>
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
              {incidenciasAsociadas.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">No hay incidencias asociadas</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <h4>Problemas Similares ({problemasSimilares.length})</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {problemasSimilares.map(prob => (
                <tr key={prob.id_problema}>
                  <td>{prob.id_problema}</td>
                  <td>{prob.titulo}</td>
                  <td>{prob.estado}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => navigate(`/problema/${prob.id_problema}`)}>
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
              {problemasSimilares.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">No hay problemas similares asociados</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      
      {/* Modal para asociar problemas similares */}
      <Modal show={showAssociateModal} onHide={() => setShowAssociateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Asociar Problema Similar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Selecciona un problema para asociar:</Form.Label>
            <Form.Select
              value={selectedProblemaId}
              onChange={(e) => setSelectedProblemaId(e.target.value)}
            >
              <option value="">-- Selecciona un problema --</option>
              {allProblemas.map(p => (
                <option key={p.id_problema} value={p.id_problema}>
                  #{p.id_problema}: {p.titulo} ({p.categoria})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssociateModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAssociateProblema}
            disabled={!selectedProblemaId}
          >
            Asociar
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para registrar error conocido */}
      <Modal show={showErrorKnownForm} onHide={() => setShowErrorKnownForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Error Conocido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción del Error:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={errorKnownData.descripcion}
                onChange={(e) => setErrorKnownData({...errorKnownData, descripcion: e.target.value})}
                placeholder="Describe el error en detalle"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Causa Raíz:</Form.Label>
              <Form.Control
                type="text"
                value={errorKnownData.causa_raiz}
                onChange={(e) => setErrorKnownData({...errorKnownData, causa_raiz: e.target.value})}
                placeholder="¿Cuál es la causa fundamental de este error?"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Solución (si está disponible):</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={errorKnownData.solucion}
                onChange={(e) => setErrorKnownData({...errorKnownData, solucion: e.target.value})}
                placeholder="Describe la solución o el workaround conocido"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorKnownForm(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleRegisterErrorKnown}
            disabled={!errorKnownData.descripcion || !errorKnownData.causa_raiz}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}