import { ConflitError } from '$/domain/errors/conflit';
import { ForbiddenError } from '$/domain/errors/forbidden';
import { NotFoundError } from '$/domain/errors/not-found';
import { UnauthorizedError } from '$/domain/errors/unauthorized';
import logger from '$/logger';
import { ErrorRequestHandler } from 'express';

const errors: Record<string, number> = {
  ValidationError: 400, // returned by joi
  [UnauthorizedError.name]: 401,
  [ForbiddenError.name]: 403,
  [NotFoundError.name]: 404,
  [ConflitError.name]: 409,
};

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message, stack: _, ...rest } = err;
  const status = errors[name];
  logger.error(err);
  if (status) return res.status(status).json({ name, message, ...rest });
  res.sendStatus(500);
};
