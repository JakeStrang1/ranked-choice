import { Migration } from '@mikro-orm/migrations';

export class Migration20250809131532 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" uuid not null, "email" text not null, "verified_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "auth_challenges" ("id" uuid not null, "user_id" uuid not null, "code_hash" text not null, "expires_at" timestamptz not null, "created_at" timestamptz not null default now(), constraint "auth_challenges_pkey" primary key ("id"));`);

    this.addSql(`alter table "auth_challenges" add constraint "auth_challenges_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "auth_challenges" drop constraint "auth_challenges_user_id_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "auth_challenges" cascade;`);
  }

}
