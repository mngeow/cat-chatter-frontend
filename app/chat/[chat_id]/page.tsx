"use client";

import { useParams } from 'next/navigation'
import Conversation from '@/components/Conversation/Conversation';
 
export default function Chat() {
    const params = useParams()
    const id = params.chat_id
    
    if (!id || typeof id !== 'string') {
        return <div>Invalid chat ID</div>
    }

    return (
        <Conversation chatID={id}/>
    )
}