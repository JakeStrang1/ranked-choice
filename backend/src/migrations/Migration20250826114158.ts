import { Migration } from '@mikro-orm/migrations';

export class Migration20250826114158 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "polls" ("id" varchar(255) not null, "slug" varchar(100) not null, "name" varchar(100) not null, "choices" text[] not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "expires_at" timestamptz not null, constraint "polls_pkey" primary key ("id"));`);
    this.addSql(`alter table "polls" add constraint "polls_slug_unique" unique ("slug");`);

    this.addSql(`create table "submissions" ("id" varchar(255) not null, "user_name" varchar(100) not null, "poll_id" varchar(255) not null, "rankings" text[] not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "submissions_pkey" primary key ("id"));`);
    this.addSql(`alter table "submissions" add constraint "submissions_poll_id_user_name_unique" unique ("poll_id", "user_name");`);

    this.addSql(`alter table "submissions" add constraint "submissions_poll_id_foreign" foreign key ("poll_id") references "polls" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "submissions" drop constraint "submissions_poll_id_foreign";`);

    this.addSql(`drop table if exists "polls" cascade;`);

    this.addSql(`drop table if exists "submissions" cascade;`);
  }

}
