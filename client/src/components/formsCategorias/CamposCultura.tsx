import { useState } from 'react';

type CamposCulturaProps = {
  subCategoria: string;
  localidadesCosta: string[];
  costoActividad: string;
  onCostoActividadChange: (costo: string) => void;
};

function CamposCultura({
  subCategoria,
  localidadesCosta,
  costoActividad,
  onCostoActividadChange,
}: CamposCulturaProps) {
  const [tipoActividad, setTipoActividad] =
    useState<'UNICA' | 'RECURRENTE'>('UNICA');

  const [frecuencia, setFrecuencia] =
    useState<'SEMANAL' | 'MENSUAL'>('SEMANAL');

  const [diaSemana, setDiaSemana] = useState('MARTES');

  const [reglaMensual, setReglaMensual] =
    useState<'DIA_DEL_MES' | 'ORDINAL'>('DIA_DEL_MES');

  const [diaMes, setDiaMes] = useState('1');
  const [ordinalMensual, setOrdinalMensual] = useState('PRIMER');
  const [diaSemanaMensual, setDiaSemanaMensual] = useState('MARTES');

  const esCursoOTaller =
    subCategoria === 'CURSOS' || subCategoria === 'TALLERES';

  return (
    <section className="campos-cultura">
      <h2>Datos de la actividad</h2>

      {esCursoOTaller && (
        <div className="campo">
          <label htmlFor="tipoActividad">
            ¿Cómo se realiza la actividad?
          </label>
          <select
            id="tipoActividad"
            value={tipoActividad}
            onChange={(e) =>
              setTipoActividad(e.target.value as 'UNICA' | 'RECURRENTE')
            }
          >
            <option value="UNICA">Una sola fecha</option>
            <option value="RECURRENTE">Se repite periódicamente</option>
          </select>
        </div>
      )}

      {(!esCursoOTaller || tipoActividad === 'UNICA') && (
        <div className="campo">
          <label htmlFor="fechaActividad">Fecha</label>
          <input id="fechaActividad" type="date" required />
        </div>
      )}

      {esCursoOTaller && tipoActividad === 'RECURRENTE' && (
        <>
          <div className="campo">
            <label htmlFor="fechaInicio">Fecha de inicio</label>
            <input id="fechaInicio" type="date" required />
          </div>

          <div className="campo">
            <label htmlFor="fechaFin">
              Fecha de finalización (opcional)
            </label>
            <input id="fechaFin" type="date" />
          </div>

          <div className="campo">
            <label htmlFor="frecuencia">Frecuencia</label>
            <select
              id="frecuencia"
              value={frecuencia}
              onChange={(e) =>
                setFrecuencia(e.target.value as 'SEMANAL' | 'MENSUAL')
              }
            >
              <option value="SEMANAL">Todas las semanas</option>
              <option value="MENSUAL">Todos los meses</option>
            </select>
          </div>

          {frecuencia === 'SEMANAL' && (
            <div className="campo">
              <label htmlFor="diaSemana">Día de la semana</label>
              <select
                id="diaSemana"
                value={diaSemana}
                onChange={(e) => setDiaSemana(e.target.value)}
              >
                <option value="LUNES">Lunes</option>
                <option value="MARTES">Martes</option>
                <option value="MIERCOLES">Miércoles</option>
                <option value="JUEVES">Jueves</option>
                <option value="VIERNES">Viernes</option>
                <option value="SABADO">Sábado</option>
                <option value="DOMINGO">Domingo</option>
              </select>
            </div>
          )}

          {frecuencia === 'MENSUAL' && (
            <>
              <div className="campo">
                <label htmlFor="reglaMensual">¿Cómo se repite?</label>
                <select
                  id="reglaMensual"
                  value={reglaMensual}
                  onChange={(e) =>
                    setReglaMensual(
                      e.target.value as 'DIA_DEL_MES' | 'ORDINAL'
                    )
                  }
                >
                  <option value="DIA_DEL_MES">
                    Un día específico del mes
                  </option>
                  <option value="ORDINAL">
                    Un día de la semana específico
                  </option>
                </select>
              </div>

              {reglaMensual === 'DIA_DEL_MES' && (
                <div className="campo">
                  <label htmlFor="diaMes">Día del mes</label>
                  <select
                    id="diaMes"
                    value={diaMes}
                    onChange={(e) => setDiaMes(e.target.value)}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(
                      (dia) => (
                        <option key={dia} value={dia}>
                          Día {dia}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {reglaMensual === 'ORDINAL' && (
                <>
                  <div className="campo">
                    <label htmlFor="ordinalMensual">
                      ¿Cuál semana del mes?
                    </label>
                    <select
                      id="ordinalMensual"
                      value={ordinalMensual}
                      onChange={(e) => setOrdinalMensual(e.target.value)}
                    >
                      <option value="PRIMER">Primer</option>
                      <option value="SEGUNDO">Segundo</option>
                      <option value="TERCER">Tercer</option>
                      <option value="CUARTO">Cuarto</option>
                      <option value="ULTIMO">Último</option>
                    </select>
                  </div>

                  <div className="campo">
                    <label htmlFor="diaSemanaMensual">
                      Día de la semana
                    </label>
                    <select
                      id="diaSemanaMensual"
                      value={diaSemanaMensual}
                      onChange={(e) => setDiaSemanaMensual(e.target.value)}
                    >
                      <option value="LUNES">Lunes</option>
                      <option value="MARTES">Martes</option>
                      <option value="MIERCOLES">Miércoles</option>
                      <option value="JUEVES">Jueves</option>
                      <option value="VIERNES">Viernes</option>
                      <option value="SABADO">Sábado</option>
                      <option value="DOMINGO">Domingo</option>
                    </select>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}

      <div className="campo">
        <label htmlFor="horaActividad">Hora</label>
        <input id="horaActividad" type="time" required />
      </div>

      <div className="campo">
        <label htmlFor="localidadCultura">Localidad</label>
        <select id="localidadCultura" defaultValue="" required>
          <option value="" disabled>
            Seleccioná una localidad
          </option>
          {localidadesCosta.map((localidad) => (
            <option key={localidad} value={localidad}>
              {localidad.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="lugarActividad">Dirección</label>
        <input
          id="lugarActividad"
          type="text"
          placeholder="Lugar de la actividad"
        />
      </div>

      <div className="campo">
        <label htmlFor="costoActividad">Costo</label>
        <select
          id="costoActividad"
          value={costoActividad}
          onChange={(e) => onCostoActividadChange(e.target.value)}
        >
          <option value="GRATIS">Gratis</option>
          <option value="CON_COSTO">Con costo</option>
        </select>
      </div>

      {costoActividad === 'CON_COSTO' && (
        <div className="campo">
          <label htmlFor="importeActividad">Importe</label>
          <input
            id="importeActividad"
            type="number"
            min="0"
            step="any"
            placeholder="Importe de la actividad"
          />
        </div>
      )}
    </section>
  );
}

export default CamposCultura;
