import { pgTable, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const chatsTable = pgTable("chats", {
    id: varchar("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    description: varchar(),
    conversation_history: jsonb(),
    created_at: timestamp().defaultNow()
});