import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post, Categoría, SubCategoria } from '../types';
import { CATEGORIAS, Localidad as LOCALIDADES } from '../types';
import '../App.css';
import CamposMercado from '../components/formsCategorias/CamposMercado';
import CamposCultura from '../components/formsCategorias/CamposCultura';
import CamposPatitas from '../components/formsCategorias/CamposPatitas';
import CamposTrabajosServicios from '../components/formsCategorias/CamposTrabajosServicios';
import CamposViajes from '../components/formsCategorias/CamposViajes';
import '../css/formularioPost.css'
import CamposComunidad from '../components/formsCategorias/CamposComunidad';

export const CrearPost: React.FC = () => {
  const navigate = useNavigate();

  const initialState: Partial<Post> = {
    titulo: '',
    contenido: '',
    localidad: 'LA_FLORESTA',
    categoria: 'CULTURA',
    subCategoria: 'EVENTOS',
  };

  const [formData, setFormData] =
    useState<Partial<Post>>(initialState);
  const [camposEspecificos, setCamposEspecificos] = useState<
    Record<string, string | number | boolean | string[] | null>
  >({});
  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [publicacionCreadaId, setPublicacionCreadaId] =
    useState<string | null>(null);

  const actualizarCampo = (
    nombre: string,
    valor: string | number | boolean | string[] | null
  ) => {
    setCamposEspecificos((anterior) => ({
      ...anterior,
      [nombre]: valor,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !formData.titulo?.trim() ||
    !formData.categoria ||
    !formData.subCategoria
  ) {
    setError('Completá el título, la categoría y la subcategoría.');
    return;
  }

  setError('');
  setModalAbierto(true);
};



  const confirmarPublicacion = async () => {
    if (
      !formData.titulo?.trim() ||
      !formData.categoria ||
      !formData.subCategoria
    ) {
      setError('Completá el título, la categoría y la subcategoría.');
      return;
    }

    setEnviando(true);
    setError('');

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL_PRODUCTION ||
        import.meta.env.VITE_API_URL ||
        'http://localhost:3001';

      const ahora = new Date();

      // La descripción depende de la categoría.
      const contenido =
        formData.categoria === 'MERCADO' ||
          formData.categoria === 'VIAJES'
          ? (
            typeof camposEspecificos.contenido === 'string' &&
              camposEspecificos.contenido.trim()
              ? camposEspecificos.contenido.trim()
              : null
          )
          : (formData.contenido?.trim() || null);

      // La localidad es opcional y depende del tipo de publicación.
      const localidad =
        typeof camposEspecificos.localidad === 'string' &&
          camposEspecificos.localidad
          ? camposEspecificos.localidad
          : null;

      // Este campo todavía no existe en el modelo Prisma.
      const camposParaEnviar = { ...camposEspecificos };
      delete camposParaEnviar.importeTraslado;

      const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...camposParaEnviar,
          titulo: formData.titulo.trim(),
          contenido,
          localidad,
          categoria: formData.categoria,
          subCategoria: formData.subCategoria,
          fecha: ahora.toISOString().split('T')[0],
          hora: ahora.toTimeString().split(' ')[0],
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          data?.message ||
          data?.error ||
          'No se pudo publicar. Intentá nuevamente.'
        );
        return;
      }

      const postId = data?.id ?? data?.post?.id;

      if (!postId) {
        setError(
          'El servidor respondió sin devolver el ID de la publicación. Revisá el resultado antes de volver a enviarla.'
        );
        return;
      }

      setPublicacionCreadaId(postId);
    } catch (err) {
      console.error('Error al crear la publicación:', err);
      setError(
        'No se pudo conectar con el servidor. Tus datos siguen guardados en el formulario.'
      );
    } finally {
      setEnviando(false);
    }
  };



  const volverAlFormulario = () => {
    if (enviando) return;

    setModalAbierto(false);
    setError('');
  };

  const verPublicacion = () => {
    if (!publicacionCreadaId) return;

    navigate(`/publicaciones/${publicacionCreadaId}`);
  };

  const mostrarTexto = (valor: string) =>
    valor.replace(/_/g, ' ');

  return (
    <main className="formulario-prueba">
      <h1 >Crear publicación</h1>

      <form onSubmit={handleSubmit}>

        {/*CATEGORIA*/}
        <div className="campo">
          <label htmlFor="categoria" className="form-label">
            Categoría
          </label>

          <select
            id="categoria"
            className="form-select"
            value={formData.categoria ?? ''}
            onChange={(e) => {
              const categoria =
                e.target.value as Categoría;

              const primeraSubCategoria =
                CATEGORIAS[categoria][0];

              setFormData({
                ...formData,
                categoria,
                subCategoria: primeraSubCategoria,
              });
            }}
            required
          >
            {Object.keys(CATEGORIAS).map((categoria) => (
              <option key={categoria} value={categoria}>
                {mostrarTexto(categoria)}
              </option>
            ))}
          </select>
        </div>

        {/*SUBCATEGORIA*/}
        <div className="campo">
          <label htmlFor="subCategoria">Subcategoría</label>
          <select
            id="subCategoria"
            className="form-select"
            value={formData.subCategoria ?? ''}
            onChange={(e) =>
              setFormData((anterior) => ({
                ...anterior,
                subCategoria: e.target.value as SubCategoria,
              }))
            }
            required
          >
            <option value="">Seleccioná una subcategoría</option>
            {(CATEGORIAS[formData.categoria as keyof typeof CATEGORIAS] ?? []).map(
              (subCategoria) => (
                <option key={subCategoria} value={subCategoria}>
                  {subCategoria.replaceAll('_', ' ')}
                </option>
              )
            )}
          </select>
        </div>

        {/*TITULO*/}
        <div className="campo">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>

          <input
            id="titulo"
            type="text"
            className="form-control"
            value={formData.titulo ?? ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                titulo: e.target.value,
              })
            }
            placeholder="Ej.: Busco paseador de perros"
            required
          />
        </div>


        {/* Descripción general: se muestra en las categorías que la necesitan */}
        {formData.categoria !== 'MERCADO' &&
          formData.categoria !== 'VIAJES' && (
            <div className="campo">
              <label htmlFor="contenido">Descripción</label>
              <textarea
                id="contenido"
                value={String(formData.contenido ?? '')}
                onChange={(e) =>
                  setFormData((anterior) => ({
                    ...anterior,
                    contenido: e.target.value,
                  }))
                }
                required
              />
            </div>
          )}

        {/* Campos específicos de Comunidad */}
        {formData.categoria === 'COMUNIDAD' && (
          <CamposComunidad
            subCategoria={formData.subCategoria ?? ''}
            localidadesCosta={Object.values(LOCALIDADES)}
            valores={camposEspecificos}
            onCampoChange={actualizarCampo}
          />
        )}

        {/* Campos específicos de Mercado */}
        {formData.categoria === 'MERCADO' && (
          <CamposMercado
            subCategoria={formData.subCategoria ?? ''}
            localidadesCosta={Object.values(LOCALIDADES)}
            valores={camposEspecificos}
            onCampoChange={actualizarCampo}
          />
        )}

        {/* Campos específicos de Cultura */}
        {formData.categoria === 'CULTURA' && (
          <CamposCultura
            subCategoria={formData.subCategoria ?? ''}
            localidadesCosta={Object.values(LOCALIDADES)}
            valores={camposEspecificos}
            onCampoChange={actualizarCampo}
          />
        )}

        {/* Campos específicos de Patitas */}
        {formData.categoria === 'ENCONTRANDO_PATITAS' && (
          <CamposPatitas
            subCategoria={formData.subCategoria ?? ''}
            localidadesCosta={Object.values(LOCALIDADES)}
            valores={camposEspecificos}
            onCampoChange={actualizarCampo}
          />
        )}

        {/* Campos específicos de Oficios y Servicios */}
        {formData.categoria === 'OFICIOS_Y_SERVICIOS' && (
          <CamposTrabajosServicios
            subCategoria={formData.subCategoria ?? ''}
            localidadesCosta={Object.values(LOCALIDADES)}
            valores={camposEspecificos}
            onCampoChange={actualizarCampo}
          />
        )}

        {/* Campos específicos de Viajes */}
        {formData.categoria === 'VIAJES' && (
          <CamposViajes
            subCategoria={formData.subCategoria ?? ''}
            
            valores={camposEspecificos}
            onCampoChange={actualizarCampo}
          />
        )}

        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: 'var(--violeta)',
            color: 'var(--blanco)',
            fontWeight: 'bold',
            fontSize: '1.15rem',
          }}
        >
          Revisar publicación
        </button>
      </form>



      {modalAbierto && (
        <>
          <div
            className="modal show d-block"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h2
                    id="titulo-modal"
                    className="modal-title fs-5"
                  >
                    {publicacionCreadaId
                      ? '¡Publicación creada!'
                      : 'Revisá tu publicación'}
                  </h2>

                  {!enviando && (
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Cerrar"
                      onClick={
                        publicacionCreadaId
                          ? undefined
                          : volverAlFormulario
                      }
                      disabled={Boolean(publicacionCreadaId)}
                    >X</button>
                  )}
                </div>

                <div className="modal-body">
                  {publicacionCreadaId ? (
                    <>
                      <p>
                        Tu publicación se guardó correctamente
                        en la comunidad.
                      </p>
                      <p className="mb-0">
                        Podés abrirla para ver cómo quedó.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-muted small">
                        Así se mostrará tu publicación en la
                        comunidad.
                      </p>

                      <p className="mb-2">
                        <strong>Categoría:</strong>{' '}
                        {mostrarTexto(formData.categoria ?? '')}
                      </p>

                      <p className="mb-2">
                        <strong>Subcategoría:</strong>{' '}
                        {mostrarTexto(formData.subCategoria ?? '')}
                      </p>

                      <h3 className="h5 mt-3">
                        {formData.titulo}
                      </h3>

                      <p className="text-break">
                        {formData.contenido}
                      </p>

                      <p className="text-muted small mb-0">
                        📍 {mostrarTexto(formData.localidad ?? '')}
                      </p>
                    </>
                  )}

                  {error && (
                    <div
                      className="alert alert-danger mt-3 mb-0"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  {publicacionCreadaId ? (
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: 'var(--violeta)',
                        color: 'var(--blanco)',
                      }}
                      onClick={verPublicacion}
                    >
                      Ver publicación
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={volverAlFormulario}
                        disabled={enviando}
                      >
                        Volver al formulario
                      </button>

                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: 'var(--violeta)',
                          color: 'var(--blanco)',
                        }}
                        onClick={confirmarPublicacion}
                        disabled={enviando}
                      >
                        {enviando
                          ? 'Publicando...'
                          : 'Publicar en la comunidad'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show" />
        </>
      )}
    </main >
  );
};

export default CrearPost;
