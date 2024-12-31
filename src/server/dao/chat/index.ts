import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { chatsTable } from '@/db/schema';
import { parse } from 'valibot';

export class ChatDAO{
    private db: NodePgDatabase & {
        $client: Pool;
    };

    constructor(db: NodePgDatabase & {$client: Pool}) {
        this.db = db;
    };

    async createChat(createChatObj: typeof createChatSchema): Promise<void> {
        try {
            const parsedData = parse(createChatSchema, createChatObj);
            await this.db.insert(chatsTable).values({
                ...parsedData,
                created_at: new Date(parsedData.created_at)
            });
            return;
        } catch (error) {
            console.error('Error in createChat:', error);
            throw new Error('Failed to create chat: ' + (error as Error).message);
        }
    }
}