import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ChatDAO } from '@/server/dao/chat';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';

export class ChatService {
    private chatDao: ChatDAO;

    constructor(db: NodePgDatabase & {$client: Pool}) {
        this.chatDao = new ChatDAO(db);
    }

    async createChat(createChatPayload: typeof createChatSchema): Promise<void> {
        await this.chatDao.createChat(createChatPayload)
    }
}