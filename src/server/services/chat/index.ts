import { ChatDAO } from '@/server/dao/chat';
import { chatMessage } from '@/server/dao/chat/schema';
import { createChatResponseSchemaT } from '@/server/dao/chat/types';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';
import { HTTPException } from 'hono/http-exception'
import { listChatResponseSchemaT, askQuestionRequestSchemaT } from '@/server/services/chat/types';
import { listChatResponseSchema, askQuestionRequestSchema } from '@/server/services/chat/schema';
import { stream } from "hono/streaming";
import { Context } from 'hono';
import { AzureOpenAI } from 'openai';
import { serverEnvs } from '@/env/server';

export class ChatService {
    private chatDao: ChatDAO;
    private llmClient: AzureOpenAI;

    constructor(tx: PostgresJsTransaction<any,any>) {
        this.chatDao = new ChatDAO(tx);
        this.llmClient = new AzureOpenAI({
            apiKey: serverEnvs.AZURE_OPENAI_API_KEY,
            apiVersion: serverEnvs.AZURE_OPENAI_API_VERSION,
            endpoint: serverEnvs.AZURE_OPENAI_ENDPOINT,
            deployment: serverEnvs.AZURE_DEPLOYMENT_NAME
        })
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

    async askQuestion(c: Context, id: string, payload: askQuestionRequestSchemaT): Promise<Response> {

        const existingChat = await this.getChatByID(id);

        existingChat.description = payload.content;

        const userMessage = chatMessage.parse({
            content: payload.content,
            role: 'user'
        })

        existingChat.conversation_history.push(userMessage);

        const llmMessages = existingChat.conversation_history.map((item) => {
            return {
                role: item.role,
                content: item.content
            }
        })

        const events = await this.llmClient.chat.completions.create({
            messages: llmMessages,
            model: "",
            max_tokens: 128,
            stream: true,
          });
        
        let fullResponse = "";

        return stream(c, async (stream) => {
            for await (const event of events) {
              const content = event.choices[0]?.delta?.content || "";
              if (content) {
                fullResponse += content;
                await stream.write(content);
              }
            }
        
            const aiMessage = chatMessage.parse({
                content: fullResponse,
                role: 'assistant'
            })

            existingChat.conversation_history.push(aiMessage);

            await this.chatDao.updateChatByID(existingChat);
        })
    }

}