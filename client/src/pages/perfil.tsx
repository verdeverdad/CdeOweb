import React, { useState, useEffect } from 'react';

import '../css/perfil.css';

import { LoginForm } from '../components/iniciar_sesion';
import { RegisterForm } from '../components/registro';
import { UserProfile } from '../components/perfi_usuario';
import { EditarPerfil } from '../components/editar_perfil';

import type { User, UserData } from '../types';

export const Perfil: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    const handleLoginSuccess = (userData: UserData) => {
        setUser({
            userData
        });
    };

    const handleRegisterSuccess = (userData: UserData) => {
        setUser({
            userData
        });
    };


    const handleLogout = async () => {
        const rawApiUrl =
            import.meta.env.VITE_API_URL ||
            'https://cdeoweb.onrender.com';

        const API_URL = rawApiUrl.trim().replace(/\/+$/, '');

        try {
            const response = await fetch(`${API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                console.error('No se pudo cerrar la sesión en el servidor');
                return;
            }

            setUser(null);
            setShowRegister(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al cerrar la sesión:', error);
        }
    };



    useEffect(() => {
        const recuperarSesion = async () => {
            try {
                const rawApiUrl =
                    import.meta.env.VITE_API_URL ||
                    'https://cdeoweb.onrender.com';

                const API_URL = rawApiUrl.trim().replace(/\/+$/, '');

                const response = await fetch(`${API_URL}/api/users/me`, {
                    method: 'GET',
                    credentials: 'include',
                });

                // Si no hay sesión válida, mostramos el login normalmente.
                if (!response.ok) return;

                const data = await response.json();

                setUser({
                    userData: {
                        id: data.user.id,
                        nombre: data.user.nombre,
                        email: data.user.email,
                        telefono: data.user.telefono,
                        localidad: data.user.localidad,
                        rol: data.user.role,
                    },
                });
            } catch (error) {
                console.error('Error al recuperar la sesión:', error);
            }
            finally {
                setIsCheckingSession(false);
            }
        };

        recuperarSesion();
    }, []);

    if (isCheckingSession) {
        return <div className="auth-container">Cargando...</div>;
    }
    return (
        <div className="auth-container">
            {user ? (
                isEditing ? (
                    <EditarPerfil
                        user={user}
                        onSave={(updatedUser) => {
                            setUser(updatedUser);
                            setIsEditing(false);
                        }}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <UserProfile
                        user={user}
                        onEdit={() => setIsEditing(true)}
                        onLogout={handleLogout}
                    />
                )
            ) : showRegister ? (
                <RegisterForm
                    onRegisterSuccess={handleRegisterSuccess}
                    onSwitchToLogin={() => setShowRegister(false)}
                />
            ) : (
                <LoginForm
                    onLoginSuccess={handleLoginSuccess}
                    onSwitchToRegister={() => setShowRegister(true)}
                />
            )}
        </div>
    );
};

export default Perfil;