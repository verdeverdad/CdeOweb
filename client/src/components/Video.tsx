import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface VideoHeroProps {
  videoId: string;
  titulo?: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ videoId, titulo = "YouTube video player" }) => {
  // Construimos la URL con los parámetros para que sea un loop infinito y muteado
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playlist=${videoId}&loop=1`;

  return (
    <Row className="mb-4">
      <Col className="ratio ratio-16x9 shadow-sm rounded video-responsive overflow-hidden">
        <iframe
          src={embedUrl}
          title={titulo}
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </Col>
    </Row>
  );
};

export default VideoHero;