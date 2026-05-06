import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'; // Usa * as dotenv para evitar problemas de import
import { PrismaClient } from '@prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. CARGAR VARIABLES AL PRINCIPIO
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 2. CONFIGURACIÓN DE CONEXIÓN
// El Pool de 'pg' es el que realmente habla con la base de datos
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

// Instanciamos Prisma con el adaptador. 
// No necesitas pasar 'datasources' aquí porque ya está en el pool.
export const prisma = new PrismaClient({ adapter });

// 3. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 4. RUTAS
app.get('/api/health', async (req, res) => {
  try {
    // Una pequeña consulta para probar que la DB responde
    await prisma.$queryRaw`SELECT 1`; 
    res.json({ 
      status: 'ok', 
      message: 'Servidor y Base de Datos de Costa de Oro funcionando',
    });
    console.log('✅ DB conectada correctamente')
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error conectando a la DB' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { email, nombre, telefono, localidad, role } = req.body;
    const user = await prisma.user.create({
      data: { email, nombre, telefono, localidad, role }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error al crear usuario. El mail ya existe?" });
  }
});

// Crear una publicación
app.post('/api/posts', async (req, res) => {
  const { authorId, titulo, contenido, localidad, categoria, subCategoria, fecha, hora } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        authorId,
        titulo,
        contenido,
        localidad,
        categoria,
        subCategoria: subCategoria || '',
        fecha: fecha || new Date().toISOString(),
        hora: hora || '',
      }
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al crear la publicación" });
  }
});

// Obtener todas las publicaciones (La Cartelera)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            nombre: true,
            telefono: true, // Lo necesitamos para el botón de WhatsApp
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Las más nuevas primero, como en una cartelera real
      },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error);
    res.status(500).json({ error: "No se pudo cargar la cartelera" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

