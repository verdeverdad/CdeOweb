import { Router } from 'express';
import { prisma } from '../db.js';
import { verificarToken, type AuthRequest } from '../middleware/auth.js';
import { Localidad } from '@prisma/client';

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


// Obtener las publicaciones del usuario autenticado
router.get('/mis-publicaciones', verificarToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;

    const publicaciones = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            nombre: true,
            telefono: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener mis publicaciones:', error);
    res.status(500).json({
      error: 'No se pudieron cargar tus publicaciones',
    });
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



// Actualizar una publicación
router.patch('/:id', verificarToken, async (req: AuthRequest, res) => { //usamos PATCH porque queremos modificar una publicación existente
  try {
    const id = req.params.id;

    if (typeof id !== 'string') {
      res.status(400).json({
        error: 'El ID de la publicación no es válido',
      });
      return;
    } const userId = req.user!.userId;

    // Buscar la publicación y el usuario que solicita el cambio
    const [publicacion, usuario] = await Promise.all([
      prisma.post.findUnique({
        where: { id },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      }),
    ]);

    if (!publicacion) {
      res.status(404).json({
        error: 'No se encontró la publicación',
      });
      return;
    }

    if (!usuario) {
      res.status(401).json({
        error: 'Usuario no encontrado',
      });
      return;
    }

    // Solo puede editar el autor o un superadministrador
    const esAutor = publicacion.authorId === userId;
    const esSuperAdmin = usuario.role === 'SUPER_ADMIN';

    if (!esAutor && !esSuperAdmin) {
      res.status(403).json({
        error: 'No tenés permiso para editar esta publicación',
      });
      return;
    }

    const {
      titulo,
      contenido,
      localidad,
      categoria,
      subCategoria,
      fecha,
      hora,
    } = req.body;

    // Actualizar únicamente los campos recibidos
    const datosActualizar = {
      ...(typeof titulo === 'string' && { titulo }),
      ...(typeof contenido === 'string' && { contenido }),
      ...(typeof localidad === 'string' &&
        Object.values(Localidad).includes(localidad as Localidad) && {
        localidad: localidad as Localidad,
      }),
      ...(typeof categoria === 'string' && { categoria }),
      ...(typeof subCategoria === 'string' && { subCategoria }),
      ...(typeof fecha === 'string' && { fecha }),
      ...(typeof hora === 'string' && { hora }),
    };
    const publicacionActualizada = await prisma.post.update({
      where: { id },
      data: datosActualizar,
      include: {
        author: {
          select: {
            id: true,
            nombre: true,
            telefono: true,
          },
        },
      },
    });


    res.json(publicacionActualizada);
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    res.status(400).json({
      error: 'No se pudo actualizar la publicación',
    });
  }
});


// Eliminar una publicación
router.delete('/:id', verificarToken, async (req: AuthRequest, res) => {
  const id = req.params.id;

  if (typeof id !== 'string') {
    res.status(400).json({
      error: 'El ID de la publicación no es válido',
    });
    return;
  }

  try {
    const userId = req.user!.userId;

    // Buscar la publicación y el rol del usuario
    const [publicacion, usuario] = await Promise.all([
      prisma.post.findUnique({
        where: { id },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      }),
    ]);

    if (!publicacion) {
      res.status(404).json({
        error: 'No se encontró la publicación',
      });
      return;
    }

    if (!usuario) {
      res.status(401).json({
        error: 'Usuario no encontrado',
      });
      return;
    }

    // Solo el autor o un superadministrador pueden eliminarla
    const esAutor = publicacion.authorId === userId;
    const esSuperAdmin = usuario.role === 'SUPER_ADMIN';

    if (!esAutor && !esSuperAdmin) {
      res.status(403).json({
        error: 'No tenés permiso para eliminar esta publicación',
      });
      return;
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({
      mensaje: 'Publicación eliminada correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({
      error: 'No se pudo eliminar la publicación',
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

    // Mercado
    queOfrece,
    queBusca,
    descripcionAdicional,
    precio,

    // Trabajo y servicios
    localidades,

    // Cultura
    tipoActividad,
    fechaActividad,
    fechaInicio,
    fechaFin,
    frecuencia,
    diaSemana,
    reglaMensual,
    diaMes,
    ordinalMensual,
    diaSemanaMensual,
    horaActividad,
    lugarActividad,
    costoActividad,
    importeActividad,

    // Viajes
    origen,
    destino,
    fechaViaje,
    horaViaje,
    cantidadPasajeros,
    plazasDisponibles,
    compartirGastos,
    aportePorPersona,
    horarioDisponible,
    modalidadCobro,
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

        // Mercado
        queOfrece,
        queBusca,
        descripcionAdicional,
        precio: precio != null && precio !== '' ? precio : undefined,

        // Trabajo y servicios
        localidades: localidades ?? [],

        // Cultura
        tipoActividad,
        fechaActividad: fechaActividad
          ? new Date(`${fechaActividad}T00:00:00.000Z`)
          : undefined,
        fechaInicio: fechaInicio
          ? new Date(`${fechaInicio}T00:00:00.000Z`)
          : undefined,

        fechaFin: fechaFin
          ? new Date(`${fechaFin}T00:00:00.000Z`)
          : undefined,
        frecuencia,
        diaSemana,
        reglaMensual,
        diaMes: diaMes != null && diaMes !== '' ? Number(diaMes) : undefined,
        ordinalMensual,
        diaSemanaMensual,
        horaActividad,
        lugarActividad,
        costoActividad,
        importeActividad:
          importeActividad != null && importeActividad !== ''
            ? importeActividad
            : undefined,

        // Viajes
        origen,
        destino,
        fechaViaje: fechaViaje
          ? new Date(`${fechaViaje}T00:00:00.000Z`)
          : undefined, horaViaje,
        cantidadPasajeros:
          cantidadPasajeros != null && cantidadPasajeros !== ''
            ? Number(cantidadPasajeros)
            : undefined,
        plazasDisponibles:
          plazasDisponibles != null && plazasDisponibles !== ''
            ? Number(plazasDisponibles)
            : undefined,
        compartirGastos,
        aportePorPersona:
          aportePorPersona != null && aportePorPersona !== ''
            ? aportePorPersona
            : undefined,
        horarioDisponible,
        modalidadCobro,
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