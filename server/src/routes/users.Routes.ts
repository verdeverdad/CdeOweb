import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { verificarToken, type AuthRequest } from '../middleware/auth.js';
import { Localidad, Role } from '@prisma/client';

dotenv.config();

import { prisma } from '../db.js';

const router = Router();

// Registrar usuario

router.post('/register', async (req, res) => {
  const {
    email,
    password,
    nombre,
    telefono,
    localidad,
    role
  } = req.body;

  try {
    // Validate required fields
    if (
      typeof nombre !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof telefono !== 'string' ||
      typeof localidad !== 'string' ||
      typeof role !== 'string'
    ) {
      return res.status(400).json({
        error: 'Todos los campos son obligatorios'
      });
    }

    const cleanName = nombre.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = telefono.trim();

    if (!cleanName) {
      return res.status(400).json({
        error: 'Ingresá tu nombre'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        error: 'Ingresá un email válido'
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres'
      });
    }

    // Validate Uruguayan mobile phone format
    if (!/^09\d{7}$/.test(cleanPhone)) {
      return res.status(400).json({
        error: 'El teléfono debe empezar con 09 y tener exactamente 9 números'
      });
    }

    // Validate public registration roles
    const allowedRoles = ['VECINO', 'PERFIL_PUBLICO'];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        error: 'El rol seleccionado no es válido'
      });
    }

    // Validate locality against Prisma enum
    const allowedLocalidades = Object.values(
      Localidad
    );

    if (!allowedLocalidades.includes(localidad as Localidad)) {
      return res.status(400).json({
        error: 'La localidad seleccionada no es válida'
      });
    }

    // Check whether the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        passwordHash,
        nombre: cleanName,
        telefono: cleanPhone,
        localidad: localidad as Localidad,
        role: role as Role
      }
    });

    // Never return passwordHash
    return res.status(201).json({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      telefono: user.telefono,
      localidad: user.localidad,
      role: user.role,
      fotoUrl: user.fotoUrl
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);

    return res.status(500).json({
      error: 'No se pudo registrar el usuario'
    });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                error: 'Email o contraseña incorrectos'
            });
        }

        const passwordValida = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordValida) {
            return res.status(401).json({
                error: 'Email o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1h'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/'
        });

        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                telefono: user.telefono,
                localidad: user.localidad,
                role: user.role,
                fotoUrl: user.fotoUrl
            }
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        return res.status(500).json({
            error: 'No se pudo iniciar sesión'
        });
    }
});

// Obtener información del usuario autenticado
router.get('/me', verificarToken, async (req, res) => {
    const authReq = req as AuthRequest;

    try {
        const user = await prisma.user.findUnique({
            where: { id: authReq.user!.userId },
            select: {
                id: true,
                email: true,
                nombre: true,
                telefono: true,
                localidad: true,
                role: true,
                fotoUrl: true
            }
        });

        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error al consultar la sesión:', error);

        return res.status(500).json({
            error: 'No se pudo consultar la sesión'
        });
    }
});

//cerrar sesion
router.post('/logout', (_req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
            process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
    });

    return res.status(200).json({
        message: 'Sesión cerrada correctamente',
    });
});

//actualizar perfil
router.put('/profile', verificarToken, async (req, res) => {
  const authReq = req as AuthRequest;

  try {
    const userId = authReq.user!.userId;
    const { userData, publicProfile } = req.body;

    if (
      !userData ||
      typeof userData.nombre !== 'string' ||
      typeof userData.email !== 'string' ||
      typeof userData.localidad !== 'string'
    ) {
      return res.status(400).json({
        error: 'Faltan datos obligatorios del perfil'
      });
    }

    const nombre = userData.nombre.trim();
    const email = userData.email.trim().toLowerCase();
    const localidad = userData.localidad;

    if (!nombre || !email) {
      return res.status(400).json({
        error: 'El nombre y el correo son obligatorios'
      });
    }

    if (!Object.values(Localidad).includes(localidad as Localidad)) {
      return res.status(400).json({
        error: 'La localidad seleccionada no es válida'
      });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        nombre,
        email,
        localidad: localidad as Localidad,
        telefono:
          typeof userData.telefono === 'string'
            ? userData.telefono.trim() || null
            : null
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        localidad: true,
        role: true,
        fotoUrl: true
      }
    });

    let profile = null;

    if (user.role === 'PERFIL_PUBLICO') {
      const profileData = {
        descripcion:
          typeof publicProfile?.descripcion === 'string'
            ? publicProfile.descripcion.trim() || null
            : null,
        instagram:
          typeof publicProfile?.instagram === 'string'
            ? publicProfile.instagram.trim() || null
            : null,
        facebook:
          typeof publicProfile?.facebook === 'string'
            ? publicProfile.facebook.trim() || null
            : null,
        googleMaps:
          typeof publicProfile?.googleMaps === 'string'
            ? publicProfile.googleMaps.trim() || null
            : null
      };

      profile = await prisma.profile.upsert({
        where: { userId },
        update: profileData,
        create: {
          userId,
          ...profileData
        }
      });
    }

    return res.status(200).json({ user, profile });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({
        error: 'Ese correo electrónico ya está registrado'
      });
    }

    return res.status(500).json({
      error: 'No se pudo guardar el perfil'
    });
  }
});


export default router;