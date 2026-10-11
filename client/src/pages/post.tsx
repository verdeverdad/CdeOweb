
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post as PostType } from "../types";

export default function Post() {
  const { id } = useParams<{ id: string }>();

  const [publicacion, setPublicacion] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <main className="container mt-4 mb-5">
      <article className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="mb-3">
            <span className="badge bg-primary">
              {publicacion.categoria}
            </span>
            <span className="text-muted ms-3">
              📍 {publicacion.localidad.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="fw-bold">{publicacion.titulo}</h1>

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
        </div>
      </article>
    </main>
  );
}
