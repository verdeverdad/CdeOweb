
import cloudinary from './cloudinary.js';
import { Readable } from 'node:stream';
import type { Express } from 'express';

export async function subirFotosCloudinary(
  archivos: Express.Multer.File[]
): Promise<string[]> {
  return Promise.all(
    archivos.map(
      (archivo) =>
        new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'Costa-de-Oro/publicaciones',
              resource_type: 'image',
            },
            (error, resultado) => {
              if (error) {
                reject(error);
                return;
              }

              if (!resultado?.secure_url) {
                reject(new Error('Cloudinary no devolvió la URL de la imagen'));
                return;
              }

              resolve(resultado.secure_url);
            }
          );

          Readable.from(archivo.buffer).pipe(stream);
        })
    )
  );
}
