import { createChatResponseSchema } from '@/server/dao/chat/schema';
import z from "zod";

export const listChatResponseSchema = z.object({
    chats: z.array(createChatResponseSchema)
})