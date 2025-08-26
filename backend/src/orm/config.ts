import { defineConfig } from '@mikro-orm/postgresql';
import { getEnv } from '../utils/envVars';
import { Poll } from '../entities/Poll';
import { Submission } from '../entities/Submission';

const env = getEnv();

const ormConfig = defineConfig({
  clientUrl: env.DATABASE_URL,
  entities: [Poll, Submission],
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


