import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Forzamos la carga del .env buscando el archivo en la misma carpeta
dotenv.config({ path: path.resolve(__dirname, '.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("CRÍTICO: La variable de entorno DATABASE_URL no está definida en " + path.resolve(__dirname, '.env'));
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: databaseUrl,
  },
});