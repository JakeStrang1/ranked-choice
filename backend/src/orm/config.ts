import { defineConfig } from '@mikro-orm/postgresql';
import { getEnv } from '../utils/envVars';

const env = getEnv();

const ormConfig = defineConfig({
  clientUrl: env.DATABASE_URL,
  entities: [],
  discovery: { warnWhenNoEntities: false },
  migrations: {
    tableName: 'migrations',
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    transactional: true,
    emit: 'ts',
  },
  driverOptions: {
    connection: {
      poolSize: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
    },
  },
});

export default ormConfig;


