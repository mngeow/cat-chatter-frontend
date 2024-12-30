"use client";

import { useParams, useSearchParams } from 'next/navigation'
import Conversation from '@/components/Conversation/Conversation';
 
export default function Chat() {
    const params = useParams()
    const searchParams = useSearchParams()

    const initialPrompt = searchParams.get('prompt') ?? undefined;

    const id = params.chat_id
    
    if (!id || typeof id !== 'string') {
        return <div>Invalid chat ID</div>
    }

    return (
        <Conversation chatID={id} initialPrompt={initialPrompt}/>
    )
}