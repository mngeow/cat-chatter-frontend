import { createChatSchema, createChatResponseSchema } from '@/server/dao/chat/schema';
import * as v from 'valibot';

export type createChatResponseSchemaOutput = v.InferOutput<typeof createChatResponseSchema>
export type createChatSchemaInput = v.InferInput<typeof createChatSchema>
export type createChatSchemaOutput = v.InferOutput<typeof createChatSchema>