
type ValorCampo = string | number | boolean | string[] | null;

type CamposComunidadProps = {
  subCategoria: string;
  localidadesCosta: string[];
  valores: Record<string, ValorCampo>;
  onCampoChange: (nombre: string, valor: ValorCampo) => void;
};

function CamposComunidad({
  subCategoria,
  localidadesCosta,
  valores,
  onCampoChange,
}: CamposComunidadProps) {
  const localidad = String(valores.localidad ?? '');

  const localidadObligatoria = [
    'NOTICIAS',
    'GALERIA',
    'AVISOS',
    'PARTICIPACION',
    'HISTORIAS',
  ].includes(subCategoria);

  return (
    <section className="campos-Comunidad">
      <div className="campo">
        <label htmlFor="localidadComunidad">
          Localidad
          {localidadObligatoria ? ' (obligatoria)' : ' (opcional)'}
        </label>

        <select
          id="localidadComunidad"
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

export default CamposComunidad;
