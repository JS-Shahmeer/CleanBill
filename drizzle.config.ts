import type { Config } from 'drizzle-kit';

/**
 * Run `npm run db:generate` after changing src/data/schema.ts.
 * It writes a new versioned SQL migration into src/data/migrations/ and
 * regenerates migrations.js, which the app bundles and runs on launch
 * (see src/data/client.ts). Never edit a migration that already shipped —
 * add a new one instead, so devices that already applied it aren't affected.
 */
export default {
  schema: './src/data/schema.ts',
  out: './src/data/migrations',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
