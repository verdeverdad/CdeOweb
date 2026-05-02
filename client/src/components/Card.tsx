import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

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
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
      {/* Imagen con estilo grabado - Aseguramos el ratio para que no se deforme */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
        <Card.Img 
          variant="top" 
          src={imagenUrl} 
          alt={`Icono de ${titulo}`}
          style={{ width: '280px', height: '280px', objectFit: 'contain' }} 
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

        <Card.Text className="text-secondary flex-grow-1">
          {/* Truncamos el texto si es muy largo para mantener la estética */}
          {descripcion.length > 100 ? `${descripcion.substring(0, 100)}...` : descripcion}
        </Card.Text>

        <Button 
          variant="primary" 
          onClick={onVerMas}
          className="mt-3 w-100 fw-bold"
          style={{ borderRadius: '10px', backgroundColor: '#ffcc00', border: 'none', color: '#000' }}
          aria-label={`Ver más detalles sobre ${titulo}`}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ComunidadCard;