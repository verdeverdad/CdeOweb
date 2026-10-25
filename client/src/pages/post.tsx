import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post as PostType } from "../types";
import EditarPost from "../components/editarPost";
import CarruselFotos from "../components/CarruselFotos";
import VolverAtras from "../components/BackButton";

interface UsuarioActual {
    id: string;
    rol: string;
}

const coloresCategoria: Record<PostType["categoria"], string> = {
    MERCADO: "var(--rosa)",
    CULTURA: "var(--amarillo)",
    COMUNIDAD: "var(--naranja)",
    OFICIOS_Y_SERVICIOS: "var(--turqueza)",
    VIAJES: "var(--verde)",
    ENCONTRANDO_PATITAS: "var(--violeta)",
};

const clasesBadgeCategoria: Record<PostType["categoria"], string> = {
    MERCADO: "badge-mercado",
    CULTURA: "badge-cultura",
    COMUNIDAD: "badge-comunidad",
    OFICIOS_Y_SERVICIOS: "badge-trabajo",
    VIAJES: "badge-viajes",
    ENCONTRANDO_PATITAS: "badge-patitas",
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

export default function Post() {
    const { id } = useParams<{ id: string }>();

    const [publicacion, setPublicacion] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [usuarioActual, setUsuarioActual] = useState<UsuarioActual | null>(null);
    const [editando, setEditando] = useState(false);
    const [imgAmpliada, setImgAmpliada] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No se indicó el ID de la publicación.");
            setLoading(false);
            return;
        }

        const fetchPublicacion = async () => {
            try {
                const rawApiUrl =
                    import.meta.env.VITE_API_URL ||
                    "https://cdeoweb.onrender.com";
                const API_URL = rawApiUrl.trim().replace(/\/+$/, "");
                const response = await fetch(`${API_URL}/api/posts/${id}`);

                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? "No se encontró la publicación."
                            : "No se pudo cargar la publicación."
                    );
                }

                const data: PostType = await response.json();
                setPublicacion(data);
            } catch (error) {
                console.error("Error al cargar la publicación:", error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "Ocurrió un error inesperado."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPublicacion();
    }, [id]);

    useEffect(() => {
        const consultarSesion = async () => {
            try {
                const rawApiUrl =
                    import.meta.env.VITE_API_URL ||
                    "https://cdeoweb.onrender.com";
                const API_URL = rawApiUrl.trim().replace(/\/+$/, "");
                const response = await fetch(`${API_URL}/api/users/me`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    setUsuarioActual(null);
                    return;
                }

                const data = await response.json();
                setUsuarioActual({
                    id: data.user.id,
                    rol: data.user.role,
                });
            } catch (error) {
                console.error("Error al consultar la sesión:", error);
                setUsuarioActual(null);
            }
        };

        consultarSesion();
    }, []);

    const eliminarPublicacion = async () => {
        const confirmar = window.confirm(
            "¿Estás segura de que querés eliminar esta publicación? Esta acción no se puede deshacer."
        );

        if (!confirmar) return;

        try {
            const rawApiUrl =
                import.meta.env.VITE_API_URL ||
                "https://cdeoweb.onrender.com";
            const API_URL = rawApiUrl.trim().replace(/\/+$/, "");
            const response = await fetch(
                `${API_URL}/api/posts/${publicacion?.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudo eliminar la publicación."
                );
            }

            window.location.href = "/";
        } catch (error) {
            console.error("Error al eliminar la publicación:", error);
            window.alert(
                error instanceof Error
                    ? error.message
                    : "Ocurrió un error inesperado."
            );
        }
    };

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <p>Cargando publicación...</p>
            </div>
        );
    }

    if (error || !publicacion) {
        return (
            <div className="container mt-4">
                <p className="alert alert-warning">
                    {error || "No se encontró la publicación."}
                </p>
            </div>
        );
    }

    const esAutor =
        !!usuarioActual &&
        usuarioActual.id === publicacion.author.id;
    const esSuperAdmin = usuarioActual?.rol === "SUPER_ADMIN";
    const puedeEditar = esAutor || esSuperAdmin;
    const localidades = publicacion.localidad
        ? publicacion.localidad.replaceAll("_", " ")
        : publicacion.localidades?.length
            ? publicacion.localidades
                .map((localidad) => localidad.replaceAll("_", " "))
                .join(", ")
            : "Sin localidad especificada";

    return (
        <main className="container mt-4 mb-5">
            <VolverAtras></VolverAtras>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                    <article
                        className="card  shadow-sm"
                        style={{
                            border: `1px solid ${coloresCategoria[publicacion.categoria]}`,
                            borderRadius: "12px",
                            overflow: "hidden",
                        }}
                    >
                        {editando ? (
                            <div className="card-body p-4">
                                <EditarPost
                                    publicacion={publicacion}
                                    onCancelar={() => setEditando(false)}
                                    onGuardado={(publicacionActualizada) => {
                                        setPublicacion(publicacionActualizada);
                                        setEditando(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <CarruselFotos
                                    fotos={Array.isArray(publicacion.fotos) ? publicacion.fotos : []}
                                    titulo={publicacion.titulo}
                                    onAmpliar={setImgAmpliada}
                                    esDetalle={true}
                                />

                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
                                        <span className={`badge ${clasesBadgeCategoria[publicacion.categoria]}`}>
                                            {publicacion.subCategoria.replaceAll("_", " ")}
                                        </span>
                                        <small className="text-muted text-end">
                                            📍 {localidades}
                                        </small>
                                    </div>

                                    <h1 className="card-title fw-bold">
                                        {publicacion.titulo}
                                    </h1>

                                    {puedeEditar && (
                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => setEditando(true)}
                                            >
                                                Editar publicación
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={eliminarPublicacion}
                                            >
                                                Eliminar publicación
                                            </button>
                                        </div>
                                    )}

                                    <div className="small mb-3">
                                        {publicacion.categoria === "MERCADO" && (
                                            <>
                                                {publicacion.precio != null && publicacion.precio !== "" && (
                                                    <p className="mb-1 fw-bold">
                                                        💰 ${publicacion.precio}
                                                    </p>
                                                )}
                                                {publicacion.queOfrece && (
                                                    <p className="mb-1">
                                                        <strong>Ofrece:</strong> {publicacion.queOfrece}
                                                    </p>
                                                )}
                                                {publicacion.queBusca && (
                                                    <p className="mb-1">
                                                        <strong>Busca:</strong> {publicacion.queBusca}
                                                    </p>
                                                )}
                                            </>
                                        )}

                                        {publicacion.categoria === "CULTURA" && (
                                            <>
                                                {(publicacion.fechaActividad ?? publicacion.fechaInicio) && (
                                                    <p className="mb-1">
                                                        📅 {formatearFecha(publicacion.fechaActividad ?? publicacion.fechaInicio)}
                                                        {publicacion.fechaFin && ` — ${formatearFecha(publicacion.fechaFin)}`}
                                                    </p>
                                                )}
                                                {publicacion.horaActividad && (
                                                    <p className="mb-1">🕒 {publicacion.horaActividad}</p>
                                                )}
                                                {publicacion.lugarActividad && (
                                                    <p className="mb-1">📍 {publicacion.lugarActividad}</p>
                                                )}
                                                {publicacion.tipoActividad && (
                                                    <p className="mb-1">{publicacion.tipoActividad}</p>
                                                )}
                                            </>
                                        )}

                                        {publicacion.categoria === "VIAJES" && (
                                            <>
                                                {(publicacion.origen ?? publicacion.destino) && (
                                                    <p className="mb-1 fw-bold">
                                                        🚗 {publicacion.origen ?? "Origen sin especificar"}
                                                        {" → "}
                                                        {publicacion.destino ?? "Destino sin especificar"}
                                                    </p>
                                                )}
                                                {publicacion.fechaViaje && (
                                                    <p className="mb-1">
                                                        📅 {formatearFecha(publicacion.fechaViaje)}
                                                    </p>
                                                )}
                                                {publicacion.horaViaje && (
                                                    <p className="mb-1">🕒 {publicacion.horaViaje}</p>
                                                )}
                                                {publicacion.plazasDisponibles != null && (
                                                    <p className="mb-1">
                                                        👥 Plazas disponibles: {publicacion.plazasDisponibles}
                                                    </p>
                                                )}
                                            </>
                                        )}

                                        {publicacion.categoria === "OFICIOS_Y_SERVICIOS" && (
                                            <p className="mb-1">📍 {localidades}</p>
                                        )}
                                    </div>

                                    {publicacion.contenido && (
                                        <p className="card-text text-secondary">
                                            {publicacion.contenido}
                                        </p>
                                    )}

                                    <hr />

                                    <div className="small text-muted">
                                        <p className="mb-1">
                                            <strong>Publicado por:</strong>{" "}
                                            {publicacion.author?.nombre || "Usuario"}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Fecha:</strong> {formatearFecha(publicacion.fecha)}
                                        </p>
                                        {publicacion.hora && (
                                            <p className="mb-0">
                                                <strong>Hora:</strong> {publicacion.hora}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </article>
                </div>
            </div>

            {imgAmpliada && (
                <div
                    className="modal fade show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
                    onClick={() => setImgAmpliada(null)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="modal-content bg-transparent border-0">
                            <img
                                src={imgAmpliada}
                                className="img-fluid rounded"
                                alt="Imagen ampliada de la publicación"
                            />
                            <button
                                type="button"
                                className="btn btn-light mt-3 mx-auto"
                                onClick={() => setImgAmpliada(null)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
