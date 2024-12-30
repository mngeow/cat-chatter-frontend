import ChatHistorySidebar from "@/components/ChatHistorySidebar/ChatHistorySidebar"

export default function ChatLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
    <div className='flex flex-row'>
        <div>
            <ChatHistorySidebar/>
        </div>
        <div className='w-full gap-4 px-4'>
            {children}
        </div>
    </div>
    );
}