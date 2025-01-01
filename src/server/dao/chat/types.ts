import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import z from 'zod';

export type createChatSchemaT = z.infer<typeof createChatSchema>
export type createChatResponseSchemaT = z.infer<typeof createChatResponseSchema>