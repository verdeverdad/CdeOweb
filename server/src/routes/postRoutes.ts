import { Router } from 'express';
import { prisma } from '../db.js'; // Asegurate de que la ruta al db.ts sea correcta

const router = Router();

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { nombre: true, telefono: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "No se pudo cargar la cartelera" });
  }
});

// Crear una publicación
router.post('/', async (req, res) => {
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
    res.status(400).json({ error: "Error al crear la publicación" });
  }
});

export default router;