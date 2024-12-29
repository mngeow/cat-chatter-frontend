"use client";

import PromptInputBox from "@/components/PromptInputBox/PromptInputBox";
import React from "react";
import { useRouter } from 'next/navigation'


export default function ChatMain() {
    const [prompt, setPrompt] = React.useState<string>('');

    const router = useRouter()

    const promptHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:9000/api/chat',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const results = await response.json();

        const chat_id = results.id;

        router.push(`/chat/${chat_id}?prompt=${encodeURIComponent(prompt)}`);
    }

    return (
        <PromptInputBox prompt={prompt} setPrompt={setPrompt} promptSubmitHandler={promptHandler}/>
    )
}