import { useState } from 'react';

type CamposViajesProps = {
    subCategoria: string;
};

function CamposViajes({ subCategoria }: CamposViajesProps) {
    const [compartirGastos, setCompartirGastos] = useState('');
    return (
        <section className="campos-viajes">
            {(subCategoria === 'OFREZCO_VIAJE' ||
                subCategoria === 'BUSCO_VIAJE') && (
                    <>
                        <h2>Datos del viaje</h2>

                        <div className="campo">
                            <label htmlFor="origenViaje">Desde</label>
                            <input
                                id="origenViaje"
                                type="text"
                                placeholder="¿Desde dónde salís?"
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="destinoViaje">Hacia</label>
                            <input
                                id="destinoViaje"
                                type="text"
                                placeholder="¿Hacia dónde vas?"
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="fechaViaje">Fecha</label>
                            <input id="fechaViaje" type="date" required />
                        </div>

                        <div className="campo">
                            <label htmlFor="horaViaje">Hora de salida</label>
                            <input id="horaViaje" type="time" required />
                        </div>

                        {subCategoria === 'BUSCO_VIAJE' && (
                            <div className="campo">
                                <label htmlFor="cantidadPasajeros">
                                    Cantidad de pasajeros
                                </label>
                                <input
                                    id="cantidadPasajeros"
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="Cantidad de pasajeros"
                                    required
                                />
                            </div>
                        )}

                        {subCategoria === 'OFREZCO_VIAJE' && (
                            <>
                                <div className="campo">
                                    <label htmlFor="lugaresDisponibles">
                                        Lugares disponibles
                                    </label>
                                    <input
                                        id="lugaresDisponibles"
                                        type="number"
                                        min="1"
                                        step="1"
                                        placeholder="Cantidad de lugares"
                                        required
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="compartirGastos">
                                        ¿Se comparten los gastos?
                                    </label>
                                    <select id="compartirGastos" defaultValue="" value={compartirGastos}
                                        onChange={(e) => setCompartirGastos(e.target.value)} required>
                                        <option value="" disabled>
                                            Seleccioná una opción
                                        </option>
                                        <option value="SI">Sí</option>
                                        <option value="NO">No</option>
                                        <option value="A_CONVENIR">A convenir</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {subCategoria === 'OFREZCO_VIAJE' && (
                            <div className="campo">
                                <label htmlFor="precioPorPasajero">
                                    Aporte por pasajero (UYU)
                                </label>
                                <input
                                    id="precioPorPasajero"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="Importe en pesos uruguayos"
                                    required
                                />
                            </div>
                        )}
                        <div className="campo">
                            <label htmlFor="descripcionViaje">
                                Descripción adicional (opcional)
                            </label>
                            <textarea
                                id="descripcionViaje"
                                placeholder="Paradas, equipaje, condiciones del viaje u otros detalles"
                            />
                        </div>
                    </>
                )}

            {subCategoria === 'TRASLADOS' && (
                <>
                    <h2>Datos del traslado</h2>

                    <div className="campo">
                        <label htmlFor="horariosTraslado">
                            Horarios disponibles
                        </label>
                        <input
                            id="horariosTraslado"
                            type="text"
                            placeholder="Ej.: lunes a viernes de 8 a 18 h"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="costoTraslado">Modalidad de cobro</label>
                        <select id="costoTraslado" defaultValue="" required>
                            <option value="" disabled>
                                Seleccioná una opción
                            </option>
                            <option value="PRECIO_FIJO">Precio fijo</option>
                            <option value="POR_TRAYECTO">Según el trayecto</option>
                            <option value="A_CONVENIR">A convenir</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="importeTraslado">Precio (opcional)</label>
                        <input
                            id="importeTraslado"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Importe en pesos uruguayos"
                        />
                    </div>
                </>
            )}
        </section>
    );
}

export default CamposViajes;