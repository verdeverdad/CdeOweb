import React, { useState } from 'react';
import type { Role } from '../types';
import { Localidad } from '../types';

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  "https://cdeoweb.onrender.com";

interface RegisterFormProps {
  onRegisterSuccess: (userData: { id: string; nombre: string; email: string; localidad: Localidad; telefono: string; rol: Role; }) => void;
  onSwitchToLogin: () => void;
}

const API_URL = rawApiUrl.trim().replace(/\/+$/, "");
export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    repetirPassword: '',
    localidad: '' as Localidad,
    role: 'VECINO' as Role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nombre = formData.nombre.trim();
    const email = formData.email.trim().toLowerCase();
    const telefono = formData.telefono.trim();

    if (!nombre) {
      alert('Ingresá tu nombre');
      return;
    }

    if (!/^09\d{7}$/.test(telefono)) {
      alert('El teléfono debe empezar con 09 y tener exactamente 9 números. Ejemplo: 099123456');
      return;
    }

    if (formData.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (formData.password !== formData.repetirPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          password: formData.password,
          localidad: formData.localidad,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'No se pudo registrar el usuario');
        return;
      }

      onRegisterSuccess({
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        localidad: data.localidad,
        telefono: data.telefono,
        rol: data.role,
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('No se pudo conectar con el servidor');
    }
  };


  return (
    <div className="auth-card">
      <h2>Crear Cuenta</h2>
      <p className="auth-subtitle">Ingresa tus datos para registrarte</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

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
          <label htmlFor="telefono">Telefono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Tu teléfono"
            inputMode="numeric"
            pattern="09[0-9]{7}"
            minLength={9}
            maxLength={9}
            title="Ingresá 9 dígitos, empezando con 09. Ejemplo: 099123456"
            value={formData.telefono}
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
            minLength={8}
            placeholder="Mínimo 8 caracteres."
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="repetirPassword">Repetir contraseña</label>
          <input
            type="password"
            id="repetirPassword"
            name="repetirPassword"
            minLength={8}
            placeholder="••••••••"
            value={formData.repetirPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="localidad">Localidad</label>
          <select
            id="localidad"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona una localidad
            </option>
            {Localidad.map((localidad) => (
              <option key={localidad} value={localidad}>
                {localidad.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rol">Tipo de Usuario</label>
          <select
            id="rol"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="VECINO">Vecino</option>
            <option value="PERFIL_PUBLICO">Perfil Público (Comercio / Servicio / Emprendimiento)</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Registrarse
        </button>
      </form>

      <div className="auth-switch">
        <p>
          ¿Ya tienes una cuenta?
          <button type="button" onClick={onSwitchToLogin} className="switch-btn">
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};