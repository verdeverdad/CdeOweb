import React, { useState } from 'react';
import { Localidad } from '../types';
import type { User } from '../types';

interface EditarPerfilProps {
    user: User;
    onSave: (user: User) => void;
    onCancel: () => void;
}

export const EditarPerfil: React.FC<EditarPerfilProps> = ({
    user,
    onSave,
    onCancel,
}) => {
    const [formData, setFormData] = useState<User>(user);

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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave(formData);
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
                                {localidad}
                            </option>
                        ))}
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
        </div>
    );
};

