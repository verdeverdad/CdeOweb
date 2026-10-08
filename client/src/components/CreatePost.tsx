import React, { useState } from 'react';
import type { Post, Localidad, Categoría, SubCategoria } from '../types';
import { CATEGORIAS, Localidad as LOCALIDADES } from '../types';
import '../App.css';

export const CrearPost: React.FC = () => {

  const initialState: Partial<Post> = {
    titulo: '',
    contenido: '',
    localidad: 'LA FLORESTA',
    categoria: 'MERCADO',
    subCategoria: 'TRUEQUE',
  };

  const [formData, setFormData] = useState<Partial<Post>>(initialState);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titulo ||
      !formData.contenido ||
      !formData.localidad ||
      !formData.categoria ||
      !formData.subCategoria
    ) {
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      titulo: formData.titulo,
      contenido: formData.contenido,
      localidad: formData.localidad,
      categoria: formData.categoria,
      subCategoria: formData.subCategoria,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0],
      author: {
        nombre: '1',
        telefono: '0000-0000',
      },
      createdAt: new Date().toISOString(),
    };

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL_PRODUCTION ||
        import.meta.env.VITE_API_URL ||
        'http://localhost:3001';

      const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId: '1',
          titulo: newPost.titulo,
          contenido: newPost.contenido,
          localidad: newPost.localidad,
          categoria: newPost.categoria,
          subCategoria: newPost.subCategoria,
          fecha: newPost.fecha,
          hora: newPost.hora,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        console.error(
          'Error al guardar el post en la DB:',
          response.status,
          body
        );

        return;
      }

      setPosts([...posts, newPost]);
      setFormData(initialState);

      console.log(
        'Post enviado al backend y agregado en la vista previa.',
        newPost
      );

    } catch (error) {
      console.error('Error al enviar el post:', error);
    }
  };

  return (
    <div className="container mt-4">

      <div
        className="card shadow-sm mb-5"
        style={{
          borderColor: 'var(--violeta)',
          borderWidth: '1px'
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

            {/* TÍTULO */}

            <div className="mb-3">
              <label className="form-label">
                Título
              </label>

              <input
                type="text"
                className="form-control"
                value={formData.titulo ?? ''}
                onChange={e =>
                  setFormData({
                    ...formData,
                    titulo: e.target.value
                  })
                }
                placeholder="Ej: Busco paseador de perros"
                required
              />
            </div>


            <div className="row">

              {/* LOCALIDAD */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Localidad
                </label>

                <select
                  className="form-select"
                  value={formData.localidad ?? ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      localidad: e.target.value as Localidad
                    })
                  }
                  required
                >
                  {LOCALIDADES.map(loc => (
                    <option key={loc} value={loc}>
                      {loc.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>


              {/* CATEGORÍA */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Categoría
                </label>

                <select
                  className="form-select"
                  value={formData.categoria ?? ''}
                  onChange={e => {

                    const categoria =
                      e.target.value as Categoría;

                    const primeraSubCategoria =
                      CATEGORIAS[categoria][0];

                    setFormData({
                      ...formData,
                      categoria,
                      subCategoria: primeraSubCategoria
                    });
                  }}
                  required
                >
                  {Object.keys(CATEGORIAS).map(categoria => (
                    <option
                      key={categoria}
                      value={categoria}
                    >
                      {categoria.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

            </div>


            {/* SUBCATEGORÍA */}

            <div className="mb-3">

              <label className="form-label">
                Subcategoría
              </label>

              <select
                className="form-select"
                value={formData.subCategoria ?? ''}
                onChange={e =>
                  setFormData({
                    ...formData,
                    subCategoria:
                      e.target.value as SubCategoria
                  })
                }
                required
              >

                {formData.categoria &&
                  CATEGORIAS[formData.categoria].map(
                    subCategoria => (
                      <option
                        key={subCategoria}
                        value={subCategoria}
                      >
                        {subCategoria.replace(/_/g, ' ')}
                      </option>
                    )
                  )}

              </select>

            </div>


            {/* CONTENIDO */}

            <div className="mb-3">

              <label className="form-label">
                Contenido
              </label>

              <textarea
                className="form-control"
                rows={4}
                value={formData.contenido ?? ''}
                onChange={e =>
                  setFormData({
                    ...formData,
                    contenido: e.target.value
                  })
                }
                required
              />

            </div>


            {/* BOTÓN */}

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: 'var(--violeta)',
                color: 'var(--blanco)',
                fontWeight: 'bold',
                fontSize: '1.3rem'
              }}
            >
              Publicar en la Comunidad
            </button>

          </form>
        </div>
      </div>


      {/* VISTA PREVIA */}

      <h3 className="h5 mb-3">
        Vista Previa de la Cartelera
      </h3>

      <div className="row row-cols-1 row-cols-md-3 g-4">

        {posts.map(post => (

          <div className="col" key={post.id}>

            <div className="card h-100 border-primary">

              <div className="card-header bg-transparent border-primary text-primary fw-bold">

                {post.categoria}

                {' / '}

                {post.subCategoria}

              </div>

              <div className="card-body">

                <h5 className="card-title">
                  {post.titulo}
                </h5>

                <p className="card-text text-muted">
                  {post.contenido.length > 100
                    ? post.contenido.substring(0, 100) + '...'
                    : post.contenido}
                </p>

              </div>

              <div className="card-footer bg-light">

                <small className="text-muted">
                  📍 {post.localidad.replace(/_/g, ' ')}
                </small>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};