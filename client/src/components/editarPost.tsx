import { useState } from "react";
import type { Post } from "../types";

interface EditarPostProps {
    publicacion: Post;
    onCancelar: () => void;
    onGuardado: (publicacionActualizada: Post) => void;
}

export default function EditarPost({
    publicacion,
    onCancelar,
    onGuardado,
}: EditarPostProps) {
    const [titulo, setTitulo] = useState(publicacion.titulo);
    const [contenido, setContenido] = useState(publicacion.contenido);
    const [localidad, setLocalidad] = useState(publicacion.localidad);
    const [categoria, setCategoria] = useState(publicacion.categoria);
    const [subCategoria, setSubCategoria] = useState(
        publicacion.subCategoria
    );
    const [fecha, setFecha] = useState(publicacion.fecha);
    const [hora, setHora] = useState(publicacion.hora);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const guardarCambios = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setGuardando(true);
        setError("");

        try {
            const rawApiUrl =
                import.meta.env.VITE_API_URL ||
                "https://cdeoweb.onrender.com";

            const API_URL = rawApiUrl.trim().replace(/\/+$/, "");

            const response = await fetch(
                `${API_URL}/api/posts/${publicacion.id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        titulo,
                        contenido,
                        localidad,
                        categoria,
                        subCategoria,
                        fecha,
                        hora,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudieron guardar los cambios."
                );
            }

            onGuardado(data);
        } catch (error) {
            console.error("Error al actualizar la publicación:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Ocurrió un error inesperado."
            );
        } finally {
            setGuardando(false);
        }
    };
    return (
        <form
            onSubmit={guardarCambios}
        >
            {error && (
                <p className="alert alert-danger" role="alert">
                    {error}
                </p>
            )}
            <h2 className="h4 mb-3">Editar publicación</h2>

            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                    Título
                </label>
                <input
                    id="titulo"
                    className="form-control"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="contenido" className="form-label">
                    Contenido
                </label>
                <textarea
                    id="contenido"
                    className="form-control"
                    rows={5}
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="localidad" className="form-label">
                    Localidad
                </label>
                <input
                    id="localidad"
                    className="form-control"
                    value={localidad}
                    onChange={(e) =>
                        setLocalidad(e.target.value as Post["localidad"])
                    }
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">
                    Categoría
                </label>
                <input
                    id="categoria"
                    className="form-control"
                    value={categoria}
                    onChange={(e) =>
                        setCategoria(e.target.value as Post["categoria"])
                    }
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="subCategoria" className="form-label">
                    Subcategoría
                </label>
                <input
                    id="subCategoria"
                    className="form-control"
                    value={subCategoria}
                    onChange={(e) =>
                        setSubCategoria(e.target.value as Post["subCategoria"])
                    }
                />
            </div>

            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">
                    Fecha
                </label>
                <input
                    id="fecha"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="hora" className="form-label">
                    Hora
                </label>
                <input
                    id="hora"
                    className="form-control"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />
            </div>

            <div className="d-flex gap-2">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={guardando}
                >
                    {guardando ? "Guardando..." : "Guardar cambios"}
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
