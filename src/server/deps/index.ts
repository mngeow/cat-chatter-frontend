import { Dependency } from "hono-simple-di";
import { ChatService } from "@/server/services/chat";
import { drizzle } from 'drizzle-orm/node-postgres';
import { serverEnvs } from "@/env/server";
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: serverEnvs.DATABASE_URL
})

const db = drizzle(pool);

export const chatServiceDep = new Dependency(()=>new ChatService(db));