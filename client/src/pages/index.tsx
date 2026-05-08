import { Col, Container, Row } from "react-bootstrap"
import { CrearPost } from "../components/CreatePost"
import Mapa from "../components/Mapa"
import MostrarPublicaciones from "../components/MostrarPubliaciones"
import ComunidadCard from "../components/Card"
import VideoHero from "../components/Video"
import img from '../assets/profesiones.png'
import img2 from '../assets/eventos_com.png'
import { CATEGORIAS } from "../types"

export default function Home() {
    return (<>
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
        <Mapa></Mapa>
        <CrearPost></CrearPost>
        <MostrarPublicaciones filtroCategoria={CATEGORIAS.MERCADO} />
        <MostrarPublicaciones filtroCategoria={CATEGORIAS.CULTURA} />
        <MostrarPublicaciones filtroCategoria={CATEGORIAS.PATITAS} />

      </Container>
      </>)
}