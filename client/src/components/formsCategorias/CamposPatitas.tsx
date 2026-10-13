
type CamposPatitasProps = {
  subCategoria: string;
  localidadesCosta: string[];
};

function CamposPatitas({
  subCategoria,
  localidadesCosta,
}: CamposPatitasProps) {
  const localidadObligatoria =
    subCategoria === 'PERDIDOS' ||
    subCategoria === 'ENCONTRADOS' ||
    subCategoria === 'ADOPCION';

  return (
    <section className="campos-patitas">
      <div className="campo">
        <label htmlFor="localidadPatitas">Localidad</label>

        <select
          id="localidadPatitas"
          defaultValue=""
          required={localidadObligatoria}
        >
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
    </section>
  );
}

export default CamposPatitas;
