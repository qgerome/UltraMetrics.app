import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { type ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';


export const db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync('um.db');

export const orm = drizzle(db);

export const useDB = (): {
  db: SQLite.SQLiteDatabase;
  orm: ExpoSQLiteDatabase;
} & ReturnType<typeof useMigrations> => {
  return {
    db,
    orm,
    ...useMigrations(orm, migrations)
  }
}