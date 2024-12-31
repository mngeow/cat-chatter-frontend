import * as v from "valibot";

enum ChatMessageRole {
    User = 'user',
    Assistant = 'assistant'
}

export const chatMessage = v.object({
    content: v.string(),
    role: v.enum(ChatMessageRole),
    created_at: v.fallback(v.string(), () => new Date().toISOString())
})

export const createChatSchema = v.object({
    conversation_history: v.array(chatMessage),
    description: v.string(),
    created_at: v.fallback(v.string(), () => new Date().toISOString())
})

export const createChatResponseSchema = v.object({
    ...createChatSchema.entries,
    id: v.string()
})