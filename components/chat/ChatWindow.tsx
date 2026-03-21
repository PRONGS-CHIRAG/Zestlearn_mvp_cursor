import type { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import EmptyState from "@/components/shared/EmptyState";
import { useEffect, useRef } from "react";

interface Props {
  messages: ChatMessageType[];
}

export default function ChatWindow({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto rounded-xl bg-white border border-slate-100 p-4 space-y-3">
      {messages.length === 0 ? (
        <EmptyState
          title="Start the conversation"
          description="Ask a consulting question or use a prompt starter below."
        />
      ) : (
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
      )}
      <div ref={bottomRef} />
    </div>
  );
}
