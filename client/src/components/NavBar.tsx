// src/Menu.js
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import portada from '../assets/Nav-CdeO2.png';
import { FaUser } from 'react-icons/fa';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar
      expand="xxl"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="d-flex flex-column sticky-top" // Clave: convierte el Navbar en un contenedor de columna
      style={{
        backgroundImage: `url(${portada})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        height: '150px',
      }}
    >
      {/* Fila superior: Botón de menú y perfil */}
      <Container fluid className="d-flex justify-content-between align-items-center flex-grow-1" style={{
        position: 'absolute',
        top: '5px',
      }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-flex flex-column align-items-center">
          <span className="navbar-toggler-icon"></span>
          <small className="mt-1">MENÚ</small>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav" style={{ backgroundColor: 'rgba(255, 204, 0, 0.8)', fontWeight: 'bold' }}>
          <Nav className="me-auto text-center">
            <Nav.Link as={Link} to="/">INICIO</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">LA COMUNIDAD</Nav.Link>
            <Nav.Link as={Link} to="/cultura">CULTURA</Nav.Link>
            <Nav.Link as={Link} to="/educacion">EDUCACIÓN</Nav.Link>
            <Nav.Link as={Link} to="/ventas">MERCADO</Nav.Link>
            <Nav.Link as={Link} to="/trueques">TRUEQUES</Nav.Link>
            <Nav.Link as={Link} to="/gratiferia">GRATIFERIA</Nav.Link>
            <Nav.Link as={Link} to="/servicios">SERVICIOS</Nav.Link>
            <Nav.Link as={Link} to="/trabajos">TRABAJOS</Nav.Link>
            <Nav.Link as={Link} to="/viajes">VIAJES</Nav.Link>
            <Nav.Link as={Link} to="/animales">MASCOTAS</Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              <FaUser className="mb-1" size={40} color="#6b2985" />
              <small >PERFIL</small>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {!expanded && (
          <Nav.Link as={Link} to="/perfil" className="ms-auto d-flex flex-column align-items-center">
            <FaUser className="mb-1 mt-1" size={36} color="#6b2985" />
            <small style={{ color: '#6b2985', fontSize: '18px' }}>PERFIL</small>
          </Nav.Link>
        )}
      </Container>

      {/* Fila inferior: Barra de búsqueda que ocupa todo el ancho */}
      {!expanded && (
        <div style={{
          position: 'absolute',
          bottom: '5px',
          left: 0,
          width: '100%',
          padding: '0 16px',
        }}>
          <Container fluid>
            <Form className="d-flex w-100">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2 buscar"
                aria-label="Search"
              />
              <Button className='botonVioleta'>Buscar</Button>
            </Form>
          </Container>
        </div>
      )}
    </Navbar>
  );
}

export default NavBar;