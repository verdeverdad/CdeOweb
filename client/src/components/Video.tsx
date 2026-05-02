import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface VideoHeroProps {
  videoId: string;
  titulo?: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ videoId, titulo = "YouTube video player" }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playlist=${videoId}&loop=1`;

  return (
    <Row className="mb-4">
      {/* Solo usamos las clases de Bootstrap. "ratio-16x9" mantiene la forma perfecta siempre */}
      <Col>
        <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden">
          <iframe
            src={embedUrl}
            title={titulo}
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHero;