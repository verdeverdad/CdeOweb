import React, { useState } from 'react';
import type { Post, Localidad, Categoria } from '../types';

const LOCALIDADES: Localidad[] = [
  'NEPTUNIA', 'PINAMAR', 'SALINAS', 'MARINDIA', 'EL_FORTIN', 'VILLA_ARGENTINA', 'ATLANTIDA', 'LAS_TOSCAS', 'PARQUE_DEL_PLATA', 'LAS_VEGAS', 'LAS_VEGAS_NORTE', 'ESTACION_FLORESTA', 'LA_FLORESTA', 'COSTA_AZUL', 'BELLO_HORIZONTE', 'GUAZUVIRA_NUEVO', 'GUAZUVIRA_VIEJO', 'SAN_LUIS',  'LOS_TITANES', 'LATUNA', 'ARAMINDA', 'SANTA_LUCIA_DEL_ESTE', 'BIARRITZ', 'CUCHILLA_ALTA','EL_GALEON', 'SANTA_ANA', 'BALNEARIO_ARGENTINO', 'JAUREGUIBERRY',    
];

export const CrearPost: React.FC = () => {
  // Estado inicial tipado para evitar el error de Partial
  const initialState: Partial<Post> = {
    titulo: '',
    contenido: '',
    localidad: 'LA_FLORESTA' as Localidad,
    categoria: 'MERCADO',
  };

  const [formData, setFormData] = useState<Partial<Post>>(initialState);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validamos que los campos obligatorios existan antes de crear el post
    if (!formData.titulo || !formData.contenido || !formData.localidad) return;

    const newPost: Post = {
      id: Date.now().toString(),
      titulo: formData.titulo,
      contenido: formData.contenido,
      localidad: formData.localidad as Localidad,
      categoria: formData.categoria || 'MERCADO',
      subCategoria: '',
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0],
      author: {
        nombre: 'user1',
        telefono: '0000-0000'
      },
      createdAt: new Date().toISOString(),
    };

    setPosts([...posts, newPost]);
    setFormData(initialState);
    console.log("Enviando a Render:", newPost);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h2 className="card-title h4 mb-4">Crear nueva publicación</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={formData.titulo}
                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Ej: Busco paseador de perros"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Localidad</label>
                <select
                  className="form-select"
                  value={formData.localidad}
                  // El "as Localidad" es clave aquí para que TS no se queje
                  onChange={e => setFormData({ ...formData, localidad: e.target.value as Localidad })}
                >
                  {LOCALIDADES.map(loc => (
                    <option key={loc} value={loc}>{loc.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  value={formData.categoria ?? 'MERCADO'}
                  onChange={e => setFormData({ ...formData, categoria: e.target.value as Categoria })}
                >
                  <option value="MERCADO">Mercado</option>
                  <option value="PATITAS">Encontrando Patitas</option>
                  <option value="CULTURA">Cultura y Cursos</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contenido</label>
              <textarea
                className="form-control"
                rows={4}
                value={formData.contenido}
                onChange={e => setFormData({ ...formData, contenido: e.target.value })}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Publicar en la Comunidad
            </button>
          </form>
        </div>
      </div>

      <h3 className="h5 mb-3">Vista Previa de la Cartelera</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {posts.map(post => (
          <div className="col" key={post.id}>
            <div className="card h-100 border-primary">
              <div className="card-header bg-transparent border-primary text-primary fw-bold">
                {post.categoria}
              </div>
              <div className="card-body">
                <h5 className="card-title">{post.titulo}</h5>
                <p className="card-text text-muted">
                  {post.contenido.length > 100 ? post.contenido.substring(0, 100) + '...' : post.contenido}
                </p>
              </div>
              <div className="card-footer bg-light">
                <small className="text-muted">📍 {post.localidad.replace(/_/g, ' ')}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};