import React from 'react';

import type { User } from '../types';

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
            >
                Cerrar Sesión
            </button>
        </div>
    );
};