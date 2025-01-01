import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ChatDAO } from '@/server/dao/chat';
import { createChatResponseSchemaT } from '@/server/dao/chat/types';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';
import { HTTPException } from 'hono/http-exception'
import { listChatResponseSchemaT } from '@/server/services/chat/types';
import { listChatResponseSchema } from '@/server/services/chat/schema';

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
        const chat = await this.chatDao.getChatByID(id) ;

        if (chat == null) {

            const message = `Chat with id ${id} not found`

            throw new HTTPException(
                404, {message: message, cause: 'ChatNotFound'}
            )
        }

        return chat;
    }

    async listChats(): Promise<listChatResponseSchemaT> {
        const chats = await this.chatDao.listChats();

        return listChatResponseSchema.parse({chats: chats})

    }
}