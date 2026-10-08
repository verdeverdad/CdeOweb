import React, { useState } from 'react';

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

    const handleLoginSuccess = (email: string) => {
        setUser({
            userData: { email }
        });
    };

    const handleRegisterSuccess = (userData: UserData) => {
        setUser({
            userData
        });
    };

    const handleLogout = () => {
        setUser(null);
        setShowRegister(false);
        setIsEditing(false);
    };

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