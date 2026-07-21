import type { Message } from "../../types/chat";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { useAutoScroll } from "../../hooks/useAutoScroll";

interface Props {
  messages: Message[];
  loading: boolean;
}

const ChatWindow = ({ messages, loading }: Props) => {
  const bottomRef = useAutoScroll([messages, loading]);

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900">
      {messages.length === 0 && !loading ? (
        <div className="flex h-full items-center justify-center text-slate-500">
          Start a new conversation
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef} />
        </>
      )}
    </main>
  );
};

export default ChatWindow;