import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import PromptStarters from "@/components/chat/PromptStarters";

interface Props {
  workspaceId: string;
}

export default function ChatPanel({ workspaceId }: Props) {
  // TODO: wire messages and send action via Convex + API route
  return (
    <div className="flex h-[70vh] flex-col">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Consultant Chat</h2>
      <PromptStarters onSelect={() => {}} />
      <ChatWindow messages={[]} />
      <ChatInput onSend={() => {}} loading={false} />
    </div>
  );
}
