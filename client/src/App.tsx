import './App.css'
import ComunidadCard from './components/Card'
import NavBar from "./components/NavBar"
import img from './assets/profesiones.png'
import img2 from './assets/eventos_com.png'
import VideoHero from './components/Video'
import { Container, Row, Col } from 'react-bootstrap'
import map from "./assets/mapa.png"
import { CrearPost } from './components/CreatePost'

function App() {

  return (
    <><NavBar></NavBar>
      <Container fluid="md" className="px-3">
        <VideoHero videoId="hYAOS2ZkfN8" titulo="Video de prueba"></VideoHero>
        <Row className="g-4 my-4">
          <Col xs={12} md={6}>
            <ComunidadCard titulo={'prueba'} descripcion={'es una prueba, es una prueba, es una prueba,es una prueba,es una prueba,es una prueba,es una prueba'} fechaPublicacion={'Domingo 26 de febrero de 2026 20:30hs'} imagenUrl={img} onVerMas={function (): void {
              throw new Error('Function not implemented.')
            }}></ComunidadCard>
          </Col>
          <Col xs={12} md={6}>
            <ComunidadCard titulo={'RITUALES COLECTIVOS'} descripcion={'Ritualito comunal, Ritualito comunal, Ritualito comunal'} fechaPublicacion={'Martes 20 de febrero de 2026 14:30hs'} imagenUrl={img2} onVerMas={function (): void {
              throw new Error('Function not implemented.')
            }}></ComunidadCard></Col>
        </Row>
        <Row className="mb-4">
          {/* Solo usamos las clases de Bootstrap. "ratio-16x9" mantiene la forma perfecta siempre */}

          <Col>
            
          
            <h3 className='text-center' style={{ color: 'var(--violeta)', marginBottom: '50px', marginTop: '20px' }}><img src={map} alt="Mapa de la comunidad" className="img-fluid mb-4 shadow-sm rounded" style={{ width: '90px', height: '90px'}}/><br></br>Más que un mapa,<br></br> nuestros puntos de encuentro.</h3></Col>
            </Row>
        <Row className="mb-4">
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
        <CrearPost></CrearPost>
      </Container>
    </>
  )
}

export default App
