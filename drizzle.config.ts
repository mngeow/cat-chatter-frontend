import { defineConfig } from 'drizzle-kit';
import { serverEnvs } from '@/env/server';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: serverEnvs.DATABASE_URL,
  },
});
