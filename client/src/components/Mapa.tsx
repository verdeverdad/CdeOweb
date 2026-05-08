import { Col, Row } from "react-bootstrap";
import map from "../assets/mapa.png"


export default function Mapa() {
    return (
        <div className="container mt-4">
            <Row className="mb-4">
                {/* Solo usamos las clases de Bootstrap. "ratio-16x9" mantiene la forma perfecta siempre */}
                <Col>
                    <h3 className='text-center' style={{ color: 'var(--violeta)', marginBottom: '50px', marginTop: '20px' }}><img src={map} alt="Mapa de la comunidad" className="img-fluid mb-4 shadow-sm rounded" style={{ width: '90px', height: '90px' }} /><br></br>Más que un mapa,<br></br> nuestros puntos de encuentro.</h3></Col>
            </Row>
            <Row className="mb-4">

                {/* MAPA MAPA MAPA MAPA*/}
                <Col>
                    <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden" >
                        <iframe
                            src="https://www.google.com/maps/d/embed?mid=1qE9a4cb6S1a3dFzRKKzFtbjoUTs8ALA&hl=es&ehbc=2E312F"
                            style={{ border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </div>
    )
}