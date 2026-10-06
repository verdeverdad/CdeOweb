import React, { useState } from 'react';

interface LoginFormProps {
  onLoginSuccess: (email: string) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de Login:', formData);
    // Simulación de autenticación exitosa
    onLoginSuccess(formData.email);
  };

  return (
    <div className="auth-card">
      <h2>Iniciar Sesión</h2>
      <p className="auth-subtitle">Accede a tu cuenta de usuario</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Iniciar Sesión
        </button>
      </form>

      <div className="auth-switch">
        <p>
          ¿No tienes usuario?
          <button type="button" onClick={onSwitchToRegister} className="switch-btn">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
};