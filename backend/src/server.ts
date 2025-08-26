import { serve } from '@hono/node-server';
import app from './index';
import { getEnv } from './utils/envVars';

const env = getEnv(); // Ensures required env variables are present

const port = parseInt(env.PORT ?? '');

console.log(`📊 Ranked Choice API server starting at ${env.API_DOMAIN}:${port}`);

serve({
  fetch: app.fetch,
  port
});
