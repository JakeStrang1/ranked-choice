import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import ormConfig from '../orm/config';

let ormPromise: Promise<MikroORM<PostgreSqlDriver>> | null = null;

export async function getOrm(): Promise<MikroORM<PostgreSqlDriver>> {
  if (!ormPromise) {
    ormPromise = MikroORM.init<PostgreSqlDriver>(ormConfig);
  }
  return ormPromise;
}


