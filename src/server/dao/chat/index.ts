import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { createChatSchemaT, createChatResponseSchemaT } from './types';
import { chatsTable } from '@/db/schema';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';

export class ChatDAO{
    private tx: PostgresJsTransaction<any,any>

    constructor(tx: PostgresJsTransaction<any,any>) {
        this.tx = tx;
    };

    async createChat(createChatObj: createChatSchemaT): Promise<createChatResponseSchemaT> {
        try {
            const parsedData = createChatSchema.parse(createChatObj);
            const insertedChat = await this.tx.insert(chatsTable)
                .values({
                    ...parsedData,
                    created_at: new Date(parsedData.created_at)
                })
                .returning();
            
            const res = insertedChat[0];
            return createChatResponseSchema.parse(res)
        } catch (error) {
            console.error('Error in createChat:', error);
            throw new Error('Failed to create chat: ' + (error as Error).message);
        }
    }
}