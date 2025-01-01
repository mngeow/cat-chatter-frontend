import { listChatResponseSchema } from "@/server/services/chat/schema";
import z from "zod";

export type listChatResponseSchemaT = z.infer<typeof listChatResponseSchema>;