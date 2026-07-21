import { useState, forwardRef } from "react";

import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSend, loading }, ref) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
      if (!message.trim() || loading) return;

      onSend(message.trim());
      setMessage("");
    };

    return (
      <div className="border-t border-slate-700 bg-slate-900 p-4">
        <div
          className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-3 cursor-text"
          onClick={() => {
            if (ref && typeof ref !== "function" && ref.current) {
              ref.current.focus();
            }
          }}
        >
          <textarea
            ref={ref}
            rows={1}
            value={message}
            disabled={loading}
            placeholder={loading ? "AI is thinking..." : "Type your message..."}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="
  flex-1
  resize-none
  bg-transparent
  outline-none
  text-sm
  leading-6
  py-2
  placeholder:text-slate-400
  disabled:opacity-60
"
          />

          <button
            onClick={handleSend}
            disabled={loading}
          className="
flex
items-end
gap-3
rounded-2xl
border
border-slate-700
bg-slate-800
px-4
py-3
cursor-text
"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
