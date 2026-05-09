import 'dotenv/config';
import { defineConfig } from '@prisma/config';

// Cargamos variables de entorno desde server/.env para que Prisma pueda leer DATABASE_URL.
// Prisma config no carga .env automáticamente cuando se usa `process.env` aquí.

export default defineConfig({
  // Prisma busca el esquema en ./prisma/schema.prisma por defecto,
  // pero lo dejamos explícito por seguridad.
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});