
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post as PostType } from "../types";
import EditarPost from "../components/editarPost";

interface UsuarioActual {
    id: string;
    rol: string;
}

export default function Post() {
    const { id } = useParams<{ id: string }>();

    const [publicacion, setPublicacion] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [usuarioActual, setUsuarioActual] = useState<UsuarioActual | null>(null);
    const [editando, setEditando] = useState(false);

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

                const response = await fetch(
                    `${API_URL}/api/posts/${id}`
                );

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

                const response = await fetch(
                    `${API_URL}/api/users/me`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

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

    const esSuperAdmin =
        usuarioActual?.rol === "SUPER_ADMIN";

    const puedeEditar = esAutor || esSuperAdmin;

    return (
        <main className="container mt-4 mb-5">
            <article className="card shadow-sm border-0">
                <div className="card-body p-4">
                    {editando ? (
                        <EditarPost
                            publicacion={publicacion}
                            onCancelar={() => setEditando(false)}
                            onGuardado={(publicacionActualizada) => {
                                setPublicacion(publicacionActualizada);
                                setEditando(false);
                            }}
                        />
                    ) :
                        (
                            <>
                                <div className="mb-3">
                                    <span className="badge bg-primary">
                                        {publicacion.categoria}
                                    </span>
                                    <span className="text-muted ms-3">
                                        📍 {publicacion.localidad.replace(/_/g, " ")}
                                    </span>
                                </div>

                                <h1 className="fw-bold">{publicacion.titulo}</h1>
                                {puedeEditar && !editando && (
                                  <> <button
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
    </button></>
                                )}
                                <p className="text-secondary">
                                    {publicacion.contenido}
                                </p>

                                <hr />

                                <p>
                                    <strong>Publicado por:</strong>{" "}
                                    {publicacion.author?.nombre || "Usuario"}
                                </p>

                                <p>
                                    <strong>Fecha:</strong> {publicacion.fecha}
                                </p>

                                {publicacion.hora && (
                                    <p>
                                        <strong>Hora:</strong> {publicacion.hora}
                                    </p>
                                )}

                            </>
                        )}

                </div>
            </article>
        </main>
    );
}
