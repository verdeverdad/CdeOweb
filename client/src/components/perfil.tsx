import React from 'react';
import type { Localidad, Rol } from '../types';

interface UserData {
    nombre?: string;
    email: string;
    telefono?: string;
    localidad?: Localidad;
    rol?: Rol;
}

interface UserProfileProps {
    user: UserData;
    onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
    return (
        <div className="auth-card">
            <h2>Mi Perfil</h2>
            <p className="auth-subtitle">¡Bienvenido de nuevo!</p>

            <div className="user-info" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                {user.nombre && (
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                )}
                <p><strong>Correo:</strong> {user.email}</p>
                {user.localidad && (
                    <p><strong>Localidad:</strong> {user.localidad}</p>
                )}
            </div>

            <button type="button" onClick={onLogout} className="submit-btn" style={{ backgroundColor: '#dc2626' }}>
                Cerrar Sesión
            </button>
        </div>
    );
};