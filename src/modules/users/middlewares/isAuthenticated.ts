import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  /**
   * Necessário try/catch neste bloco pq é uma exceção que pode ser lançada pela lib
   */
  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
