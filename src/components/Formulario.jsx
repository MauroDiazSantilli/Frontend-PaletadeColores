import { Button, Form, Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ColoresCard from './Cards';

function Colores() {
  const [color, setColor] = useState('');
  const [coloresGuardados, setColoresGuardados] = useState([]);
  const [colorEditado, setColorEditado] = useState(null);

  useEffect(() => {
    const coloresGuardadosJSON = localStorage.getItem('coloresGuardados');
    if (coloresGuardadosJSON) {
      const coloresGuardadosArray = JSON.parse(coloresGuardadosJSON);
      setColoresGuardados(coloresGuardadosArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('coloresGuardados', JSON.stringify(coloresGuardados));
  }, [coloresGuardados]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (color.trim() !== '') {
      if (colorEditado) {
        const coloresActualizados = coloresGuardados.map((col) =>
          col === colorEditado ? color : col
        );
        setColoresGuardados(coloresActualizados);
        setColorEditado(null);
      } else {
        setColoresGuardados([...coloresGuardados, color]);
      }
      setColor('');
    }
  };

  const handleDelete = (color) => {
    const noColor = coloresGuardados.filter((item) => item !== color);
    setColoresGuardados(noColor);
  };

  const handleEdit = (color, editedColor) => {
    const coloresActualizados = coloresGuardados.map((col) =>
      col === color ? editedColor : col
    );
    setColoresGuardados(coloresActualizados);
  };

  return (
    <Container className="row justify-content-center justify-content-md-between">
      <Container className="my-5 p-0 contenedorColor">
        <p className="fs-5 fw-bold pt-4 text-center">Administrar colores</p>
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="p-4 d-flex align-items-center bg-info">
            <div className="recuadroColor"></div>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de un color en inglés. Ej: Crimson"
              className="w-75 ms-3"
              value={color}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mx-4 my-3 boton">
              {colorEditado ? 'Guardar Cambios' : 'Enviar'}
            </Button>
          </div>
        </Form>
      </Container>
      <Row>
        {coloresGuardados.map((colorGuardado, index) => (
          <ColoresCard
            key={index}
            color={colorGuardado}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Colores;
