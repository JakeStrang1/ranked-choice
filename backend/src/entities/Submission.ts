import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { uuidv7 } from 'uuidv7';
import { Poll } from './Poll';

@Entity({ tableName: 'submissions' })
@Unique({ properties: ['poll', 'userName'] })
export class Submission {
  @PrimaryKey()
  id: string = uuidv7();

  @Property({ type: 'varchar', length: 100 })
  userName!: string;

  @ManyToOne(() => Poll)
  poll!: Poll;

  @Property({ type: 'array' })
  rankings: string[] = [];

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
