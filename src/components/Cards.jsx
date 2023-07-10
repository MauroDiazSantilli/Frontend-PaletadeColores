import { Button, Card, Col } from 'react-bootstrap';

const ColoresCard = ({ color, onDelete }) => {
  const style = {
    backgroundColor: color.toLowerCase(),
  };

  const handleDelete = () => {
    onDelete(color);
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
            <Button variant="danger" className="my-1 boton" onClick={handleDelete}>
              Borrar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ColoresCard;