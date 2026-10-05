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

const pool = new pg.Pool({ 
  connectionString: connectionUrl.toString(),
  ssl: {
    ca: fs.readFileSync(new URL('../prod-ca-2021.crt', import.meta.url), 'utf8'),
    rejectUnauthorized: true,
  },
});

const adapter = new PrismaPg(pool);

// Exportamos la instancia que YA SABEMOS que funciona
export const prisma = new PrismaClient({ adapter });