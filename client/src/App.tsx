import './App.css'
import NavBar from "./components/NavBar"
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom' // 👈 Quitamos 'BrowserRouter as Router'
import Home from './pages/index'
import Cultura from './pages/cultura'
import Mascotas from './pages/encontrando_patitas.'
import Mercado from './pages/mercado'
import Educacion from './pages/educacion'
import Trueques from './pages/trueques'
import Servicios from './pages/servicios'
import Trabajos from './pages/trabajos'
import Viajes from './pages/viajes'

function App() {
  return (
    <> {/* Usamos fragmento o nada, pero NO <Router> */}
      <NavBar />
      <Routes>
        {/* LA HOME */}
        <Route path="/" element={<Home />} />

        {/* LAS CATEGORÍAS */}
        <Route path="/encontrando_patitas" element={
         <Mascotas />
        } />

        <Route path="/cultura" element={<Cultura />} />
        <Route path="/mercado" element={<Mercado />} />
        <Route path="/educacion" element={<Educacion />} />
        <Route path="/trueques" element={<Trueques />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/trabajos" element={<Trabajos />} />
        <Route path="/viajes" element={<Viajes />} />

       
        <Route path="/perfil" element={<Container className="mt-4"><h3>Mi Perfil</h3></Container>} />
      </Routes>
    </>
  )
}

export default App