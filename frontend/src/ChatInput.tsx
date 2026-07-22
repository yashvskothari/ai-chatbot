import {
  useState,
  useEffect,
  forwardRef,
} from "react";

import {
  SendHorizontal,
  Paperclip,
} from "lucide-react";

import { Button } from "../ui";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

const MAX_CHARACTERS = 4000;

const ChatInput = forwardRef<
  HTMLTextAreaElement,
  ChatInputProps
>(({ onSend, loading }, ref) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (
      ref &&
      typeof ref !== "function" &&
      ref.current
    ) {
      ref.current.style.height = "0px";

      ref.current.style.height =
        Math.min(ref.current.scrollHeight, 180) + "px";
    }
  }, [message, ref]);

  const handleSend = () => {
    if (!message.trim() || loading) return;

    onSend(message.trim());

    setMessage("");
  };

  return (
    <div className="px-8 pb-8 pt-3">

      <div
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
        className="
          mx-auto
          max-w-5xl

          rounded-[30px]

          border

          backdrop-blur-2xl

          shadow-var(--shadow-soft)

          transition-all
          duration-300

          focus-within:border-blue-500/40
          focus-within:shadow-var(--shadow-glow)
        "
      >

        <textarea
          ref={ref}
          rows={1}
          disabled={loading}
          value={message}
          placeholder={
            loading
              ? "Flux AI is thinking..."
              : "Message Flux AI..."
          }
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              e.ctrlKey
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{ color: "var(--text-primary)" }}
          className="
            w-full

            resize-none

            bg-transparent

            px-6
            pt-5

            text-[15px]

            outline-none

            placeholder:text-var(--text-secondary)

            max-h-44

            transition-colors
          "
        />

        <div
          className="
            flex
            items-center
            justify-between

            px-4
            pb-4
            pt-2
          "
        >

          {/* Left */}

          <div className="flex items-center gap-3">

            <button
              style={{ color: "var(--text-secondary)" }}
              className="
                rounded-xl

                p-2

                transition-all
                duration-300

                hover:bg-blue-500/10
                hover:text-blue-500
              "
            >
              <Paperclip size={18} />
            </button>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            {message.length > 0 && (

              <span
                style={{ color: "var(--text-secondary)" }}
                className="text-xs"
              >
                {message.length}/{MAX_CHARACTERS}
              </span>

            )}

            <span
              style={{ color: "var(--text-secondary)" }}
              className="text-xs"
            >
              Ctrl + Enter
            </span>

            <Button
              variant="primary"
              onClick={handleSend}
              disabled={loading}
              className="
                rounded-2xl

                px-4
                py-3

                transition-all
                duration-300

                hover:scale-105
              "
            >
              <SendHorizontal size={18} />
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
});

ChatInput.displayName = "ChatInput";

export default ChatInput;
