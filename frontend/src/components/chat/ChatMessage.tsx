import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-2xl rounded-2xl px-5 py-3 whitespace-pre-wrap shadow-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-gray-100"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;