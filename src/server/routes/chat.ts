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
                    description: 'Chat successfuly created',
                    content: {
                        'application/json': { schema: resolver(createChatResponseSchema) },
                    },
                },
            },
            validateResponse: false,
        }),
        vValidator("json",createChatSchema),
        async (c: Context) => {
            const body = await c.req.json();
            const { chatService } = c.var;
            const parsedBody = parse(createChatSchema, body);
            await chatService.createChat(parsedBody);
            c.status(201);
            return c.json({
                id: "123",
                ...parsedBody
            });
        }
);