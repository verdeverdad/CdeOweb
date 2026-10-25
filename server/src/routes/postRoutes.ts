import { Router } from 'express';
import { prisma } from '../db.js';
import { verificarToken, type AuthRequest } from '../middleware/auth.js';
import { Prisma, Localidad } from '@prisma/client';
import upload from '../config/upload.js';
import { subirFotosCloudinary } from '../config/subirFotos.js';

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

router.patch(
  '/:id',
  verificarToken,
  upload.array('fotos', 5),
  async (req: AuthRequest, res) => {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        res.status(400).json({
          error: 'El ID de la publicación no es válido',
        });
        return;
      }

      const userId = req.user!.userId;

      const [publicacion, usuario] = await Promise.all([
        prisma.post.findUnique({ where: { id } }),
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
        res.status(401).json({ error: 'Usuario no encontrado' });
        return;
      }

      const esAutor = publicacion.authorId === userId;
      const esSuperAdmin = usuario.role === 'SUPER_ADMIN';

      if (!esAutor && !esSuperAdmin) {
        res.status(403).json({
          error: 'No tenés permiso para editar esta publicación',
        });
        return;
      }


      const archivos = (req.files ?? []) as Express.Multer.File[];

      let body: Record<string, unknown>;

      try {
        body =
          typeof req.body.datos === 'string'
            ? JSON.parse(req.body.datos)
            : req.body as Record<string, unknown>;
      } catch {
        res.status(400).json({
          error: 'Los datos de la publicación no son válidos',
        });
        return;
      }

      // Validación de los campos generales obligatorios.
      if (
        Object.hasOwn(body, 'titulo') &&
        (typeof body.titulo !== 'string' || !body.titulo.trim())
      ) {
        res.status(400).json({ error: 'El título es obligatorio' });
        return;
      }

      if (
        Object.hasOwn(body, 'categoria') &&
        (typeof body.categoria !== 'string' || !body.categoria.trim())
      ) {
        res.status(400).json({ error: 'La categoría es obligatoria' });
        return;
      }

      if (
        Object.hasOwn(body, 'subCategoria') &&
        (typeof body.subCategoria !== 'string' || !body.subCategoria.trim())
      ) {
        res.status(400).json({ error: 'La subcategoría es obligatoria' });
        return;
      }

      // Se usa un objeto intermedio y se tipa al enviarlo a Prisma.
      const datos: Record<string, unknown> = {};

      const camposTexto = [
        'titulo',
        'contenido',
        'categoria',
        'subCategoria',
        'fecha',
        'hora',
        'queOfrece',
        'queBusca',
        'descripcionAdicional',
        'tipoActividad',
        'frecuencia',
        'diaSemana',
        'reglaMensual',
        'ordinalMensual',
        'diaSemanaMensual',
        'horaActividad',
        'lugarActividad',
        'costoActividad',
        'origen',
        'destino',
        'horaViaje',
        'compartirGastos',
        'horarioDisponible',
        'modalidadCobro',
      ] as const;

      // Solo modifica los campos de texto que efectivamente llegaron.
      for (const campo of camposTexto) {
        if (!Object.hasOwn(body, campo)) continue;

        const valor = body[campo];

        if (valor === null) {
          datos[campo] = null;
        } else if (typeof valor === 'string') {
          datos[campo] =
            valor.trim() === '' && campo !== 'fecha' && campo !== 'hora'
              ? null
              : valor.trim();
        } else {
          res.status(400).json({
            error: `El campo ${campo} tiene un formato inválido`,
          });
          return;
        }
      }

      // Localidad individual: admite null, pero no localidades inventadas.
      if (Object.hasOwn(body, 'localidad')) {
        const valor = body.localidad;

        if (valor === null || valor === '') {
          datos.localidad = null;
        } else if (
          typeof valor === 'string' &&
          Object.values(Localidad).includes(valor as Localidad)
        ) {
          datos.localidad = valor as Localidad;
        } else {
          res.status(400).json({
            error: 'La localidad seleccionada no es válida',
          });
          return;
        }
      }

      // Varias localidades: se valida cada elemento del array.
      if (Object.hasOwn(body, 'localidades')) {
        const valor = body.localidades;

        if (
          !Array.isArray(valor) ||
          !valor.every(
            (item) =>
              typeof item === 'string' &&
              Object.values(Localidad).includes(item as Localidad)
          )
        ) {
          res.status(400).json({
            error: 'La lista de localidades no es válida',
          });
          return;
        }

        datos.localidades = valor as Localidad[];
      }

      // Fechas que Prisma guarda como DateTime.
      const camposFecha = [
        'fechaActividad',
        'fechaInicio',
        'fechaFin',
        'fechaViaje',
      ] as const;

      for (const campo of camposFecha) {
        if (!Object.hasOwn(body, campo)) continue;

        const valor = body[campo];

        if (valor === null || valor === '') {
          datos[campo] = null;
          continue;
        }

        if (typeof valor !== 'string') {
          res.status(400).json({
            error: `La fecha ${campo} no es válida`,
          });
          return;
        }

        // Los inputs type="date" envían YYYY-MM-DD.
        const fecha = /^\d{4}-\d{2}-\d{2}$/.test(valor)
          ? new Date(`${valor}T00:00:00.000Z`)
          : new Date(valor);

        if (Number.isNaN(fecha.getTime())) {
          res.status(400).json({
            error: `La fecha ${campo} no es válida`,
          });
          return;
        }

        datos[campo] = fecha;
      }

      // Campos enteros.
      const camposEnteros = ['diaMes', 'cantidadPasajeros', 'plazasDisponibles'];

      for (const campo of camposEnteros) {
        if (!Object.hasOwn(body, campo)) continue;

        const valor = body[campo];

        if (valor === null || valor === '') {
          datos[campo] = null;
          continue;
        }

        const numero = Number(valor);

        if (!Number.isInteger(numero)) {
          res.status(400).json({
            error: `El campo ${campo} debe ser un número entero`,
          });
          return;
        }

        datos[campo] = numero;
      }

      // Importes Decimal de Prisma.
      const camposImporte = [
        'precio',
        'importeActividad',
        'aportePorPersona',
      ];

      for (const campo of camposImporte) {
        if (!Object.hasOwn(body, campo)) continue;

        const valor = body[campo];

        if (valor === null || valor === '') {
          datos[campo] = null;
          continue;
        }

        const numero = Number(valor);

        if (!Number.isFinite(numero) || numero < 0) {
          res.status(400).json({
            error: `El importe ${campo} no es válido`,
          });
          return;
        }

        datos[campo] = numero;
      }


      if (req.body.fotosExistentes !== undefined || archivos.length > 0) {
        let fotosExistentes: unknown = req.body.fotosExistentes ?? [];

        if (typeof fotosExistentes === 'string') {
          try {
            fotosExistentes = JSON.parse(fotosExistentes);
          } catch {
            res.status(400).json({
              error: 'La lista de fotos existentes no es válida',
            });
            return;
          }
        }

        if (
          !Array.isArray(fotosExistentes) ||
          !fotosExistentes.every((foto) => typeof foto === 'string')
        ) {
          res.status(400).json({
            error: 'La lista de fotos existentes no es válida',
          });
          return;
        }

        if (fotosExistentes.length + archivos.length > 5) {
          res.status(400).json({
            error: 'Podés tener un máximo de 5 fotos por publicación',
          });
          return;
        }

        const fotosNuevas = await subirFotosCloudinary(archivos);

        datos.fotos = [...fotosExistentes, ...fotosNuevas];
      }


      const publicacionActualizada = await prisma.post.update({
        where: { id },
        data: datos as Prisma.PostUpdateInput,
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

router.post(
  '/',
  verificarToken,
  upload.array('fotos', 5),
  async (req: AuthRequest, res) => {

    const archivos = (req.files ?? []) as Express.Multer.File[];

    let datosRecibidos: Record<string, any>;

    try {
      datosRecibidos = JSON.parse(req.body.datos);
    } catch {
      res.status(400).json({
        error: 'Los datos de la publicación no son válidos',
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
    } = datosRecibidos;

    const authorId = req.user!.userId;



    try {
      const fotos = archivos.length > 0
        ? await subirFotosCloudinary(archivos)
        : [];
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
          fotos,

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
  }
);


export default router;