import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { corsMiddleware } from './middleware/cors';
import healthRoutes from './routes/health';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', corsMiddleware);

// Routes
app.route('/api/health', healthRoutes);

// Catch-all for non-API routes
app.all('*', (c) => {
  return c.json({ 
    error: 'Not Found',
    message: 'The requested resource was not found on this server.'
  }, 404);
});

// Error handling
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ 
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.'
  }, 500);
});

export default app;
