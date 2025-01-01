import { Hono, Context } from 'hono';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { describeRoute } from "hono-openapi";
import { resolver, validator as vValidator } from 'hono-openapi/valibot';
import { parse } from 'valibot'; 
import { chatServiceDep } from '@/server/deps';


export const app = new Hono();

app
.use(chatServiceDep.middleware("chatService"))
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
                const body = await c.req.json();
                const { chatService } = c.var;
                const parsedBody = parse(createChatSchema, body);
                const createChatResponse = await chatService.createChat(parsedBody);
                
                return c.json(createChatResponse, 201);
            } catch (error) {
                console.error('Error in chat creation:', error);
                return c.json({ error: 'Failed to create chat' }, 500);
            }
        }
);