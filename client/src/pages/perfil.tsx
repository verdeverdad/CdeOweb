import React, { useState } from 'react';
import '../css/perfil.css';
import { LoginForm } from '../components/iniciar_sesion';
import { RegisterForm } from '../components/registro';
import { UserProfile } from '../components/perfil';
import type { Localidad } from '../types';

interface UserData {
  nombre?: string;
  email: string;
  telefono?: string;
  localidad?: Localidad;
}

export const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleLoginSuccess = (email: string) => {
    setUser({ email });
  };

  const handleRegisterSuccess = (userData: UserData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setIsRegistering(false);
  };

  return (
    <div className="auth-container">
      {user ? (
        <UserProfile user={user} onLogout={handleLogout} />
      ) : isRegistering ? (
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setIsRegistering(false)}
        />
      ) : (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setIsRegistering(true)}
        />
      )}
    </div>
  );
};

export default Perfil;