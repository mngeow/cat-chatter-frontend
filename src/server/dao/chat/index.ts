import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { createChatSchemaT, createChatResponseSchemaT } from './types';
import { chatsTable } from '@/db/schema';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';
import { eq }  from 'drizzle-orm';

export class ChatDAO{
    private tx: PostgresJsTransaction<any,any>

    constructor(tx: PostgresJsTransaction<any,any>) {
        this.tx = tx;
    };

    async createChat(): Promise<createChatResponseSchemaT> {
        try {
            const insertedChat = await this.tx.insert(chatsTable)
                .values({
                    conversation_history: [],
                    created_at: new Date(),
                    description: 'placeholder',
                })
                .returning();
            
            const res = insertedChat[0];
            return createChatResponseSchema.parse(res)
        } catch (error) {
            console.error('Error in createChat:', error);
            throw new Error('Failed to create chat: ' + (error as Error).message);
        }
    }

    async getChatByID(id: string): Promise<createChatResponseSchemaT | null> {
        const res = await this.tx.select().from(chatsTable).where(eq(chatsTable.id,id));
        return res[0] ? createChatResponseSchema.parse(res[0]) : null;
    }
}