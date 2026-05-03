import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import InstaIcon from '../assets/Instagram.png';
import WppIcon from '../assets/WhatsApp.png';
import WebIcon from '../assets/Facebook.png';
// Definimos la interfaz para mantener el orden de TypeScript
interface ComunidadCardProps {
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
  imagenUrl: string;
  categoria?: string;
  onVerMas: () => void;
}

const ComunidadCard: React.FC<ComunidadCardProps> = ({
  titulo,
  descripcion,
  fechaPublicacion,
  imagenUrl,
  categoria,
  onVerMas
}) => {
  return (
    <Card className="h-100 shadow-sm p-3" style={{ borderRadius: '15px', overflow: 'hidden',borderColor: 'var(--violeta)', borderWidth: '2px', borderStyle: 'solid' }}>
      {/* Imagen con estilo grabado - Aseguramos el ratio para que no se deforme */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
        <Card.Img 
          variant="top" 
          src={imagenUrl} 
          alt={`Icono de ${titulo}`}
          style={{ width: '200px', height: '200px', objectFit: 'contain' }} 
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {categoria && (
            <Badge bg="secondary" className="text-uppercase" style={{ fontSize: '0.7rem' }}>
              {categoria}
            </Badge>
          )}
          <small className="text-muted" aria-label={`Publicado el ${fechaPublicacion}`}>
            {fechaPublicacion}
          </small>
        </div>

        <Card.Title className="fw-bold" style={{ color: '#4b0082' }}>
          {titulo}
        </Card.Title>

        <Card.Text className="text-secondary flex-grow-1 mb-3">
          {/* Truncamos el texto si es muy largo para mantener la estética */}
          {descripcion.length > 70 ? `${descripcion.substring(0, 70)}...` : descripcion}
        </Card.Text>

        <div className="redes-container m-1" >
          <a href="https://wa.me/tu-numero" target="_blank" rel="noreferrer">
            <img src={WppIcon} alt="WhatsApp" className="icono-red"/>
          </a>
          <a href="https://instagram.com/tu-cuenta" target="_blank" rel="noreferrer">
            <img src={InstaIcon} alt="Instagram" className="icono-red"/>
          </a>
          <a href="#web" target="_blank" rel="noreferrer">
            <img src={WebIcon} alt="Web" className="icono-red"/>
          </a>
        </div>

        <Button 
          variant="primary" 
          onClick={onVerMas}
          className="mt-3 w-100 fw-bold"
          style={{ borderRadius: '10px', backgroundColor: 'var(--violeta)', border: 'none', color: 'var(--blanco)' }}
          aria-label={`Ver más detalles sobre ${titulo}`}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ComunidadCard;