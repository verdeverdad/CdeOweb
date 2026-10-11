import { Router } from 'express';
import { prisma } from '../db.js'; // Asegurate de que la ruta al db.ts sea correcta
import { verificarToken, type AuthRequest } from '../middleware/auth.js';

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
    console.log("Error al obtener publicaciones:", error);
  }
});


 // Obtener una publicación por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; //obtiene el UUID que viene en la URL.

    const post = await prisma.post.findUnique({ //busca una única publicación cuyo id coincida.
      where: { id },
      include: { //permite traer también el nombre y el teléfono del autor.
        author: {
          select: {
            id: true,
            nombre: true, 
            telefono: true,
          },
        },
      },
    });

    if (!post) {
      res.status(404).json({
        error: 'No se encontró la publicación',
      });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error('Error al obtener la publicación:', error);
    res.status(500).json({
      error: 'No se pudo cargar la publicación',
    });
  }
});


// Crear una publicación

router.post('/', verificarToken, async (req: AuthRequest, res) => {
  const {
    titulo,
    contenido,
    localidad,
    categoria,
    subCategoria,
    fecha,
    hora,
  } = req.body;

  const authorId = req.user!.userId;

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
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(400).json({
      error: 'Error al crear la publicación',
    });
  }
});


export default router;