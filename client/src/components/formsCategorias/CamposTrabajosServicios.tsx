import type { Dispatch, SetStateAction } from 'react';

type CamposTrabajoServiciosProps = {
  subCategoria: string;
  localidadesCosta: string[];
  localidadesSeleccionadas: string[];
  setLocalidadesSeleccionadas: Dispatch<SetStateAction<string[]>>;
  todasLasLocalidades: boolean;
  setTodasLasLocalidades: Dispatch<SetStateAction<boolean>>;
};

function CamposTrabajoServicios({
  subCategoria,
  localidadesCosta,
  localidadesSeleccionadas,
  setLocalidadesSeleccionadas,
  todasLasLocalidades,
  setTodasLasLocalidades,
}: CamposTrabajoServiciosProps) {
  if (
    subCategoria !== 'BUSCO_TRABAJO' &&
    subCategoria !== 'SERVICIOS'
  ) {
    return null;
  }

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
  };

  return (
    <section
      className="campos-localidades"
      style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#f7f8fa',
        color: '#252a34',
        border: '1px solid #dce1e8',
        borderRadius: '10px',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        display: 'grid',
        gap: '0.5rem',
        alignItems: 'start',
      }}
    >
      <h2>Localidades donde trabajás</h2>

      <label
        className="seleccionar-todas-localidades"
        style={estiloEtiqueta}
      >
        <input
          style={estiloCheckbox}
          type="checkbox"
          checked={todasLasLocalidades}
          onChange={(e) => {
            const seleccionadas = e.target.checked;

            setTodasLasLocalidades(seleccionadas);
            setLocalidadesSeleccionadas(
              seleccionadas ? [...localidadesCosta] : []
            );
          }}
        />
        Seleccionar todas las localidades
      </label>

      {localidadesCosta.map((localidad) => (
        <label key={localidad} style={estiloEtiqueta}>
          <input
            style={estiloCheckbox}
            type="checkbox"
            checked={
              todasLasLocalidades ||
              localidadesSeleccionadas.includes(localidad)
            }
            disabled={todasLasLocalidades}
            onChange={(e) => {
              if (e.target.checked) {
                setLocalidadesSeleccionadas((prev) => [
                  ...prev,
                  localidad,
                ]);
              } else {
                setLocalidadesSeleccionadas((prev) =>
                  prev.filter((item) => item !== localidad)
                );
              }
            }}
          />
          {localidad.replaceAll('_', ' ')}
        </label>
      ))}
    </section>
  );
}

export default CamposTrabajoServicios;