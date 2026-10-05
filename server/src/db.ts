import { PrismaClient } from '@prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'node:fs';

import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL no está configurada');
}

const connectionUrl = new URL(databaseUrl);
connectionUrl.searchParams.delete('sslmode');

// Obtiene el certificado de la variable de entorno (Render/Prod)
// Si no existe, intenta leer el archivo local .crt (Desarrollo)
const getCaCert = (): string | undefined => {
  if (process.env.DB_CA_CERT) {
    return process.env.DB_CA_CERT;
  }
  
  const localCertPath = new URL('./prod-ca-2021.crt', import.meta.url);
  if (fs.existsSync(localCertPath)) {
    return fs.readFileSync(localCertPath, 'utf8');
  }

  return undefined;
};

const caCert = getCaCert();

const pool = new pg.Pool({ 
  connectionString: connectionUrl.toString(),
  
  ssl: caCert
    ? {
        ca: caCert,
        rejectUnauthorized: true,
      }
    : process.env.NODE_ENV === 'production' || process.env.RENDER
      ? { rejectUnauthorized: false }
      : undefined,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });