import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ChatDAO } from '@/server/dao/chat';
import { createChatSchemaInput, createChatResponseSchemaOutput } from '@/server/dao/chat/types';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';

export class ChatService {
    private chatDao: ChatDAO;

    constructor(tx: PostgresJsTransaction<any,any>) {
        this.chatDao = new ChatDAO(tx);
    }

    async createChat(createChatPayload: createChatSchemaInput): Promise<createChatResponseSchemaOutput> {
        const res = await this.chatDao.createChat(createChatPayload)

        if (res.description == 'error'){
            throw Error('Simulated error!')
        }
        return res
    }
}