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
    created_at: z.preprocess(
        (val) => (val instanceof Date ? val.toISOString() : val),
        z.string().datetime()
    )
})