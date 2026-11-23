import React, { useState } from 'react';
import type { UserData } from '../types';
import type { Role } from '../types';
import { Localidad } from '../types';
import RecortadorFoto from './RecortarFoto';

const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  "https://cdeoweb.onrender.com";

interface RegisterFormProps {
  onRegisterSuccess: (userData: UserData) => void;
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
  const [fotoSeleccionada, setFotoSeleccionada] = useState<{
    archivo: File;
    vistaPrevia: string;
  } | null>(null);
  const [fotoEnRecorte, setFotoEnRecorte] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const seleccionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    e.target.value = '';

    if (!archivo) return;

    if (!archivo.type.startsWith('image/')) {
      alert('Seleccioná un archivo de imagen');
      return;
    }

    setFotoEnRecorte(archivo);
  };

  const confirmarFotoRecortada = (archivo: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const vistaPrevia = typeof reader.result === 'string' ? reader.result : '';

      if (vistaPrevia) {
        setFotoSeleccionada({ archivo, vistaPrevia });
      } else {
        alert('No se pudo preparar la vista previa de la foto');
      }

      setFotoEnRecorte(null);
    };

    reader.onerror = () => {
      alert('No se pudo preparar la vista previa de la foto');
      setFotoEnRecorte(null);
    };

    reader.readAsDataURL(archivo);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (fotoEnRecorte) {
      alert('Confirmá o cancelá el recorte de la foto antes de registrarte');
      return;
    }

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
      setEnviando(true);
      const formDataEnvio = new FormData();
      formDataEnvio.append('nombre', nombre);
      formDataEnvio.append('email', email);
      formDataEnvio.append('telefono', telefono);
      formDataEnvio.append('password', formData.password);
      formDataEnvio.append('localidad', formData.localidad);
      formDataEnvio.append('role', formData.role);

      if (fotoSeleccionada) {
        formDataEnvio.append('foto', fotoSeleccionada.archivo);
      }

      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        body: formDataEnvio,
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
        fotoUrl: data.fotoUrl,
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
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
          <label htmlFor="fotoPerfil">Imagen de perfil</label>
          <input
            type="file"
            id="fotoPerfil"
            accept="image/*"
            onChange={seleccionarFoto}
            disabled={fotoEnRecorte !== null || enviando}
          />
          {fotoSeleccionada && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={fotoSeleccionada.vistaPrevia}
                alt="Vista previa de la imagen de perfil"
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <button
                type="button"
                className="switch-btn"
                onClick={() => setFotoSeleccionada(null)}
                disabled={enviando}
              >
                Quitar imagen
              </button>
            </div>
          )}
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
            <option value="ADMIN">Administrador</option>
            <option value="SUPER_ADMIN">Super Administrador</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={enviando}>
          {enviando ? 'Registrando…' : 'Registrarse'}
        </button>
      </form>

      {fotoEnRecorte && (
        <RecortadorFoto
          archivo={fotoEnRecorte}
          onConfirmar={confirmarFotoRecortada}
          onCancelar={() => setFotoEnRecorte(null)}
        />
      )}

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