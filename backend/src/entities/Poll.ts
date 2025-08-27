import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { uuidv7 } from 'uuidv7';

@Entity({ tableName: 'polls' })
export class Poll {
  @PrimaryKey()
  id: string = uuidv7();

  @Property({ type: 'varchar', length: 100 })
  @Unique()
  slug!: string;

  @Property({ type: 'varchar', length: 100 })
  name!: string;

  @Property({ type: 'array' })
  choices: string[] = [];

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: 'timestamptz' })
  expiresAt!: Date;
}
