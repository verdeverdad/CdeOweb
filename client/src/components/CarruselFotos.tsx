
import { useState } from "react";

interface CarruselFotosProps {
  fotos: string[];
  titulo: string;
  onAmpliar: (foto: string) => void;
}

export default function CarruselFotos({
  fotos,
  titulo,
  onAmpliar,
}: CarruselFotosProps) {
  const [indiceActual, setIndiceActual] = useState(0);

  if (fotos.length === 0) {
    return null;
  }

  const fotoActual = fotos[indiceActual];

  const anterior = () => {
    setIndiceActual((indice) =>
      indice === 0 ? fotos.length - 1 : indice - 1
    );
  };

  const siguiente = () => {
    setIndiceActual((indice) =>
      indice === fotos.length - 1 ? 0 : indice + 1
    );
  };

  return (
    <div className="position-relative">
      <button
        type="button"
        className="btn p-0 border-0 w-100"
        onClick={() => onAmpliar(fotoActual)}
        aria-label={`Ampliar foto ${indiceActual + 1} de ${fotos.length}: ${titulo}`}
      >
        <img
          src={fotoActual}
          className="card-img-top"
          alt={`${titulo} — foto ${indiceActual + 1} de ${fotos.length}`}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
      </button>

      {fotos.length > 1 && (
        <>
          <button
            type="button"
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-2 rounded-circle shadow"
            onClick={anterior}
            aria-label="Ver foto anterior"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            type="button"
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle shadow"
            onClick={siguiente}
            aria-label="Ver foto siguiente"
          >
            <span aria-hidden="true">›</span>
          </button>

          <span
            className="badge bg-dark position-absolute bottom-0 end-0 m-2"
            aria-live="polite"
            aria-atomic="true"
          >
            {indiceActual + 1} / {fotos.length}
          </span>
        </>
      )}
    </div>
  );
}
