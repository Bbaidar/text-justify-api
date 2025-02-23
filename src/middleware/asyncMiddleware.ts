import { Request, Response, NextFunction } from 'express';

// Middleware pour gérer les erreurs asynchrones
export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

