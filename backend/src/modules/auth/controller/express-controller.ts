import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any;  // 'user' es agregado dinámicamente por Passport
}