import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

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

export default router;