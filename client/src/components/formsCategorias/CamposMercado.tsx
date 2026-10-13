
type CamposMercadoProps = {
  subCategoria: string;
  localidadesCosta: string[];
  precio: string;
  onPrecioChange: (nuevoPrecio: string) => void;
};

function CamposMercado({
  subCategoria,
  localidadesCosta,
  precio,
  onPrecioChange,
}: CamposMercadoProps) {
  return (
    <section className="campos-mercado">
      {subCategoria === 'TRUEQUE' && (
        <>
          <div className="campo">
            <label htmlFor="tengo">
              ¿Qué tenés para intercambiar?
            </label>
            <textarea
              id="tengo"
              placeholder="Contanos qué ofrecés"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="busco">
              ¿Qué estás buscando?
            </label>
            <textarea
              id="busco"
              placeholder="Contanos qué te gustaría recibir"
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="localidadIntercambio">
              Localidad del intercambio
            </label>
            <select
              id="localidadIntercambio"
              defaultValue=""
              required
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

          <div className="campo">
            <label htmlFor="descripcionAdicional">
              Descripción adicional (opcional)
            </label>
            <textarea
              id="descripcionAdicional"
              placeholder="Agregá detalles sobre el intercambio"
            />
          </div>
        </>
      )}

      {(subCategoria === 'COMPRA' ||
        subCategoria === 'VENTA') && (
        <div className="campo">
          <label htmlFor="precio">Precio (obligatorio)</label>
          <input
            id="precio"
            type="number"
            min="0.01"
            step="0.01"
            value={precio}
            onChange={(e) => onPrecioChange(e.target.value)}
            placeholder="Ingresá el precio"
            required
          />
        </div>
      )}

      {subCategoria !== 'TRUEQUE' && (
        <div className="campo">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            placeholder="Contanos de qué se trata"
            required
          />
        </div>
      )}
    </section>
  );
}

export default CamposMercado;
