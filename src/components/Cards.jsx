import { Button, Card, Col, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

const ColoresCard = ({ color, onDelete, onEdit }) => {
  const style = {
    backgroundColor: color.toLowerCase(),
  };

  const [mostrarmodal, setMostrarmodal] = useState(false);
  const [coloreditado, setColoreditado] = useState(color);

  const handleBorrar = () => {
    onDelete(color);
  };

  const handleEditar = () => {
    setMostrarmodal(true);
  };

  const handleCerrarModal = () => {
    setMostrarmodal(false);
    setColoreditado(color);
  };

  const handleGuardarCambios = () => {
    onEdit(color, coloreditado);
    setMostrarmodal(false);
  };

  const handleCambioColor = (e) => {
    setColoreditado(e.target.value);
  };

  return (
    <Col md={4} className="mb-3">
      <Card className="text-center w-auto contenedorColor">
        <Card.Body>
          <Card.Title className="pb-3">{color}</Card.Title>
          <div className="d-flex justify-content-center">
            <div className="recuadroColor" style={style}></div>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
          <Button variant="warning me-3" className="my-1 boton" onClick={handleEditar}>
              Editar
            </Button>
            <Button variant="danger" className="my-1 boton" onClick={handleBorrar}>
              Borrar
            </Button>  
          </div>
        </Card.Body>
      </Card>

      <Modal show={mostrarmodal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={coloreditado}
            onChange={handleCambioColor}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ColoresCard;
