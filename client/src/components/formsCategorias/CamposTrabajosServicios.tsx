
type ValorCampo = string | number | boolean | string[] | null;

type CamposTrabajoServiciosProps = {
  subCategoria: string;
  localidadesCosta: string[];
  valores: Record<string, ValorCampo>;
  onCampoChange: (nombre: string, valor: ValorCampo) => void;
};


const estiloEtiqueta = {
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '0.6rem',
  width: '100%',
  boxSizing: 'border-box' as const,
  margin: 0,
  padding: '0.65rem 0.75rem',
  backgroundColor: '#ffffff',
  color: '#252a34',
  border: '1px solid #dce1e8',
  borderRadius: '6px',
  cursor: 'pointer',
};

const estiloCheckbox = {
  display: 'inline-block',
  flex: '0 0 16px',
  width: '16px',
  height: '16px',
  margin: '0',
  padding: '0',
  accentColor: '#375a7f',
}

function CamposTrabajoServicios({
  subCategoria,
  localidadesCosta,
  valores,
  onCampoChange,
}: CamposTrabajoServiciosProps) {
  if (!['BUSCO_TRABAJO', 'SERVICIOS'].includes(subCategoria)) {
    return null;
  }

  const localidadesSeleccionadas = Array.isArray(valores.localidades)
    ? valores.localidades.filter(
      (loc): loc is string => typeof loc === 'string'
    )
    : [];

  const todasLasLocalidades =
    localidadesCosta.length > 0 &&
    localidadesCosta.every((loc) =>
      localidadesSeleccionadas.includes(loc)
    );

  const cambiarLocalidad = (localidad: string, marcada: boolean) => {
    const nuevasLocalidades = marcada
      ? [...new Set([...localidadesSeleccionadas, localidad])]
      : localidadesSeleccionadas.filter((loc) => loc !== localidad);

    onCampoChange('localidades', nuevasLocalidades);
  };

  const cambiarTodas = (marcada: boolean) => {
    onCampoChange(
      'localidades',
      marcada ? [...localidadesCosta] : []
    );
  };

  return (
    <section style={{
    
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      display: 'grid',
      gap: '0.5rem',
      alignItems: 'start',
    }}
    >
      <p className="campo">¿En qué localidades?</p><br></br>



      <label
        className="seleccionar-todas-localidades"
        style={estiloEtiqueta}
        htmlFor="todasLasLocalidades"
      > <input
          id="todasLasLocalidades"
          style={estiloCheckbox}
          type="checkbox"
          checked={todasLasLocalidades}
          onChange={(e) => cambiarTodas(e.target.checked)}
        />
        Todas las localidades de la Costa de Oro
      </label>


      {localidadesCosta.map((loc) => (
        <div key={loc}>

          <label
            style={estiloEtiqueta}
            htmlFor={`localidad-${loc}`}
          > <input
              id={`localidad-${loc}`}
              type="checkbox"
              checked={localidadesSeleccionadas.includes(loc)}
              style={estiloCheckbox}

              onChange={(e) =>
                cambiarLocalidad(loc, e.target.checked)
              }
            />
            {loc.replaceAll('_', ' ')}
          </label>
        </div>
      ))}
    </section>
  )
}

export default CamposTrabajoServicios;
