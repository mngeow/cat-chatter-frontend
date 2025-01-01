import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ChatDAO } from '@/server/dao/chat';
import { createChatSchemaT, createChatResponseSchemaT } from '@/server/dao/chat/types';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';

export class ChatService {
    private chatDao: ChatDAO;

    constructor(tx: PostgresJsTransaction<any,any>) {
        this.chatDao = new ChatDAO(tx);
    }

    async createChat(): Promise<createChatResponseSchemaT> {
        const res = await this.chatDao.createChat()
        return res
    }

    async getChatByID(id: string): Promise<createChatResponseSchemaT> {
        return await this.chatDao.getChatByID(id) ;
    }

}