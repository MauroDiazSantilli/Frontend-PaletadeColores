import { Button, Card, Col, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

const ColoresCard = ({ color, onDelete, onEdit }) => {
  const style = {
    backgroundColor: color.toLowerCase(),
  };

  const [showModal, setShowModal] = useState(false);
  const [editedColor, setEditedColor] = useState(color);

  const handleDelete = () => {
    onDelete(color);
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedColor(color);
  };

  const handleSaveChanges = () => {
    onEdit(color, editedColor);
    setShowModal(false);
  };

  const handleColorChange = (e) => {
    setEditedColor(e.target.value);
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
          <Button variant="warning me-3" className="my-1 boton" onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="danger" className="my-1 boton" onClick={handleDelete}>
              Borrar
            </Button>  
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editedColor}
            onChange={handleColorChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ColoresCard;
