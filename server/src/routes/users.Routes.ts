import { Router } from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '../db.js';

const router = Router();

// Registrar usuario
router.post('/register', async (req, res) => {

    const { email, password, nombre, telefono, localidad } = req.body;

    try {

        // Verificar si el email ya está registrado
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'El email ya está registrado'
            });
        }

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                nombre,
                telefono,
                localidad
            }
        });

        // No devolver passwordHash
        //const { passwordHash: _, ...userWithoutPassword } = user;

        //res.status(201).json(userWithoutPassword);
        res.status(201).json({
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

        res.status(400).json({
            error: 'No se pudo registrar el usuario'
        });
    }
});

export default router;