import { useNavigate } from 'react-router-dom';
import '../css/boton-flotante.css';

export default function BotonFlotante() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="boton-flotante"
      onClick={() => navigate('/crearPost')}
      aria-label="Crear una publicación"
      title="Crear una publicación"
    >Crear publicación
    </button>
  );
}
