import { useEffect, useState } from "react";
import { CATEGORIAS } from "../types";
import type { Post, Categoría } from "../types";

// Definición de las Props (usamos tu Enum de Categoría)
interface MostrarPublicacionesProps {
  filtroCategoria?: Categoría;
}

export default function MostrarPublicaciones({ filtroCategoria }: MostrarPublicacionesProps) {
  const [publicaciones, setPublicaciones] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgAmpliada, setImgAmpliada] = useState<string | null>(null);

  // Cargamos los datos al montar el componente o cambiar el filtro
  useEffect(() => {
    fetchPublicaciones();
  }, [filtroCategoria]);

  const fetchPublicaciones = async () => {
    try {
      setLoading(true);
      // Usamos tu variable de entorno de Vite
      const response = await fetch('http://localhost:3001/api/posts');
      const data = await response.json();
      setPublicaciones(data);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para contactar por WhatsApp (adaptada para Web)
  const handleContactPress = (telefono?: string) => {
    if (!telefono) {
      alert("El usuario no ha proporcionado un número de teléfono.");
      return;
    }
    const numeroLimpio = telefono.replace(/[\s-()]/g, '');
    window.open(`https://wa.me/${numeroLimpio}`, '_blank');
  };

  // Lógica de filtrado
  const publicacionesFiltradas = filtroCategoria
    ? publicaciones.filter((p) => p.categoria === filtroCategoria)
    : publicaciones;

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {publicacionesFiltradas.length > 0 ? (
            publicacionesFiltradas.map((post) => (
              <div className="col" key={post.id}>
                <div className="card h-100 shadow-sm border-0">
                  {/* Imagen (con click para ampliar) */}
                  <img
                    src={post.image || 'https://via.placeholder.com/300x200?text=Costa+de+Oro'}
                    className="card-img-top"
                    alt={post.titulo}
                    style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => setImgAmpliada(post.image || '')}
                  />
                  
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge ${
                        post.categoria === CATEGORIAS.PATITAS ? 'bg-danger' : 
                        post.categoria === CATEGORIAS.MERCADO ? 'bg-primary' : 'bg-warning'
                      }`}>
                        {post.categoria}
                      </span>
                      <small className="text-muted">📍 {post.localidad.replace(/_/g, ' ')}</small>
                    </div>

                    <h5 className="card-title fw-bold">{post.titulo}</h5>
                    <p className="card-text text-secondary text-truncate-2">
                      {post.contenido}
                    </p>

                    <div className="d-grid gap-2 mt-3">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleContactPress(post.author?.telefono)}
                      >
                        CONTACTAR WHATSAPP
                      </button>
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent border-0 text-muted">
                    <small>Publicado por: {post.author?.nombre}</small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5 text-muted">
              <p>No hay publicaciones en esta categoría para la Costa de Oro.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de Imagen Ampliada (Usando Clases de Bootstrap) */}
      {imgAmpliada && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setImgAmpliada(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0">
              <img src={imgAmpliada} className="img-fluid rounded" alt="Ampliada" />
              <button 
                className="btn btn-light mt-3 mx-auto" 
                onClick={() => setImgAmpliada(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}