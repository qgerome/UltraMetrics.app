import { uuid } from 'drizzle-orm/pg-core';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const locationsTable = sqliteTable('locations_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  latitude: real().notNull(),
  longitude: real().notNull(),
});

export const sensorsTable = sqliteTable('sensors_table', {
  id: uuid().primaryKey(),
  name: text().notNull(),
});
