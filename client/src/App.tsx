import './App.css'
import ComunidadCard from './components/Card'
import NavBar from "./components/NavBar"
import img from './assets/hero.png'
import img2 from './assets/sello_new.png'
import VideoHero from './components/Video'

function App() {

  return (
    <><NavBar></NavBar>
    <ComunidadCard titulo={'prueba'} descripcion={'es una prueba'} fechaPublicacion={'hoy'} imagenUrl={img} onVerMas={function (): void {
        throw new Error('Function not implemented.')
      } }></ComunidadCard>
      <ComunidadCard titulo={'prueba2'} descripcion={'es una prueba2'} fechaPublicacion={'hoy2'} imagenUrl={img2} onVerMas={function (): void {
        throw new Error('Function not implemented.')
      } }></ComunidadCard>
      <VideoHero videoId="hYAOS2ZkfN8" titulo="Video de prueba"></VideoHero>
    </>
  )
}

export default App
