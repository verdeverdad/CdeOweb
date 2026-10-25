import { useEffect, useState } from "react";
import type { Post, Categoría } from "../types";
import { Link } from "react-router-dom";
import CarruselFotos from "../components/CarruselFotos";

// Definición de las Props (usamos tu Enum de Categoría)
interface MostrarPublicacionesProps {
  filtroCategoria?: Categoría;
}

const coloresCategoria: Record<Categoría, string> = {
  MERCADO: "var(--rosa)",
  CULTURA: "var(--amarillo)",
  COMUNIDAD: "var(--naranja)",
  OFICIOS_Y_SERVICIOS: "var(--turqueza)",
  VIAJES: "var(--verde)",
  ENCONTRANDO_PATITAS: "var(--violeta)",
};

const formatearFecha = (fecha?: string | null) => {
  if (!fecha) return "";

  const fechaNormalizada = fecha.includes("T")
    ? fecha
    : `${fecha}T12:00:00`;

  const fechaDate = new Date(fechaNormalizada);

  if (Number.isNaN(fechaDate.getTime())) return fecha;

  return fechaDate.toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

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

      const rawApiUrl =
        import.meta.env.VITE_API_URL ||
        "https://cdeoweb.onrender.com";

      const API_URL = rawApiUrl.trim().replace(/\/+$/, "");

      const response = await fetch(`${API_URL}/api/posts`);

      console.log("Status:", response.status);
      console.log("URL:", `${API_URL}/api/posts`);

      const texto = await response.text();

      console.log("Respuesta del servidor:", texto);

      if (!response.ok) {
        throw new Error(
          `Error HTTP ${response.status}: ${texto}`
        );
      }

      const data = JSON.parse(texto);

      console.log("✅ Éxito:", data);

      setPublicaciones(data);

    } catch (error) {
      console.error(
        "Error al obtener publicaciones:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para contactar por WhatsApp (adaptada para Web)
  {/* const handleContactPress = (telefono?: string) => {
    if (!telefono) {
      alert("El usuario no ha proporcionado un número de teléfono.");
      return;
    }
    const numeroLimpio = telefono.replace(/[\s-()]/g, '');
    window.open(`https://wa.me/${numeroLimpio}`, '_blank');
  };*/}

  // Lógica de filtrado
  const publicacionesFiltradas = filtroCategoria
    ? publicaciones.filter(
      post => post.categoria === filtroCategoria
    )
    : publicaciones;

  console.log("PUBLICACIONES:", publicaciones);
  console.log("FILTRADAS:", publicacionesFiltradas);
  console.log("filtroCategoria:", filtroCategoria);
  console.log(
    "categorias de los posts:",
    publicaciones.map(post => post.categoria)
  );

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

                <div
                  className="card h-100 shadow-sm"
                  style={{
                    border: `1px solid ${coloresCategoria[post.categoria]}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >

                  <CarruselFotos
                    fotos={Array.isArray(post.fotos) ? post.fotos : []}
                    titulo={post.titulo}
                    onAmpliar={setImgAmpliada}
                    esDetalle={false}
                  />


                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span
                        className={`badge ${post.categoria === 'ENCONTRANDO_PATITAS'
                          ? 'badge-patitas'
                          : post.categoria === 'MERCADO'
                            ? 'badge-mercado'
                            : post.categoria === 'CULTURA'
                              ? 'badge-cultura'
                              : post.categoria === 'COMUNIDAD'
                                ? 'badge-comunidad'
                                : post.categoria === 'OFICIOS_Y_SERVICIOS'
                                  ? 'badge-trabajo'
                                  : post.categoria === 'VIAJES'
                                    ? 'badge-viajes'
                                    : ''
                          }`}
                      >
                        {post.subCategoria.replaceAll("_", " ")}
                      </span>
                      <small className="text-muted">📍  {post.localidad
                        ? post.localidad.replaceAll('_', ' ')
                        : post.localidades?.length
                          ? post.localidades
                            .map((localidad) => localidad.replaceAll('_', ' '))
                            .join(', ')
                          : 'Sin localidad especificada'}</small>
                    </div>

                    <h5 className="card-title fw-bold">
                      <Link
                        to={`/publicaciones/${post.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {post.titulo}
                      </Link>
                    </h5>


                    {/* Datos destacados según la categoría */}
                    <div className="small mb-2">

                      {post.categoria === "MERCADO" && (
                        <>
                          {post.precio != null && post.precio !== "" && (
                            <p className="mb-1 fw-bold">
                              💰 ${post.precio}
                            </p>
                          )}

                          {post.queOfrece && (
                            <p className="mb-1">
                              <strong>Ofrece:</strong> {post.queOfrece}
                            </p>
                          )}

                          {post.queBusca && (
                            <p className="mb-1">
                              <strong>Busca:</strong> {post.queBusca}
                            </p>
                          )}
                        </>
                      )}

                      {post.categoria === "CULTURA" && (
                        <>
                          📅 {formatearFecha(post.fechaActividad || post.fechaInicio)}
                          {post.fechaFin && ` — ${formatearFecha(post.fechaFin)}`}

                          {post.horaActividad && (
                            <p className="mb-1">
                              🕒 {post.horaActividad}
                            </p>
                          )}

                          {post.lugarActividad && (
                            <p className="mb-1">
                              📍 {post.lugarActividad}
                            </p>
                          )}

                          {post.tipoActividad && (
                            <p className="mb-1">
                              {post.tipoActividad}
                            </p>
                          )}
                        </>
                      )}

                      {post.categoria === "VIAJES" && (
                        <>
                          {(post.origen || post.destino) && (
                            <p className="mb-1 fw-bold">
                              🚗 {post.origen || "Origen sin especificar"}
                              {" → "}
                              {post.destino || "Destino sin especificar"}
                            </p>
                          )}

                          {post.fechaViaje && (
                            <p className="mb-1">
                              📅 {formatearFecha(post.fechaViaje)}
                            </p>
                          )}

                          {post.horaViaje && (
                            <p className="mb-1">
                              🕒 {post.horaViaje}
                            </p>
                          )}

                          {post.plazasDisponibles != null && (
                            <p className="mb-1">
                              👥 Plazas disponibles: {post.plazasDisponibles}
                            </p>
                          )}
                        </>
                      )}

                      {post.categoria === "OFICIOS_Y_SERVICIOS" && (
                        <p className="mb-1">
                          📍 {post.localidades?.length
                            ? post.localidades
                              .map(localidad => localidad.replaceAll("_", " "))
                              .join(", ")
                            : post.localidad?.replaceAll("_", " ") || "Localidad no especificada"}
                        </p>
                      )}

                    </div>

                    <p className="card-text text-secondary text-truncate-2">
                      {post.contenido}
                    </p>

                    <div className="d-grid gap-2 mt-3">

                      <Link
                        to={`/publicaciones/${post.id}`}
                        className="btn btn-sm fw-bold"
                        style={{
                          backgroundColor: coloresCategoria[post.categoria],
                          borderColor: coloresCategoria[post.categoria],
                          color: post.categoria === "ENCONTRANDO_PATITAS" ? 'var(--blanco)' : "va(--negro)",
                        }}
                        aria-label={`Ver publicación: ${post.titulo}`}
                      >
                        VER PUBLICACIÓN
                      </Link>



                    </div>
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