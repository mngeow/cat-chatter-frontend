import { Dependency } from "hono-simple-di";
import { ChatService } from "@/server/services/chat";
import { drizzle } from 'drizzle-orm/node-postgres';
import { serverEnvs } from "@/env/server";
import { Pool } from 'pg';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

const pool = new Pool({
    connectionString: serverEnvs.DATABASE_URL
})

export const db = drizzle(pool);

export const dbConn = new Dependency<NodePgDatabase<Record<string, never>> & {
    $client: Pool;
}>(()=> db);