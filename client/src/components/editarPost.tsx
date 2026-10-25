import { useState } from "react";
import type { Post, Categoría, SubCategoria } from "../types";
import { CATEGORIAS, Localidad as LOCALIDADES } from "../types";
import CamposComunidad from "../components/formsCategorias/CamposComunidad";
import CamposMercado from "../components/formsCategorias/CamposMercado";
import CamposCultura from "../components/formsCategorias/CamposCultura";
import CamposPatitas from "../components/formsCategorias/CamposPatitas";
import CamposTrabajosServicios from "../components/formsCategorias/CamposTrabajosServicios";
import CamposViajes from "../components/formsCategorias/CamposViajes";

type ValorCampo = string | number | boolean | string[] | null;
type ValoresCampos = Record<string, ValorCampo>;
type FotoSeleccionada = {
    archivo: File;
    vistaPrevia: string;
};

interface EditarPostProps {
    publicacion: Post;
    onCancelar: () => void;
    onGuardado: (publicacionActualizada: Post) => void;
}

const CAMPOS_ESPECIFICOS = [
    "queOfrece",
    "queBusca",
    "descripcionAdicional",
    "precio",
    "localidades",
    "tipoActividad",
    "fechaActividad",
    "fechaInicio",
    "fechaFin",
    "frecuencia",
    "diaSemana",
    "reglaMensual",
    "diaMes",
    "ordinalMensual",
    "diaSemanaMensual",
    "horaActividad",
    "lugarActividad",
    "costoActividad",
    "importeActividad",
    "origen",
    "destino",
    "fechaViaje",
    "horaViaje",
    "cantidadPasajeros",
    "plazasDisponibles",
    "compartirGastos",
    "aportePorPersona",
    "horarioDisponible",
    "modalidadCobro",
] as const;

function fechaParaInput(valor: unknown): string {
    if (!valor) return "";
    const fecha = String(valor);
    return fecha.length >= 10 ? fecha.slice(0, 10) : fecha;
}

function obtenerValores(publicacion: Post): ValoresCampos {
    const valores: ValoresCampos = {
        localidad: publicacion.localidad ?? "",
        contenido: publicacion.contenido ?? "",
        localidades: publicacion.localidades ?? [],
    };

    for (const campo of CAMPOS_ESPECIFICOS) {
        const valor = publicacion[campo as keyof Post];

        if (valor !== undefined) {
            valores[campo] = valor as ValorCampo;
        }
    }

    for (const campo of ["fechaActividad", "fechaInicio", "fechaFin", "fechaViaje"]) {
        valores[campo] = fechaParaInput(valores[campo]);
    }

    return valores;
}

export default function EditarPost({
    publicacion,
    onCancelar,
    onGuardado,
}: EditarPostProps) {
    const [titulo, setTitulo] = useState(publicacion.titulo);
    const [categoria, setCategoria] = useState<Categoría>(publicacion.categoria);
    const [subCategoria, setSubCategoria] = useState<SubCategoria>(
        publicacion.subCategoria
    );
    const [contenido, setContenido] = useState(publicacion.contenido ?? "");
    const [valores, setValores] = useState<ValoresCampos>(() =>
        obtenerValores(publicacion)
    );
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");


    const [fotosNuevas, setFotosNuevas] = useState<FotoSeleccionada[]>([]);

    const [fotosExistentes, setFotosExistentes] = useState<string[]>(
        Array.isArray((publicacion as Post & { fotos?: string[] }).fotos)
            ? (publicacion as Post & { fotos?: string[] }).fotos!
            : []
    );

    const actualizarCampo = (nombre: string, valor: ValorCampo) => {
        setValores((anterior) => ({ ...anterior, [nombre]: valor }));
    };

    const cambiarCategoria = (nuevaCategoria: Categoría) => {
        setCategoria(nuevaCategoria);
        setSubCategoria(CATEGORIAS[nuevaCategoria][0] as SubCategoria);
        setValores({});
        setContenido("");
    };

    const cambiarSubCategoria = (nuevaSubCategoria: SubCategoria) => {
        if (nuevaSubCategoria !== subCategoria) {
            setValores({});
        }
        setSubCategoria(nuevaSubCategoria);
    };
    const seleccionarFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const archivos = Array.from(e.target.files ?? []).filter((archivo) =>
            archivo.type.startsWith("image/")
        );


        const disponibles =
            5 - fotosExistentes.length - fotosNuevas.length;

        if (archivos.length > disponibles) {
            setError(
                `Podés tener un máximo de 5 fotos. Te quedan ${Math.max(0, disponibles)} lugar(es).`
            );
        }

        const archivosPermitidos = archivos.slice(
            0,
            Math.max(0, disponibles)
        );

        const lecturas = archivosPermitidos.map(
            (archivo) =>
                new Promise<FotoSeleccionada>((resolve) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        resolve({
                            archivo,
                            vistaPrevia: String(reader.result),
                        });
                    };

                    reader.onerror = () => {
                        resolve({ archivo, vistaPrevia: "" });
                    };

                    reader.readAsDataURL(archivo);
                })
        );

        void Promise.all(lecturas).then((resultados) => {
            setFotosNuevas((anteriores) => [
                ...anteriores,
                ...resultados.filter((foto) => foto.vistaPrevia !== ""),
            ]);
        });

        e.target.value = "";
    };

    const quitarFotoExistente = (indice: number) => {
        setFotosExistentes((anteriores) =>
            anteriores.filter((_, i) => i !== indice)
        );
    };

    const quitarFotoNueva = (indice: number) => {
        setFotosNuevas((anteriores) =>
            anteriores.filter((_, i) => i !== indice)
        );
    };
    const guardarCambios = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");

        if (!titulo.trim() || !categoria || !subCategoria) {
            setError("Completá el título, la categoría y la subcategoría.");
            return;
        }

        setGuardando(true);

        try {
            const rawApiUrl =
                import.meta.env.VITE_API_URL ||
                "https://cdeoweb.onrender.com";

            const API_URL = rawApiUrl.trim().replace(/\/+$/, "");

            const esMercado = categoria === "MERCADO";
            const esViajes = categoria === "VIAJES";

            const contenidoFinal =
                esMercado || esViajes
                    ? (typeof valores.contenido === "string"
                        ? valores.contenido
                        : "")
                    : contenido;

            const localidadValor = valores.localidad;
            const localidadFinal =
                typeof localidadValor === "string" && localidadValor
                    ? localidadValor
                    : null;

            const camposFinales: Record<string, unknown> = {};

            for (const campo of CAMPOS_ESPECIFICOS) {
                camposFinales[campo] = valores[campo] ?? null;
            }

            camposFinales.localidades = Array.isArray(valores.localidades)
                ? valores.localidades
                : [];


            const datosPublicacion = {
                ...camposFinales,
                titulo: titulo.trim(),
                contenido: contenidoFinal.trim() || null,
                localidad: localidadFinal,
                categoria,
                subCategoria,
            };

            const formDataEnvio = new FormData();

            formDataEnvio.append(
                "datos",
                JSON.stringify(datosPublicacion)
            );

            formDataEnvio.append(
                "fotosExistentes",
                JSON.stringify(fotosExistentes)
            );

            fotosNuevas.forEach(({ archivo }) => {
                formDataEnvio.append("fotos", archivo);
            });

            const response = await fetch(
                `${API_URL}/api/posts/${publicacion.id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    body: formDataEnvio,
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.error || "No se pudieron guardar los cambios."
                );
            }

            onGuardado(data);
        } catch (err) {
            console.error("Error al actualizar la publicación:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error inesperado."
            );
        } finally {
            setGuardando(false);
        }
    };

    return (
        <main className="formulario-prueba">
            <h1 >Editar publicación</h1>

            <form onSubmit={guardarCambios}>

                {error && (
                    <p className="alert alert-danger" role="alert">
                        {error}
                    </p>
                )}

                {/*CATEGORIA*/}
                <div className="campo">
                    <label htmlFor="editar-categoria" className="form-label">
                        Categoría
                    </label>
                    <select
                        id="editar-categoria"
                        className="form-select"
                        value={categoria}
                        onChange={(e) =>
                            cambiarCategoria(e.target.value as Categoría)
                        }
                        required
                    >
                        {Object.keys(CATEGORIAS).map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion.replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>

                {/*SUBCATEGORIA*/}
                <div className="campo">
                    <label htmlFor="editar-subcategoria" className="form-label">
                        Subcategoría
                    </label>
                    <select
                        id="editar-subcategoria"
                        className="form-select"
                        value={subCategoria}
                        onChange={(e) =>
                            cambiarSubCategoria(e.target.value as SubCategoria)
                        }
                        required
                    >
                        {CATEGORIAS[categoria].map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion.replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>

                {/*TITULO*/}
                <div className="campo">
                    <label htmlFor="editar-titulo" className="form-label">
                        Título
                    </label>
                    <input
                        id="editar-titulo"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                {/* FOTOS */}
                <div className="campo">
                    <label htmlFor="editar-fotos" className="form-label">
                        Fotos
                    </label>

                    <input
                        id="editar-fotos"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        multiple
                        onChange={seleccionarFotos}
                    />

                    <small className="text-muted">
                        Podés agregar imágenes o quitar las que ya no quieras conservar.
                    </small>

                    {(fotosExistentes.length > 0 || fotosNuevas.length > 0) && (
                        <div className="d-flex flex-wrap gap-3 mt-3">
                            {fotosExistentes.map((url, indice) => (
                                <div key={`${url}-${indice}`} style={{ width: "120px" }}>
                                    <img
                                        src={url}
                                        alt={`Foto actual ${indice + 1}`}
                                        style={{
                                            width: "120px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger mt-1 w-100"
                                        onClick={() => quitarFotoExistente(indice)}
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ))}

                            {fotosNuevas.map((foto, indice) => (
                                <div
                                    key={`${foto.archivo.name}-${indice}`}
                                    style={{ width: "120px" }}
                                >
                                    <img
                                        src={foto.vistaPrevia}
                                        alt={`Vista previa de ${foto.archivo.name}`}
                                        style={{
                                            width: "120px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger mt-1 w-100"
                                        onClick={() => quitarFotoNueva(indice)}
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {categoria !== "MERCADO" && categoria !== "VIAJES" && (
                    <div className="campo">
                        <label htmlFor="editar-contenido" className="form-label">
                            Descripción
                        </label>
                        <textarea
                            id="editar-contenido"
                            className="form-control"
                            rows={5}
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                        />
                    </div>
                )}

                {categoria === "COMUNIDAD" && (
                    <CamposComunidad
                        subCategoria={subCategoria}
                        localidadesCosta={Object.values(LOCALIDADES)}
                        valores={valores}
                        onCampoChange={actualizarCampo}
                    />
                )}

                {categoria === "MERCADO" && (
                    <CamposMercado
                        subCategoria={subCategoria}
                        localidadesCosta={Object.values(LOCALIDADES)}
                        valores={valores}
                        onCampoChange={actualizarCampo}
                    />
                )}

                {categoria === "CULTURA" && (
                    <CamposCultura
                        key={`${categoria}-${subCategoria}`}
                        subCategoria={subCategoria}
                        localidadesCosta={Object.values(LOCALIDADES)}
                        valores={valores}
                        onCampoChange={actualizarCampo}
                    />
                )}

                {categoria === "ENCONTRANDO_PATITAS" && (
                    <CamposPatitas
                        subCategoria={subCategoria}
                        localidadesCosta={Object.values(LOCALIDADES)}
                        valores={valores}
                        onCampoChange={actualizarCampo}
                    />
                )}

                {categoria === "OFICIOS_Y_SERVICIOS" && (
                    <CamposTrabajosServicios
                        subCategoria={subCategoria}
                        localidadesCosta={Object.values(LOCALIDADES)}
                        valores={valores}
                        onCampoChange={actualizarCampo}
                    />
                )}

                {categoria === "VIAJES" && (
                    <CamposViajes
                        subCategoria={subCategoria}
                        valores={valores}
                        onCampoChange={actualizarCampo}
                    />
                )}


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
                        disabled={guardando}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </main>
    );
}
