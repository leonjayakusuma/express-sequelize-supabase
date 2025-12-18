import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes/routes'
import { protectedRouter } from './routes/protectedroutes'
import { errorHandler } from './middlewares/errorHandler'
import config from './config/config'

const app = express()
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// API key auth middleware (to be used only on protected route groups, e.g. `/api`)
const apiAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!config.apiKey) {
    return res.status(500).json({
      success: false,
      error: 'API key not configured on server',
    });
  }

  const rawHeader = req.headers['x-api-key'];
  let headerKey: string | undefined;

  if (Array.isArray(rawHeader)) {
    headerKey = rawHeader[0];
  } else {
    headerKey = rawHeader as string | undefined;
  }

  const queryKey =
    typeof req.query.apiKey === 'string' ? req.query.apiKey : undefined;

  const apiKey = headerKey || queryKey;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Missing API key',
    });
  }

  if (apiKey !== config.apiKey) {
    return res.status(403).json({
      success: false,
      error: 'Invalid API key',
    });
  }

  return next();
};

// Public Routes (no API key required)
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    message: 'Server is running and healthy' 
  })
})

// Protected Routes (API key required)
app.use('/api', apiAuthMiddleware, router)
app.use('/api/protected', apiAuthMiddleware, protectedRouter)

// 404 handler (must be after all routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})

app.use(errorHandler);

export default app;