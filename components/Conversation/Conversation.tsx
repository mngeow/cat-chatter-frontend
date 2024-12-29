"use client";

import React from "react";

import ChatMessageCard from "../ChatMessageCard/ChatMessageCard";
import PromptInputBox from "../PromptInputBox/PromptInputBox";
import { ChatMessage } from "@/types/messages";

export interface ConversationProps {
    chatID: string
    initialPrompt?: string;
}

export default function Conversation(props: ConversationProps) {

    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);

    const [prompt, setPrompt] = React.useState<string>('');

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:9000/api/chat/${props.chatID}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const results = await response.json();

            const formattedMessages: ChatMessage[] = results.conversation_history.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
                isTyping: false
            }));

            setChatMessages(formattedMessages);

            if (formattedMessages.length === 0 && props.initialPrompt) {
                setPrompt(props.initialPrompt);
                const event = new Event('submit') as any;
                await promptHandler(event, props.initialPrompt);
            }
        };

        fetchData().catch(console.error);
    }, [props.chatID, props.initialPrompt]);

    const promptHandler = async (e: React.FormEvent, initialPrompt?: string) => {
        e.preventDefault();

        const messageToSend = initialPrompt || prompt;

        const userMessage: ChatMessage = { role: 'user', content: messageToSend, isTyping: false };

        const aiMessage: ChatMessage = {role: 'assistant', content: '', isTyping: true}

        setChatMessages(prev => [...prev, userMessage, aiMessage]);

        setPrompt('');

        try {
            const response = await fetch(`http://localhost:9000/api/chat/${props.chatID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: messageToSend }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            let accumulatedContent = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                // Decode the stream chunk and append to accumulated content
                const text = new TextDecoder().decode(value);
                accumulatedContent += text;
                
                // Update the AI message with accumulated content
                setChatMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: 'assistant',
                        content: accumulatedContent,
                        isTyping: true
                    };
                    return newMessages;
                });

                // Add a small delay to create a typing effect
                await new Promise(resolve => setTimeout(resolve, 20));
            }

            setChatMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: accumulatedContent,
                    isTyping: true
                };
                return newMessages;
            });
        }

        catch (error) {
            console.error('Error:', error);
            setChatMessages(prev => [
                ...prev.slice(0, -1),
                { role: 'assistant', content: 'Sorry, an error occurred while processing your request.' , isTyping: false}
            ]);
        }

        finally {
            setPrompt('');
        }
    }

  return (
    <div className="flex flex-col gap-4 px-1 w-full">
      {chatMessages.map(({role, content, isTyping}, index) => (
        <ChatMessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={
            role === "assistant"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={content}
          messageClassName={role === "user" ? "bg-content3 text-content3-foreground border border-slate-300  bg-amber-700 text-slate-300" : "bg-slate-600"}
          showFeedback={role === "assistant"}
          className={role === "user" ? "flex-row-reverse" : ""}
          isTyping={isTyping}
        />
      ))}
      <div className="flex flex-row w-full gap-4">
        <div className="w-10"></div>
            <PromptInputBox prompt={prompt} setPrompt={setPrompt} promptSubmitHandler={promptHandler}/> 
        <div className="w-10"></div>
      </div>
    </div>
  );
}
