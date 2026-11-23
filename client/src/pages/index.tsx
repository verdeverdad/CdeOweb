import { Container } from "react-bootstrap"
import Mapa from "../components/Mapa"
import MostrarPublicaciones from "../components/MostrarPubliaciones"
import VideoHero from "../components/Video"
import '../css/formularioPost.css'

export default function Home() {
  return (<>
    <Container fluid="md" className="px-3">
      <VideoHero videoId="YiCP79bBQCQ" titulo="Video de presentacion de la comunidad"></VideoHero>

      <Mapa></Mapa>
      <MostrarPublicaciones filtroCategoria="MERCADO" />
      <MostrarPublicaciones filtroCategoria="CULTURA" />
      <MostrarPublicaciones filtroCategoria="ENCONTRANDO_PATITAS" />
    </Container>
  </>)
}