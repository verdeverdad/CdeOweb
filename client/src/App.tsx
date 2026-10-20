import './App.css'
import NavBar from "./components/NavBar"
import { Route, Routes } from 'react-router-dom' // 👈 Quitamos 'BrowserRouter as Router'
import Home from './pages/index'
import Cultura from './pages/cultura'
import Mascotas from './pages/encontrando_patitas.'
import Mercado from './pages/mercado'
import Viajes from './pages/viajes'
import Perfil from './pages/perfil'
import Post from './pages/post'
import CrearPost from './pages/CrearPost'
import BotonFlotante from './components/botonFlotante'
import OficiosYServicios from './pages/oficios_y_servicios'
import Comunidad from './pages/la_comunidad'

function App() {
  return (
    <> {/* Usamos fragmento o nada, pero NO <Router> */}
      <NavBar />
      <BotonFlotante />
      <Routes>
        {/* LA HOME */}
        <Route path="/" element={<Home />} />

        {/* LAS CATEGORÍAS */}
        <Route path="/la_comunidad" element={<Comunidad />} />
        <Route path="/encontrando_patitas" element={<Mascotas />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/mercado" element={<Mercado />} />
        <Route path="/oficios_y_servicios" element={<OficiosYServicios />} />
        <Route path="/viajes" element={<Viajes />} />
        <Route path="/publicaciones/:id" element={<Post />} />
        <Route path="/crearPost" element={<CrearPost />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>

    </>
  )
}

export default App