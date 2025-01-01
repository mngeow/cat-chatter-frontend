import { listChatResponseSchema, askQuestionRequestSchema } from "@/server/services/chat/schema";
import z from "zod";

export type listChatResponseSchemaT = z.infer<typeof listChatResponseSchema>;

export type askQuestionRequestSchemaT = z.infer<typeof askQuestionRequestSchema>;