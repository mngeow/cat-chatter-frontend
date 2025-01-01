import z from "zod";

enum ChatMessageRole {
    User = 'user',
    Assistant = 'assistant'
}

export const chatMessage = z.object({
    content: z.string(),
    role: z.nativeEnum(ChatMessageRole),
    created_at: z.string().datetime().default(() => new Date().toISOString())
})

export const createChatSchema = z.object({
    conversation_history: z.array(chatMessage),
    description: z.string(),
    created_at: z.string().datetime().default(() => new Date().toISOString())
})

export const createChatResponseSchema = createChatSchema.extend({
    id: z.string(),
    created_at: z.union([z.date(), z.string().datetime()])
        .default(() => new Date().toISOString())
        .transform(date => typeof date === 'string' ? date : date.toISOString())
})