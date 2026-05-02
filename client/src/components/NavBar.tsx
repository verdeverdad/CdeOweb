import { useState, useEffect, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import portada from '../assets/Nav-CdeO2.png';
import PerfilIcon from '../assets/Perfil.svg';
import MenuIcon from '../assets/menu.svg';
import '../App.css';

const NavBar = (): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const location = useLocation();

  // Cerramos el menú al cambiar de ruta
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar
      expand="xxl"
      expanded={expanded}
      onToggle={(nextExpand: boolean) => setExpanded(nextExpand)}
      className="sticky-top p-0"
      style={{
        backgroundImage: `url(${portada})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container fluid className="d-flex flex-column justify-content-between h-100 py-2" style={{ minHeight: '150px' }}>

        {/* SECCIÓN SUPERIOR */}
        <div className="d-flex justify-content-between align-items-center w-100">
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ zIndex: 1020 }}>
            <div className="d-flex flex-column align-items-center">
              <img src={MenuIcon} alt="Menú" width={50} height={50} /><b></b>
              <small className="fw-bold" style={{ fontSize: '18px', color: 'var(--blanco)' }}>MENÚ</small>
            </div>
          </Navbar.Toggle>

          <Nav.Link as={Link} to="/perfil" className="d-flex flex-column align-items-center" style={{ zIndex: 1020 }}>
            <div className="d-flex flex-column align-items-center">
              <img src={PerfilIcon} alt="Perfil" width={50} height={50} />
              <small style={{ color: 'var(--blanco)', fontSize: '18px', fontWeight: 'bold' }}>PERFIL</small>
            </div>
          </Nav.Link>
        </div>

        {/* MENÚ COLAPSABLE */}
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <Nav className="mx-auto text-center w-100 my-2 p-3" style={{ backgroundColor: 'rgba(255, 204, 0, 0.95)', borderRadius: '10px' }}>
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

            <hr className="bg-dark" />
            <Nav.Link as={Link} to="/perfil" className="d-flex flex-column align-items-center pt-2">
              <img src={PerfilIcon} alt="Perfil" width={40} height={40} />
              <span style={{ color: 'var(--violeta)', fontWeight: 'bold' }}>MI PERFIL</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* SECCIÓN INFERIOR */}
        <div className="w-100 mt-auto pb-1">
          <Form className="d-flex w-100" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Buscar en Costa de Oro..."
              className="me-2 buscar"
              style={{ borderRadius: '20px' }}
            />
            <Button type="submit" className='botonVioleta'>Buscar</Button>
          </Form>
        </div>

      </Container>
    </Navbar>
  );
};

export default NavBar;