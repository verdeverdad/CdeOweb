
type ValorCampo = string | number | boolean | string[] | null;

type CamposPatitasProps = {
  subCategoria: string;
  localidadesCosta: string[];
  valores: Record<string, ValorCampo>;
  onCampoChange: (nombre: string, valor: ValorCampo) => void;
};

function CamposPatitas({
  subCategoria,
  localidadesCosta,
  valores,
  onCampoChange,
}: CamposPatitasProps) {
  const localidad = String(valores.localidad ?? '');

  const localidadObligatoria = [
    'PERDIDOS',
    'ENCONTRADOS',
    'ADOPCION',
  ].includes(subCategoria);

  return (
    <section className="campos-patitas">
      <div className="campo">
        <label htmlFor="localidadPatitas">
          Localidad
          {localidadObligatoria ? ' (obligatoria)' : ' (opcional)'}
        </label>

        <select
          id="localidadPatitas"
          value={localidad}
          onChange={(e) =>
            onCampoChange('localidad', e.target.value)
          }
          required={localidadObligatoria}
        >
          <option value="">Seleccioná una localidad</option>

          {localidadesCosta.map((loc) => (
            <option key={loc} value={loc}>
              {loc.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default CamposPatitas;


