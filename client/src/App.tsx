import './App.css'
import NavBar from "./components/NavBar"
import { Container } from 'react-bootstrap'
import MostrarPublicaciones from './components/MostrarPubliaciones'
import { CATEGORIAS } from './types'
import { Route, Routes } from 'react-router-dom' // 👈 Quitamos 'BrowserRouter as Router'
import Home from './pages/index'
import Cultura from './pages/cultura'

function App() {
  return (
    <> {/* Usamos fragmento o nada, pero NO <Router> */}
      <NavBar />
      <Routes>
        {/* LA HOME */}
        <Route path="/" element={<Home />} />

        {/* LAS CATEGORÍAS */}
        <Route path="/ventas" element={
          <Container className="mt-4">
            <MostrarPublicaciones filtroCategoria={CATEGORIAS.MERCADO} />
          </Container>
        } />

        <Route path="/cultura" element={<Cultura />} />

        <Route path="/animales" element={
          <Container className="mt-4">
            <MostrarPublicaciones filtroCategoria={CATEGORIAS.PATITAS} />
          </Container>
        } />

        <Route path="/perfil" element={<Container className="mt-4"><h3>Mi Perfil</h3></Container>} />
      </Routes>
    </>
  )
}

export default App