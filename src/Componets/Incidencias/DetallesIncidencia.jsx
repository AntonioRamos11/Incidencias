import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function DetallesIncidencia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incidencia, setIncidencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        setLoading(true);
        console.log("Solicitando detalles de incidencia:", id);
        
        const response = await axios.get('http://localhost:3000/DetalleIncidencia2', {
          params: { id_incidencia: id }
        });
        
        console.log("Datos recibidos:", response.data);
        
        if (response.data) {
          setIncidencia(response.data);
        } else {
          setError('No se encontraron datos para esta incidencia');
        }
      } catch (err) {
        console.error('Error al cargar los detalles de la incidencia:', err);
        setError('Error al cargar los detalles. Por favor, intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchDetalles();
    }
  }, [id]);
  
  const formatFecha = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    return date.toLocaleDateString('es-ES', {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit'
    });
  };
  
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Enviado': return 'secondary';
      case 'En Proceso': return 'warning';
      case 'Terminado': return 'success';
      case 'Liberado': return 'info';
      case 'Rechazado': return 'danger';
      default: return 'dark';
    }
  };
  
  return (
    <Container className="mt-4 mb-5">
      <Button 
        variant="outline-secondary" 
        className="mb-3"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </Button>
      
      <h2 className="mb-4">Detalles de la Incidencia #{id}</h2>
      
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Cargando detalles...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : incidencia ? (
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0">Información General</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><strong>Tipo:</strong> {incidencia.nombreIncidencia || 'No especificado'}</p>
                <p><strong>Descripción:</strong> {incidencia.descripcion || 'Sin descripción'}</p>
                <p><strong>Fecha:</strong> {formatFecha(incidencia.fecha)}</p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <Badge bg={getEstadoBadge(incidencia.estado || 'Pendiente')}>
                    {incidencia.estado || 'Pendiente'}
                  </Badge>
                </p>
              </Col>
              <Col md={6}>
                <p><strong>Departamento:</strong> {incidencia.nombre_departamento || 'No asignado'}</p>
                {incidencia.nombre_usuario && (
                  <p><strong>Técnico Asignado:</strong> {incidencia.nombre_usuario}</p>
                )}
                {incidencia.nombre_prioridad && (
                  <p><strong>Prioridad:</strong> {incidencia.nombre_prioridad}</p>
                )}
                {incidencia.ubicacion_esp && (
                  <p><strong>Ubicación:</strong> {incidencia.ubicacion_esp}</p>
                )}
              </Col>
            </Row>
            
            {incidencia.comentarios && (
              <div className="mt-4 p-3 bg-light rounded">
                <h5>Comentarios del Técnico</h5>
                <p className="mb-0">{incidencia.comentarios}</p>
              </div>
            )}
            
            {/* Si hay información adicional disponible */}
            {(incidencia.nombre_edificio || incidencia.responsable) && (
              <div className="mt-4">
                <h5>Información adicional</h5>
                <Row>
                  <Col md={6}>
                    {incidencia.nombre_edificio && (
                      <p><strong>Edificio:</strong> {incidencia.nombre_edificio}</p>
                    )}
                  </Col>
                  <Col md={6}>
                    {incidencia.responsable && (
                      <p><strong>Responsable:</strong> {incidencia.responsable}</p>
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        <div className="alert alert-info">No se encontraron detalles para esta incidencia.</div>
      )}
    </Container>
  );
}