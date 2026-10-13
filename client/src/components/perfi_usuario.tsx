import React, { useEffect, useState } from 'react';
import type { User } from '../types';
import type { Post } from '../types';

interface UserProfileProps {
    user: User;
    onEdit: () => void;
    onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    user,
    onEdit,
    onLogout,
}) => {

    const [publicaciones, setPublicaciones] = useState<Post[]>([]);
    const [cargandoPublicaciones, setCargandoPublicaciones] = useState(true);
    const [errorPublicaciones, setErrorPublicaciones] = useState('');

    useEffect(() => {
        const cargarPublicaciones = async () => {
            try {
                const rawApiUrl =
                    import.meta.env.VITE_API_URL ||
                    'https://cdeoweb.onrender.com';

                const API_URL = rawApiUrl.trim().replace(/\/+$/, '');

                const response = await fetch(
                    `${API_URL}/api/posts/mis-publicaciones`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || 'No se pudieron cargar tus publicaciones.'
                    );
                }

                setPublicaciones(data);
            } catch (error) {
                console.error('Error al cargar mis publicaciones:', error);

                setErrorPublicaciones(
                    error instanceof Error
                        ? error.message
                        : 'Ocurrió un error inesperado.'
                );
            } finally {
                setCargandoPublicaciones(false);
            }
        };

        cargarPublicaciones();
    }, []);


    return (
        <div className="auth-card">
            <h2>Mi Perfil</h2>
            <p className="auth-subtitle">¡Bienvenido de nuevo!</p>

            <div
                className="user-info"
                style={{ marginBottom: '1.5rem', textAlign: 'left' }}
            >
                {user.userData.nombre && (
                    <p>
                        <strong>Nombre:</strong> {user.userData.nombre}
                    </p>
                )}

                <p>
                    <strong>Correo:</strong> {user.userData.email}
                </p>

                {user.userData.localidad && (
                    <p>
                        <strong>Localidad:</strong> {user.userData.localidad}
                    </p>
                )}

                {user.userData.telefono && (
                    <p>
                        <strong>Teléfono:</strong> {user.userData.telefono}
                    </p>
                )}

                {user.userData.rol && (
                    <p>
                        <strong>Tipo de usuario:</strong> {user.userData.rol}
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={onEdit}
                className="submit-btn"
            >
                Modificar perfil
            </button>

            <button
                type="button"
                onClick={onLogout}
                className="submit-btn"
                style={{ backgroundColor: '#dc2626' }}
            > Cerrar Sesión
            </button>

            <section className="auth-card" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h3>Mis publicaciones</h3>

                {cargandoPublicaciones ? (
                    <p>Cargando publicaciones...</p>
                ) : errorPublicaciones ? (
                    <p role="alert">{errorPublicaciones}</p>
                ) : publicaciones.length === 0 ? (
                    <p>Todavía no tenés publicaciones.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {publicaciones.map((publicacion) => (
                            <li
                                key={publicacion.id}
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    padding: '0.75rem 0',
                                }}
                            >
                                <a href={`/publicaciones/${publicacion.id}`}>
                                    {publicacion.titulo}
                                </a>

                                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                    {publicacion.localidad.replace(/_/g, ' ')}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

        </div>
    );
};