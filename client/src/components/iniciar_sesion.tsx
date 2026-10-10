import React, { useState } from 'react';
import type { UserData } from '../types';

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  "https://cdeoweb.onrender.com";

const API_URL = rawApiUrl.trim().replace(/\/+$/, "");

interface LoginFormProps {
  onLoginSuccess: (userData: UserData) => void;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'No se pudo iniciar sesión');
        return;
      }

      onLoginSuccess({
        id: data.user.id,
        nombre: data.user.nombre,
        email: data.user.email,
        telefono: data.user.telefono,
        localidad: data.user.localidad,
        rol: data.user.role,
      });

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('No se pudo conectar con el servidor');
    }
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