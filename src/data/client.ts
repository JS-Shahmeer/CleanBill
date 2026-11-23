import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';

import migrations from './migrations/migrations';
import * as schema from './schema';
import { seedIfEmpty } from './seed';

const DB_NAME = 'cleanbill.db';

// Single shared connection. expo-sqlite serializes writes internally, and
// every multi-row write in this app goes through db.transaction(...) so a
// failure never leaves a half-saved record (brief section 04.1).
export const sqlite = SQLite.openDatabaseSync(DB_NAME, { enableChangeListener: true });
export const db = drizzle(sqlite, { schema });

let migrated = false;

/** Called once from the root layout before any screen renders. */
export async function runMigrations() {
  if (migrated) return;
  await sqlite.execAsync('PRAGMA foreign_keys = ON;');
  await migrate(db, migrations);
  await seedIfEmpty(db);
  migrated = true;
}
