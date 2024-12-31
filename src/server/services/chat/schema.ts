import { createInsertSchema } from 'drizzle-valibot';
import { chatsTable } from '@/db/schema';

export const chatsInsertSchema = createInsertSchema(chatsTable);
export type ChatsInsertSchema = typeof chatsInsertSchema;