import { NextFunction, Request, Response } from 'express';
import env from '../env';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  const status = 500;

  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: env.DEPLOYMENT_ENV === 'local' ? err.stack : undefined,
  });
};
