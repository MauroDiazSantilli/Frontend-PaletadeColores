import { Button, Form, Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ColoresCard from './Cards';
import { API_URL, obtenerColores, agregarColor, eliminarColor, editarColor } from './helpers/queries';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (color.trim() !== '') {
      if (colorEditado) {
        try {
          const respuesta = await fetch(`${API_URL}/colores/${colorEditado.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: color }),
          });
    
          if (!respuesta.ok) {
            throw new Error('Error al editar el color');
          }
    
          const colorEditado = await respuesta.json();
          const coloresActualizados = coloresGuardados.map((col) =>
            col.id === colorEditado.id ? colorEditado : col
          );
          setColoresGuardados(coloresActualizados);
          setColorEditado(null);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const respuesta = await fetch(`${API_URL}/colores`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: color }),
          });
    
          if (!respuesta.ok) {
            throw new Error('Error al agregar el color');
          }
    
          const nuevoColor = await respuesta.json();
          setColoresGuardados([...coloresGuardados, nuevoColor]);
        } catch (error) {
          console.error(error);
        }
      }
      setColor('');
    }
  };
  
  const handleDelete = async (color) => {
    try {
      const respuesta = await fetch(`${API_URL}/colores/${color.id}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar el color');
      }
  
      const coloresActualizados = coloresGuardados.filter((col) => col.id !== color.id);
      setColoresGuardados(coloresActualizados);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEdit = (color) => {
    setColorEditado(color);
    setMostrarmodal(true);
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
  {coloresGuardados.map((colorGuardado) => (
    <ColoresCard
      key={colorGuardado.id}
      color={colorGuardado.nombre} 
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  ))}
</Row>

    </Container>
  );
}

export default Colores;
