"use client";

import PromptInputBox from "@/components/PromptInputBox/PromptInputBox";
import React from "react";
import { useRouter } from 'next/navigation'


export default function ChatMain() {
    const [prompt, setPrompt] = React.useState<string>('');

    const router = useRouter()

    const promptHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/chat',{
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
        <div className="flex flex-col h-screen justify-center items-center">
            <PromptInputBox prompt={prompt} setPrompt={setPrompt} promptSubmitHandler={promptHandler}/>
        </div>
    )
}