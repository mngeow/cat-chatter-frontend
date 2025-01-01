import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ChatDAO } from '@/server/dao/chat';
import { createChatSchemaInput, createChatResponseSchemaOutput } from '@/server/dao/chat/types';

export class ChatService {
    private chatDao: ChatDAO;

    constructor(db: NodePgDatabase & {$client: Pool}) {
        this.chatDao = new ChatDAO(db);
    }

    async createChat(createChatPayload: createChatSchemaInput): Promise<createChatResponseSchemaOutput> {
        const res = await this.chatDao.createChat(createChatPayload)
        return res
    }
}