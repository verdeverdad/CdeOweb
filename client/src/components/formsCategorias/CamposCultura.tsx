
import { useState } from 'react';

type ValorCampo = string | number | boolean | string[] | null;

type CamposCulturaProps = {
  subCategoria: string;
  localidadesCosta: string[];
  valores: Record<string, ValorCampo>;
  onCampoChange: (nombre: string, valor: ValorCampo) => void;
};

function CamposCultura({
  subCategoria,
  localidadesCosta,
  valores,
  onCampoChange,
}: CamposCulturaProps) {
  const campo = (nombre: string, defecto = '') =>
    String(valores[nombre] ?? defecto);

  const [tipoActividad, setTipoActividad] = useState(String(valores?.tipoActividad ?? 'UNICA')
  );
  const [frecuencia, setFrecuencia] = useState(
    campo('frecuencia', 'SEMANAL')
  );
  const [reglaMensual, setReglaMensual] = useState(
    campo('reglaMensual', 'DIA_DEL_MES')
  );

  const esCursoOTaller =
    subCategoria === 'CURSOS' || subCategoria === 'TALLERES';

  const recurrente =
    esCursoOTaller && tipoActividad === 'RECURRENTE';

  const cambiar = (nombre: string, valor: string) => {
    onCampoChange(nombre, valor);
  };

  return (
    <section className="campos-cultura">
      {esCursoOTaller && (
        <div className="campo">
          <label htmlFor="tipoActividad">Tipo de actividad</label>
          <select
            id="tipoActividad"
            value={tipoActividad}
            onChange={(e) => {
              const valor = e.target.value;
              setTipoActividad(valor);
              cambiar('tipoActividad', valor);
            }}
            required
          >
            <option value="UNICA">Actividad única</option>
            <option value="RECURRENTE">Actividad recurrente</option>
          </select>
        </div>
      )}

      {!recurrente && (
        <div className="campo">
          <label htmlFor="fechaActividad">Fecha de la actividad</label>
          <input
            id="fechaActividad"
            type="date"
            value={campo('fechaActividad')}
            onChange={(e) =>
              cambiar('fechaActividad', e.target.value)
            }
            required
          />
        </div>
      )}

      {recurrente && (
        <>
          <div className="campo">
            <label htmlFor="fechaInicio">Fecha de inicio</label>
            <input
              id="fechaInicio"
              type="date"
              value={campo('fechaInicio')}
              onChange={(e) =>
                cambiar('fechaInicio', e.target.value)
              }
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="fechaFin">Fecha de finalización (opcional)</label>
            <input
              id="fechaFin"
              type="date"
              value={campo('fechaFin')}
              onChange={(e) =>
                cambiar('fechaFin', e.target.value)
              }
            />
          </div>

          <div className="campo">
            <label htmlFor="frecuencia">Frecuencia</label>
            <select
              id="frecuencia"
              value={frecuencia}
              onChange={(e) => {
                const valor = e.target.value;
                setFrecuencia(valor);
                cambiar('frecuencia', valor);
              }}
              required
            >
              <option value="SEMANAL">Semanal</option>
              <option value="MENSUAL">Mensual</option>
            </select>
          </div>

          {frecuencia === 'SEMANAL' && (
            <div className="campo">
              <label htmlFor="diaSemana">Día de la semana</label>
              <select
                id="diaSemana"
                value={campo('diaSemana', 'MARTES')}
                onChange={(e) =>
                  cambiar('diaSemana', e.target.value)
                }
                required
              >
                {[
                  'LUNES',
                  'MARTES',
                  'MIERCOLES',
                  'JUEVES',
                  'VIERNES',
                  'SABADO',
                  'DOMINGO',
                ].map((dia) => (
                  <option key={dia} value={dia}>
                    {dia.charAt(0) + dia.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {frecuencia === 'MENSUAL' && (
            <>
              <div className="campo">
                <label htmlFor="reglaMensual">
                  Regla mensual
                </label>
                <select
                  id="reglaMensual"
                  value={reglaMensual}
                  onChange={(e) => {
                    const valor = e.target.value;
                    setReglaMensual(valor);
                    cambiar('reglaMensual', valor);
                  }}
                  required
                >
                  <option value="DIA_DEL_MES">Día del mes</option>
                  <option value="ORDINAL">Día de la semana por orden</option>
                </select>
              </div>

              {reglaMensual === 'DIA_DEL_MES' ? (
                <div className="campo">
                  <label htmlFor="diaMes">Día del mes</label>
                  <input
                    id="diaMes"
                    type="number"
                    min="1"
                    max="31"
                    value={campo('diaMes', '1')}
                    onChange={(e) =>
                      cambiar('diaMes', e.target.value)
                    }
                    required
                  />
                </div>
              ) : (
                <>
                  <div className="campo">
                    <label htmlFor="ordinalMensual">
                      Orden del día
                    </label>
                    <select
                      id="ordinalMensual"
                      value={campo('ordinalMensual', 'PRIMER')}
                      onChange={(e) =>
                        cambiar('ordinalMensual', e.target.value)
                      }
                      required
                    >
                      {['PRIMER', 'SEGUNDO', 'TERCER', 'CUARTO', 'ULTIMO'].map(
                        (orden) => (
                          <option key={orden} value={orden}>
                            {orden.charAt(0) + orden.slice(1).toLowerCase()}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="campo">
                    <label htmlFor="diaSemanaMensual">
                      Día de la semana
                    </label>
                    <select
                      id="diaSemanaMensual"
                      value={campo('diaSemanaMensual', 'MARTES')}
                      onChange={(e) =>
                        cambiar('diaSemanaMensual', e.target.value)
                      }
                      required
                    >
                      {[
                        'LUNES',
                        'MARTES',
                        'MIERCOLES',
                        'JUEVES',
                        'VIERNES',
                        'SABADO',
                        'DOMINGO',
                      ].map((dia) => (
                        <option key={dia} value={dia}>
                          {dia.charAt(0) + dia.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

      <div className="campo">
        <label htmlFor="horaActividad">Horario</label>
        <input
          id="horaActividad"
          type="time"
          value={campo('horaActividad')}
          onChange={(e) =>
            cambiar('horaActividad', e.target.value)
          }
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="localidadCultura">Localidad</label>
        <select
          id="localidadCultura"
          value={campo('localidad')}
          onChange={(e) => cambiar('localidad', e.target.value)}
          required
        >
          <option value="">Seleccioná una localidad</option>
          {localidadesCosta.map((loc) => (
            <option key={loc} value={loc}>
              {loc.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="lugarActividad">
          Dirección o lugar (opcional)
        </label>
        <input
          id="lugarActividad"
          type="text"
          value={campo('lugarActividad')}
          onChange={(e) =>
            cambiar('lugarActividad', e.target.value)
          }
          placeholder="Ej.: Centro cultural, calle y número"
        />
      </div>

      <div className="campo">
        <label htmlFor="costoActividad">Costo de la actividad</label>
        <select
          id="costoActividad"
          value={campo('costoActividad', 'GRATIS')}
          onChange={(e) =>
            cambiar('costoActividad', e.target.value)
          }
          required
        >
          <option value="GRATIS">Gratis</option>
          <option value="CON_COSTO">Con costo</option>
        </select>
      </div>

      {campo('costoActividad', 'GRATIS') === 'CON_COSTO' && (
        <div className="campo">
          <label htmlFor="importeActividad">Importe</label>
          <input
            id="importeActividad"
            type="number"
            min="0.01"
            step="0.01"
            value={campo('importeActividad')}
            onChange={(e) =>
              cambiar('importeActividad', e.target.value)
            }
            required
          />
        </div>
      )}
    </section>
  );
}

export default CamposCultura;
