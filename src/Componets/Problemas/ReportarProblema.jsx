import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';

export function ReportarProblema() {
  const [problema, setProblema] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    prioridad: 'media',
    imagenes: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblema({
      ...problema,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el problema a la base de datos
    console.log('Problema reportado:', problema);
    // Resetear formulario o redirigir
  };

  return (
    <Container className="mt-4">
      <h2>Reportar Nuevo Problema</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control 
                type="text" 
                name="titulo" 
                value={problema.titulo} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                name="descripcion" 
                value={problema.descripcion} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select 
                name="categoria" 
                value={problema.categoria} 
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="red">Red</option>
                <option value="seguridad">Seguridad</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select 
                name="prioridad" 
                value={problema.prioridad} 
                onChange={handleChange}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Reportar Problema
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}