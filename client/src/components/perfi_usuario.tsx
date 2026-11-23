import React, { useEffect, useState } from 'react';
import type { User } from '../types';
import type { Post } from '../types';
import MostrarPublicaciones from './MostrarPubliaciones';

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


    return (<>
        <div className="auth-card" style={{ maxWidth: '900px' }}>

            {user.userData.fotoUrl && (
                <img
                    src={user.userData.fotoUrl}
                    alt={`Imagen de perfil de ${user.userData.nombre ?? 'usuario'}`}
                    style={{
                        display: 'block',
                        width: '112px',
                        height: '112px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <h2>{user.userData.nombre}</h2>
            <p className='auth-subtitle'>
                {user.userData.email}
            </p>
            <div
                className="user-info" style={{ marginBottom: '1.5rem', textAlign: 'left' }}
            >
                {user.userData.localidad && (
                    <p>
                        <strong>Localidad:</strong> {user.userData.localidad.replaceAll('_', ' ')}
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

            <div className="button-group" >
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
                    style={{ backgroundColor: '#dc2626', marginLeft: '0.8rem' }}
                > Cerrar Sesión
                </button>
            </div>
            <section style={{ width: '100%', marginBottom: '1.5rem', marginTop: '5rem' }}>
                <h3>Mis publicaciones</h3>

                {cargandoPublicaciones ? (
                    <p style={{ textAlign: 'center' }}>Cargando publicaciones...</p>
                ) : errorPublicaciones ? (
                    <p role="alert">{errorPublicaciones}</p>
                ) : publicaciones.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Todavía no tenés publicaciones.</p>
                ) : (
                    <MostrarPublicaciones
                        publicacionesExternas={publicaciones}
                        cargandoExternamente={cargandoPublicaciones}
                        columnas={1}
                    />
                )}
            </section>

        </div>
    </>
    );
};