import { Hono, Context } from 'hono';
import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { ChatService } from "@/server/services/chat";
import { dbConn } from '@/server/deps';
import z from "zod";


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

app
.use(dbConn.middleware("dbConn"))
.get(
    '/:id',
    describeRoute({
        description: 'Fetch a chat by ID',
        responses: {
            200: {
                description: 'Returns chat by ID',
                content: {
                    'application/json': { schema: resolver(createChatResponseSchema) },
                },
            },
        },
        validateResponse: false,
    }),
    validator("param", z.object({id: z.string()})),
    async (c: Context) => {
        const { dbConn } = c.var;
        const id = c.req.param('id')
        try {
            const responseContext = await dbConn.transaction(async (tx: any) => {
                const chatService = new ChatService(tx)
                const chatResponse = await chatService.getChatByID(id)
                return chatResponse;
            });
            return c.json(responseContext,200);
        } catch (error) {
            console.error('Error in fetching chat:', error);
            return c.json({ error: 'Failed to fetch chat' }, 500);
        }
    }
);