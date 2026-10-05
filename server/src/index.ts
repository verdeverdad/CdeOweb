import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js'; // <--- Importamos las rutas
import { prisma } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/posts', postRoutes); // <--- Todas las rutas de posts ahora viven bajo /api/posts

// Health check sigue acá por ser general
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`; 
    res.json({ status: 'ok', message: 'Servidor Costa de Oro funcionando' });
  } catch (error) {
    res.status(500).json({ status: 'error' });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    res.json({ ok: true, result });
  } catch (error: any) {
    console.error('Error de conexión a Supabase:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
