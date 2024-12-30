import { ChatMessage } from "./messages";

export interface Chat {
    chat_id: string;
    conversation_history: ChatMessage[];
    description?: string;
}