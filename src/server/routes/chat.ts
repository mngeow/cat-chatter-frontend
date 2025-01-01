import { Hono, Context } from 'hono';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { ChatService } from "@/server/services/chat";
import { dbConn } from '@/server/deps';


export const app = new Hono();

app
.use(dbConn.middleware("dbConn"))
.post(
    '/',
    describeRoute(
        {
            description: 'Create a new chat',
            responses: {
                201: {
                    description: 'Chat successfully created',
                    content: {
                        'application/json': { schema: resolver(createChatResponseSchema) },
                    },
                },
            },
            validateResponse: false,
        }),
        async (c: Context) => {
            const { dbConn } = c.var;
            try {
                const responseContext = await dbConn.transaction(async (tx:any) => {
                    const chatService = new ChatService(tx)
                    const createChatResponse = await chatService.createChat();
                    
                    return createChatResponse;
                });

                return c.json(responseContext, 201);
            } catch (error) {
                console.error('Error in chat creation:', error);
                return c.json({ error: 'Failed to create chat' }, 500);
            }
        }
);