import { cors } from 'hono/cors';
import { getEnv } from '../utils/envVars';

// Get CORS origins from environment variable or use defaults
const env = getEnv();
const corsOrigins = env.CORS_ORIGINS
  ? env.CORS_ORIGINS.split(',')
  : [
      'http://localhost:3000',
      'http://localhost:5173'
    ];

export const corsMiddleware = cors({
  origin: corsOrigins,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
