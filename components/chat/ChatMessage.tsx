import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
