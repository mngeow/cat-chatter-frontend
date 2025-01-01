import { Hono, Context } from 'hono';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { describeRoute } from "hono-openapi";
import { resolver, validator as vValidator } from 'hono-openapi/valibot';
import { parse } from 'valibot'; 
import { ChatService } from "@/server/services/chat";
import { db } from '@/server/deps';


export const app = new Hono();

app
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
        vValidator("json",createChatSchema),
        async (c: Context) => {
            try {
                const responseContext = await db.transaction(async (tx) => {
                    const body = await c.req.json();
                    const parsedBody = parse(createChatSchema, body);
                    const chatService = new ChatService(tx)
                    const createChatResponse = await chatService.createChat(parsedBody);
                    
                    return createChatResponse;
                });

                return c.json(responseContext, 201);
            } catch (error) {
                console.error('Error in chat creation:', error);
                return c.json({ error: 'Failed to create chat' }, 500);
            }
        }
);