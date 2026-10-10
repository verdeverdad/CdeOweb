
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error: 'No estás autenticada'
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    req.user = payload;
    next();
  } catch {
    return res.status(401).json({
      error: 'Token inválido o vencido'
    });
  }
};
