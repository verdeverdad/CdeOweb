
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post, Localidad, Categoría, SubCategoria } from '../types';
import { CATEGORIAS, Localidad as LOCALIDADES } from '../types';
import '../App.css';

export const CrearPost: React.FC = () => {
  const navigate = useNavigate();

  const initialState: Partial<Post> = {
    titulo: '',
    contenido: '',
    localidad: 'LA_FLORESTA',
    categoria: 'MERCADO',
    subCategoria: 'TRUEQUE',
  };

  const [formData, setFormData] =
    useState<Partial<Post>>(initialState);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [publicacionCreadaId, setPublicacionCreadaId] =
    useState<string | null>(null);


    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titulo?.trim() ||
      !formData.contenido?.trim() ||
      !formData.localidad ||
      !formData.categoria ||
      !formData.subCategoria
    ) {
      return;
    }

    setError('');
    setModalAbierto(true);
  };

  const confirmarPublicacion = async () => {
    if (
      !formData.titulo?.trim() ||
      !formData.contenido?.trim() ||
      !formData.localidad ||
      !formData.categoria ||
      !formData.subCategoria
    ) {
      setError('Revisá que todos los campos estén completos.');
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

      const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: formData.titulo.trim(),
          contenido: formData.contenido.trim(),
          localidad: formData.localidad,
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
    <div className="container mt-4 mb-5">
      <div
        className="card shadow-sm"
        style={{
          borderColor: 'var(--violeta)',
          borderWidth: '1px',
        }}
      >
        <div className="card-body">
          <h2
            className="card-title h4 mb-4"
            style={{ color: 'var(--violeta)' }}
          >
            Crear nueva publicación
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="localidad" className="form-label">
                  Localidad
                </label>

                <select
                  id="localidad"
                  className="form-select"
                  value={formData.localidad ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      localidad: e.target.value as Localidad,
                    })
                  }
                  required
                >
                  {LOCALIDADES.map((loc) => (
                    <option key={loc} value={loc}>
                      {mostrarTexto(loc)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
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
            </div>

            <div className="mb-3">
              <label
                htmlFor="subCategoria"
                className="form-label"
              >
                Subcategoría
              </label>

              <select
                id="subCategoria"
                className="form-select"
                value={formData.subCategoria ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subCategoria: e.target.value as SubCategoria,
                  })
                }
                required
              >
                {formData.categoria &&
                  CATEGORIAS[formData.categoria].map(
                    (subCategoria) => (
                      <option
                        key={subCategoria}
                        value={subCategoria}
                      >
                        {mostrarTexto(subCategoria)}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="contenido" className="form-label">
                Contenido
              </label>

              <textarea
                id="contenido"
                className="form-control"
                rows={5}
                value={formData.contenido ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contenido: e.target.value,
                  })
                }
                placeholder="Contá los detalles de tu publicación..."
                required
              />
            </div>

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
        </div>
      </div>

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
                    />
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
    </div>
  );
};

export default CrearPost;
