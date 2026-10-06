import React, { useState } from 'react';
import type { Localidad, Rol } from '../types';

const LOCALIDADES: Localidad[] = [
  'NEPTUNIA', 'PINAMAR', 'SALINAS', 'MARINDIA', 'EL FORTIN', 'VILLA ARGENTINA', 'ATLANTIDA', 'LAS TOSCAS', 'PARQUE DEL PLATA', 'LAS VEGAS', 'LAS VEGAS NORTE', 'ESTACION FLORESTA', 'LA FLORESTA', 'COSTA AZUL', 'BELLO HORIZONTE', 'GUAZUVIRA NUEVO', 'GUAZUVIRA VIEJO', 'SAN LUIS', 'LOS TITANES', 'LATUNA', 'ARAMINDA', 'SANTA LUCIA DEL ESTE', 'BIARRITZ', 'CUCHILLA ALTA', 'EL GALEON', 'SANTA ANA', 'BALNEARIO ARGENTINO', 'JAUREGUIBERRY',
];

interface RegisterFormProps {
  onRegisterSuccess: (userData: { nombre: string; email: string; localidad: Localidad; telefono: string; rol: Rol; }) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    repetirPassword: '',
    localidad: '' as Localidad,
    rol: 'VECINO' as Rol,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repetirPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Datos de Registro:', formData);
    // Simulación de registro exitoso
    onRegisterSuccess({
      nombre: formData.nombre,
      email: formData.email,
      localidad: formData.localidad,
      telefono: formData.telefono,
      rol: formData.rol,
    });
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
            placeholder="••••••••"
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
              Selecciona tu localidad
            </option>
            {LOCALIDADES.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

<div className="form-group">
          <label htmlFor="rol">Tipo de Usuario</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
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