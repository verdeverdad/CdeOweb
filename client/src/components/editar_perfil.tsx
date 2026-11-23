import React, { useState } from 'react';
import { Localidad } from '../types';
import type { User } from '../types';
import RecortadorFoto from './RecortarFoto';

interface EditarPerfilProps {
    user: User;
    onSave: (user: User, foto?: File | null) => void;
    onCancel: () => void;
}

export const EditarPerfil: React.FC<EditarPerfilProps> = ({
    user,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<User>(user);
    const [fotoEnRecorte, setFotoEnRecorte] = useState<File | null>(null);
    const [fotoNueva, setFotoNueva] = useState<File | null>(null);
    const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
    const [eliminarFoto, setEliminarFoto] = useState(false);

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
            const preview = typeof reader.result === 'string' ? reader.result : '';

            if (!preview) {
                alert('No se pudo preparar la vista previa de la foto');
                return;
            }

            setFotoNueva(archivo);
            setVistaPrevia(preview);
            setEliminarFoto(false);
            setFotoEnRecorte(null);
        };

        reader.onerror = () => {
            alert('No se pudo preparar la vista previa de la foto');
            setFotoEnRecorte(null);
        };

        reader.readAsDataURL(archivo);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            userData: {
                ...formData.userData,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handlePublicProfileChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            publicProfile: {
                ...formData.publicProfile,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        onSave(formData, eliminarFoto ? null : fotoNueva ?? undefined);
    };

    return (
        <div className="auth-card">
            <h2>Editar Perfil</h2>

            <p className="auth-subtitle">
                Modifica los datos de tu perfil
            </p>

            <form onSubmit={handleSubmit} className="auth-form">

                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>

                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.userData.nombre ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>

                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.userData.telefono ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="localidad">Localidad</label>

                    <select
                        id="localidad"
                        name="localidad"
                        value={formData.userData.localidad ?? ''}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecciona tu localidad
                        </option>

                        {Localidad.map((localidad) => (
                            <option key={localidad} value={localidad}>
                                {localidad.replaceAll('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fotoPerfil">Imagen de perfil</label>
                    <input
                        type="file"
                        id="fotoPerfil"
                        accept="image/*"
                        onChange={seleccionarFoto}
                        disabled={fotoEnRecorte !== null}
                    />
                    {(vistaPrevia ?? (!eliminarFoto && user.userData.fotoUrl)) && (
                        <img
                            src={vistaPrevia ?? user.userData.fotoUrl ?? ''}
                            alt="Vista previa de la imagen de perfil"
                            style={{
                                width: '88px',
                                height: '88px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                    {(vistaPrevia ?? user.userData.fotoUrl) && (
                        <button
                            type="button"
                            className="switch-btn"
                            onClick={() => {
                                setFotoNueva(null);
                                setVistaPrevia(null);
                                setEliminarFoto(true);
                            }}
                        >
                            Quitar imagen
                        </button>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="rol">Tipo de usuario</label>
                    <select
                        id="rol"
                        name="rol"
                        value={formData.userData.rol ?? 'VECINO'}
                        onChange={handleChange}
                    >
                        <option value="VECINO">Vecino</option>
                        <option value="PERFIL_PUBLICO">
                            Perfil Público (Comercio / Servicio / Emprendimiento)
                        </option>
                        <option value="ADMIN">Administrador</option>
                        <option value="SUPER_ADMIN">Super Administrador</option>
                    </select>
                </div>

                {formData.userData.rol === 'PERFIL_PUBLICO' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="descripcion">
                                Descripción
                            </label>

                            <textarea
                                id="descripcion"
                                name="descripcion"
                                placeholder="Ej.: Artesanías y ropa"
                                value={formData.publicProfile?.descripcion ?? ''}
                                onChange={handlePublicProfileChange}
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="instagram">
                                Instagram
                            </label>

                            <input
                                type="url"
                                id="instagram"
                                name="instagram"
                                placeholder="https://instagram.com/..."
                                value={formData.publicProfile?.instagram ?? ''}
                                onChange={handlePublicProfileChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="facebook">
                                Facebook
                            </label>

                            <input
                                type="url"
                                id="facebook"
                                name="facebook"
                                placeholder="https://facebook.com/..."
                                value={formData.publicProfile?.facebook ?? ''}
                                onChange={handlePublicProfileChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="googleMaps">
                                Google Maps
                            </label>

                            <input
                                type="url"
                                id="googleMaps"
                                name="googleMaps"
                                placeholder="Enlace de Google Maps"
                                value={formData.publicProfile?.googleMaps ?? ''}
                                onChange={handlePublicProfileChange}
                            />
                        </div>
                    </>
                )}

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Guardar cambios
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="switch-btn"
                    >
                        Cancelar
                    </button>
                </div>

            </form>
            {fotoEnRecorte && (
                <RecortadorFoto
                    archivo={fotoEnRecorte}
                    onConfirmar={confirmarFotoRecortada}
                    onCancelar={() => {
                        setFotoEnRecorte(null);
                    }}
                />
            )}
        </div>
    );
};
