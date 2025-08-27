import { Hono } from 'hono';
import { HealthResponse } from '../types';
import { getOrm } from '../services/database';

const health = new Hono();

health.get('/', async (c) => {
  const response: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ranked-choice-api',
    message: 'Success'
  };

  try {
    const orm = await getOrm();
    const rows: any[] = await orm.em.getConnection().execute('SELECT NOW()');
    response.databaseStatus = Array.isArray(rows) && rows.length > 0 ? 'connected' : 'failed';
  } catch (e) {
    console.error(e);
    response.databaseStatus = 'failed';
  }

  return c.json(response);
});

export default health;
