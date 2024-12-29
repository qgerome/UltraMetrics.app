import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { type ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { useEffect, useState } from 'react';


export const loadDB = async() => {
  const db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync('um.db');
  await db.execAsync('PRAGMA journal_mode = WAL');
  await db.execAsync('PRAGMA foreign_keys = ON');
  return db;
}

export const useDB = (): {
  db: SQLite.SQLiteDatabase | null;
  orm: ExpoSQLiteDatabase | null;
  loading: boolean;
} & ReturnType<typeof useMigrations> => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  useEffect(() => {
    loadDB().then(setDb);
  }, []);
  const orm = db ? drizzle(db) : null;
  return {
    db,
    orm,
    loading: db === null,
    ...(orm ? useMigrations(orm, migrations) : {
      success: false,
      error: new Error('Database not loaded'),
    }),
  }
}
