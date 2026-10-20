
type ValorCampo = string | number | boolean | string[] | null;

type CamposMercadoProps = {
  subCategoria: string;
  localidadesCosta: string[];
  valores: Record<string, ValorCampo>;
  onCampoChange: (nombre: string, valor: ValorCampo) => void;
};

function CamposMercado({
  subCategoria,
  localidadesCosta,
  valores,
  onCampoChange,
}: CamposMercadoProps) {
const campo = (nombre: string) => String(valores?.[nombre] ?? '');
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
              value={campo('queOfrece')}
              onChange={(e) =>
                onCampoChange('queOfrece', e.target.value)
              }
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
              value={campo('queBusca')}
              onChange={(e) =>
                onCampoChange('queBusca', e.target.value)
              }
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
              value={campo('localidad')}
              onChange={(e) =>
                onCampoChange('localidad', e.target.value)
              }
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
            <label htmlFor="descripcionAdicional">
              Descripción adicional (opcional)
            </label>
            <textarea
              id="descripcionAdicional"
              value={campo('descripcionAdicional')}
              onChange={(e) =>
                onCampoChange(
                  'descripcionAdicional',
                  e.target.value
                )
              }
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
            value={campo('precio')}
            onChange={(e) =>
              onCampoChange('precio', e.target.value)
            }
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
            value={campo('contenido')}
            onChange={(e) =>
              onCampoChange('contenido', e.target.value)
            }
            placeholder="Contanos de qué se trata"
            required
          />
        </div>
      )}
    </section>
  );
}

export default CamposMercado;
