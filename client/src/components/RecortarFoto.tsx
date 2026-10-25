
import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

interface RecortadorFotoProps {
  archivo: File;
  onConfirmar: (foto: File) => void;
  onCancelar: () => void;
}

export default function RecortadorFoto({
  archivo,
  onConfirmar,
  onCancelar,
}: RecortadorFotoProps) {
  const [imagen, setImagen] = useState('');
  const [recorte, setRecorte] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaRecortada, setAreaRecortada] = useState<Area | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = URL.createObjectURL(archivo);
    setImagen(url);

    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  const confirmarRecorte = async () => {
    if (!areaRecortada) {
      setError('Esperá un momento a que se prepare el recorte.');
      return;
    }

    setProcesando(true);
    setError('');

    try {
      const imagenOriginal = new Image();
      imagenOriginal.src = imagen;

      await new Promise<void>((resolve, reject) => {
        imagenOriginal.onload = () => resolve();
        imagenOriginal.onerror = () =>
          reject(new Error('No se pudo cargar la imagen.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = areaRecortada.width;
      canvas.height = areaRecortada.height;

      const contexto = canvas.getContext('2d');

      if (!contexto) {
        throw new Error('No se pudo preparar el recorte.');
      }

      contexto.drawImage(
        imagenOriginal,
        areaRecortada.x,
        areaRecortada.y,
        areaRecortada.width,
        areaRecortada.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const tipoOriginal = archivo.type;
      const tipoSalida =
        tipoOriginal === 'image/png' ||
        tipoOriginal === 'image/webp'
          ? tipoOriginal
          : 'image/jpeg';

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (resultado) => {
            if (resultado) {
              resolve(resultado);
            } else {
              reject(new Error('No se pudo generar la foto recortada.'));
            }
          },
          tipoSalida,
          0.92
        );
      });

      const extension =
        tipoSalida === 'image/png'
          ? '.png'
          : tipoSalida === 'image/webp'
            ? '.webp'
            : '.jpg';

      const nombre = archivo.name.replace(/\.[^.]+$/, '');

      const fotoRecortada = new File(
        [blob],
        `${nombre}-recortada${extension}`,
        { type: tipoSalida }
      );

      onConfirmar(fotoRecortada);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo recortar la foto.'
      );
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-recortador"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 id="titulo-recortador" className="modal-title fs-5">
              Recortá tu foto
            </h2>

            <button
              type="button"
              className="btn-close"
              onClick={onCancelar}
              disabled={procesando}
              aria-label="Cancelar recorte"
            />
          </div>

          <div className="modal-body">
            <p>
              Mové la imagen y ajustá el zoom hasta encuadrar lo
              que querés mostrar.
            </p>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 3',
                background: '#222',
                overflow: 'hidden',
              }}
            >
              {imagen && (
                <Cropper
                  image={imagen}
                  crop={recorte}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setRecorte}
                  onZoomChange={setZoom}
                  onCropComplete={(_, areaPixels) =>
                    setAreaRecortada(areaPixels)
                  }
                />
              )}
            </div>

            <label htmlFor="zoom-foto" className="form-label mt-3">
              Zoom
            </label>

            <input
              id="zoom-foto"
              type="range"
              className="form-range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />

            {error && (
              <p className="text-danger mt-2" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancelar}
              disabled={procesando}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: 'var(--violeta)',
                color: 'var(--blanco)',
              }}
              onClick={confirmarRecorte}
              disabled={procesando || !imagen || !areaRecortada}
            >
              {procesando ? 'Procesando…' : 'Usar esta foto'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
