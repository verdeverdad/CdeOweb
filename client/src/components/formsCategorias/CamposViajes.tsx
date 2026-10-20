
type ValorCampo = string | number | boolean | string[] | null;

type CamposViajesProps = {
  subCategoria: string;
  valores: Record<string, ValorCampo>;
  onCampoChange: (nombre: string, valor: ValorCampo) => void;
};

function CamposViajes({
  subCategoria,
  valores,
  onCampoChange,
}: CamposViajesProps) {
  const campo = (nombre: string) => String(valores[nombre] ?? '');

  const cambiar = (nombre: string, valor: string) => {
    onCampoChange(nombre, valor);
  };

  const esViaje =
    subCategoria === 'BUSCO_VIAJE' ||
    subCategoria === 'OFREZCO_VIAJE';

  return (
    <section className="campos-viajes">
      {esViaje && (
        <>
          <div className="campo">
            <label htmlFor="origenViaje">Origen</label>
            <input
              id="origenViaje"
              type="text"
              value={campo('origen')}
              onChange={(e) => cambiar('origen', e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="destinoViaje">Destino</label>
            <input
              id="destinoViaje"
              type="text"
              value={campo('destino')}
              onChange={(e) => cambiar('destino', e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="fechaViaje">Fecha del viaje</label>
            <input
              id="fechaViaje"
              type="date"
              value={campo('fechaViaje')}
              onChange={(e) => cambiar('fechaViaje', e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="horaViaje">Hora de salida</label>
            <input
              id="horaViaje"
              type="time"
              value={campo('horaViaje')}
              onChange={(e) => cambiar('horaViaje', e.target.value)}
              required
            />
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
                value={campo('cantidadPasajeros')}
                onChange={(e) =>
                  cambiar('cantidadPasajeros', e.target.value)
                }
                required
              />
            </div>
          )}

          {subCategoria === 'OFREZCO_VIAJE' && (
            <>
              <div className="campo">
                <label htmlFor="plazasDisponibles">
                  Plazas disponibles
                </label>
                <input
                  id="plazasDisponibles"
                  type="number"
                  min="1"
                  step="1"
                  value={campo('plazasDisponibles')}
                  onChange={(e) =>
                    cambiar('plazasDisponibles', e.target.value)
                  }
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="compartirGastos">
                  ¿Compartir gastos?
                </label>
                <select
                  id="compartirGastos"
                  value={campo('compartirGastos')}
                  onChange={(e) =>
                    cambiar('compartirGastos', e.target.value)
                  }
                  required
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="SI">Sí</option>
                  <option value="NO">No</option>
                  <option value="A_CONVENIR">A convenir</option>
                </select>
              </div>

              <div className="campo">
                <label htmlFor="aportePorPersona">
                  Aporte por persona
                </label>
                <input
                  id="aportePorPersona"
                  type="number"
                  min="0"
                  step="0.01"
                  value={campo('aportePorPersona')}
                  onChange={(e) =>
                    cambiar('aportePorPersona', e.target.value)
                  }
                  required
                />
              </div>
            </>
          )}

          <div className="campo">
            <label htmlFor="descripcionViaje">
              Descripción adicional (opcional)
            </label>
            <textarea
              id="descripcionViaje"
              value={campo('contenido')}
              onChange={(e) => cambiar('contenido', e.target.value)}
              placeholder="Agregá detalles sobre el viaje"
            />
          </div>
        </>
      )}

      {subCategoria === 'TRASLADOS' && (
        <>
          <div className="campo">
            <label htmlFor="horarioDisponible">
              Horario disponible
            </label>
            <input
              id="horarioDisponible"
              type="text"
              value={campo('horarioDisponible')}
              onChange={(e) =>
                cambiar('horarioDisponible', e.target.value)
              }
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="modalidadCobro">Modalidad de cobro</label>
            <select
              id="modalidadCobro"
              value={campo('modalidadCobro')}
              onChange={(e) =>
                cambiar('modalidadCobro', e.target.value)
              }
              required
            >
              <option value="">Seleccioná una modalidad</option>
              <option value="FIJO">Precio fijo</option>
              <option value="POR_HORA">Por hora</option>
              <option value="A_CONVENIR">A convenir</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="importeTraslado">
              Importe (opcional)
            </label>
            <input
              id="importeTraslado"
              type="number"
              min="0"
              step="0.01"
              value={campo('importeTraslado')}
              onChange={(e) =>
                cambiar('importeTraslado', e.target.value)
              }
            />
          </div>
        </>
      )}
    </section>
  );
}

export default CamposViajes;
