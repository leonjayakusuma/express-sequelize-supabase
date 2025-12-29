import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  const error = err instanceof Error ? err : new Error('Unknown error')
  
  // Ensure CORS headers are set even on error responses
  const origin = req.headers.origin;
  if (origin) {
    const isAllowed = 
      origin.includes('localhost') || 
      origin.includes('127.0.0.1') || 
      origin.includes('.vercel.app') || 
      origin.includes('vercel.app');
    
    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
  // Note: When credentials: true, we can't use '*' for origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: error.message || 'Internal server error',
  });
};