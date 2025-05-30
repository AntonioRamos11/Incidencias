import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function AsociarProblemas() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const problemaId = searchParams.get('id');
  
  const [problemaActual, setProblemaActual] = useState(null);
  const [problemasSimilares, setProblemasSimilares] = useState([]);
  const [problemasSeleccionados, setProblemasSeleccionados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState(null);
  
  // Cargar problema actual
  useEffect(() => {
    if (problemaId) {
      // Implementar llamada a API aquí para cargar el problema actual
      // En este ejemplo usamos datos de muestra
      setProblemaActual({
        id: problemaId,
        titulo: 'Equipo no enciende',
        descripcion: 'El equipo no muestra señales de energía',
        categoria: 'hardware',
      });
      
      // Cargar problemas similares (simulado)
      setProblemasSimilares([
        { id: 2, titulo: 'PC no arranca', categoria: 'hardware' },
        { id: 3, titulo: 'Monitor sin señal', categoria: 'hardware' },
        { id: 4, titulo: 'Equipo se apaga solo', categoria: 'hardware' }
      ]);
    }
  }, [problemaId]);
  
  const handleCheckboxChange = (e, problemaId) => {
    if (e.target.checked) {
      setProblemasSeleccionados([...problemasSeleccionados, problemaId]);
    } else {
      setProblemasSeleccionados(
        problemasSeleccionados.filter(id => id !== problemaId)
      );
    }
  };
  
  const handleBuscar = (e) => {
    e.preventDefault();
    // Implementar lógica de búsqueda de problemas similares
    console.log('Buscando:', busqueda);
    // Simulación de resultados
    setProblemasSimilares([
      { id: 5, titulo: 'Problema relacionado con ' + busqueda, categoria: 'hardware' },
      { id: 6, titulo: 'Incidencia de ' + busqueda, categoria: 'software' }
    ]);
  };
  
  const handleAsociar = () => {
    if (problemasSeleccionados.length === 0) {
      setMensaje({
        tipo: 'warning',
        texto: 'Debe seleccionar al menos un problema para asociar'
      });
      return;
    }
    
    // Aquí implementaría la lógica para asociar problemas
    console.log('Asociando problemas:', {
      problemaActual: problemaId,
      problemasAsociados: problemasSeleccionados
    });
    
    setMensaje({
      tipo: 'success',
      texto: 'Problemas asociados correctamente'
    });
    
    // Redirigir después de un tiempo
    setTimeout(() => {
      navigate('/problemas');
    }, 2000);
  };
  
  if (!problemaActual) {
    return <Container className="mt-4"><p>Cargando...</p></Container>;
  }

  return (
    <Container className="mt-4">
      <h2>Asociar Problemas Similares</h2>
      
      {mensaje && (
        <Alert variant={mensaje.tipo} onClose={() => setMensaje(null)} dismissible>
          {mensaje.texto}
        </Alert>
      )}
      
      <Card className="mb-4">
        <Card.Header>Problema Actual</Card.Header>
        <Card.Body>
          <Card.Title>{problemaActual.titulo}</Card.Title>
          <Card.Text>
            {problemaActual.descripcion}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            Categoría: {problemaActual.categoria}
          </Card.Subtitle>
        </Card.Body>
      </Card>
      
      <Card className="mb-4">
        <Card.Header>Buscar Problemas Similares</Card.Header>
        <Card.Body>
          <Form onSubmit={handleBuscar}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar por palabras clave"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">Buscar</Button>
          </Form>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Header>Problemas Similares</Card.Header>
        <ListGroup variant="flush">
          {problemasSimilares.length > 0 ? (
            problemasSimilares.map(problema => (
              <ListGroup.Item key={problema.id}>
                <Form.Check
                  type="checkbox"
                  id={`problema-${problema.id}`}
                  label={`${problema.titulo} (${problema.categoria})`}
                  onChange={(e) => handleCheckboxChange(e, problema.id)}
                  checked={problemasSeleccionados.includes(problema.id)}
                />
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No se encontraron problemas similares</ListGroup.Item>
          )}
        </ListGroup>
        <Card.Footer>
          <Button 
            variant="success" 
            onClick={handleAsociar}
          >
            Asociar Problemas Seleccionados
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}