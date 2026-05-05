import { defineConfig } from '@prisma/config';

// No necesitas dotenv.config() aquí; Prisma 7 busca el .env automáticamente
// y Render ya inyecta las variables directamente en el sistema.

export default defineConfig({
  // Prisma busca el esquema en ./prisma/schema.prisma por defecto, 
  // pero lo dejamos explícito por seguridad.
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});