import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { createChatSchemaInput, createChatResponseSchemaOutput } from './types';
import { chatsTable } from '@/db/schema';
import { parse } from 'valibot';

export class ChatDAO{
    private db: NodePgDatabase & {
        $client: Pool;
    };

    constructor(db: NodePgDatabase & {$client: Pool}) {
        this.db = db;
    };

    async createChat(createChatObj: createChatSchemaInput): Promise<createChatResponseSchemaOutput> {
        try {
            const parsedData = parse(createChatSchema, createChatObj);
            const insertedChat = await this.db.insert(chatsTable)
                .values({
                    ...parsedData,
                    created_at: new Date(parsedData.created_at)
                })
                .returning();
            
            const res = insertedChat[0];
            return parse(createChatResponseSchema,res)
        } catch (error) {
            console.error('Error in createChat:', error);
            throw new Error('Failed to create chat: ' + (error as Error).message);
        }
    }
}