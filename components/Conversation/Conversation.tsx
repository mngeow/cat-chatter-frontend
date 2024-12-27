import React from "react";

import ChatMessageCard from "../ChatMessageCard/ChatMessageCard";
import PromptInputBox from "../PromptInputBox/PromptInputBox";

export default function Conversation() {
    const assistantMessages = [
      "Certainly! Here's a summary of five creative ways to use your kids' art:\n\n1. **Create Art Books:** Turn scanned artwork into custom photo books.\n\n2. **Set Up a Gallery Wall:** Use a dedicated wall with interchangeable frames for displaying art.\n\n3. **Make Functional Items:** Print designs on items like pillows, bags, or mugs.\n\n4. **Implement an Art Rotation System:** Regularly change the displayed art, archiving the older pieces.\n\n5. **Use as Gift Wrap:** Repurpose art as unique wrapping paper for presents.",
      "Of course! Here are five more creative suggestions for what to do with your children's art:\n\n1. **Create a Digital Archive:** Scan or take photos of the artwork and save it in a digital cloud storage service for easy access and space-saving.\n\n2. **Custom Calendar:** Design a custom calendar with each month showcasing a different piece of your child's art.\n\n3. **Storybook Creation:** Compile the artwork into a storybook, possibly with a narrative created by your child, to make a personalized book.\n\n4. **Puzzle Making:** Convert their artwork into a jigsaw puzzle for a fun and unique pastime activity.\n\n5. **Home Decor Items:** Use the artwork to create home decor items like coasters, magnets, or lampshades to decorate your house."
    ];
      
    const userMessages = [
    "What are 5 creative things I could do with my kids' art? I don't want to throw them away, but it's also so much clutter.",
    "I didn't like the suggestions. Can you give me some more?",
    ];
      


  const messages = [
    {
      role: "user",
      message: userMessages[0],
    },
    {
      role: "assistant",
      message: assistantMessages[0],
    },
    {
      role: "user",
      message: userMessages[1],
    },
    {
      role: "assistant",
      message: assistantMessages[1],
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-1">
      {messages.map(({role, message}, index) => (
        <ChatMessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={
            role === "assistant"
              ? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
              : "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
          }
          currentAttempt={index === 1 ? 2 : 1}
          message={message}
          messageClassName={role === "user" ? "bg-content3 text-content3-foreground bg-yellow-600 text-sky-50" : "bg-yellow-600"}
          showFeedback={role === "assistant"}
          className={role === "user" ? "flex-row-reverse" : ""}
        />
      ))}
      <div className="flex flex-row w-full gap-4">
        <div className="w-10"></div>
            <PromptInputBox /> 
        <div className="w-10"></div>
      </div>
    </div>
  );
}
