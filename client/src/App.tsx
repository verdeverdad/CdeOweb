import './App.css'
import ComunidadCard from './components/Card'
import NavBar from "./components/NavBar"
import img from './assets/hero.png'
import img2 from './assets/sello_new.png'
import VideoHero from './components/Video'
import Row from 'react-bootstrap/esm/Row'
import { Col } from 'react-bootstrap'

function App() {

  return (
    <><NavBar></NavBar>
      <VideoHero videoId="hYAOS2ZkfN8" titulo="Video de prueba"></VideoHero>

      <ComunidadCard titulo={'prueba'} descripcion={'es una prueba'} fechaPublicacion={'hoy'} imagenUrl={img} onVerMas={function (): void {
        throw new Error('Function not implemented.')
      }}></ComunidadCard>
      <ComunidadCard titulo={'prueba2'} descripcion={'es una prueba2'} fechaPublicacion={'hoy2'} imagenUrl={img2} onVerMas={function (): void {
        throw new Error('Function not implemented.')
      }}></ComunidadCard>
       <Row className="mb-4">
      {/* Solo usamos las clases de Bootstrap. "ratio-16x9" mantiene la forma perfecta siempre */}
      <Col>
        <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden">
          <iframe src="https://www.google.com/maps/d/embed?mid=1qE9a4cb6S1a3dFzRKKzFtbjoUTs8ALA&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>
        </div>
      </Col>
    </Row>
    </>
  )
}

export default App
