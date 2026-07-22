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
<div
  className="
    px-3
    pt-2
    pb-3

    sm:px-5
    sm:pb-5

    lg:px-8
    lg:pb-8
    lg:pt-3

    transition-all
    duration-300
  "
>

      <div
        className="
          mx-auto
          max-w-full
xl:max-w-5xl

          rounded-3xl
lg:rounded-[30px]

          border
          border-(--border-color)

          bg-(--bg-card)

          backdrop-blur-2xl

          shadow-(--shadow-soft)

          transition-all
          duration-300

          focus-within:border-blue-500/40
          focus-within:shadow-(--shadow-glow)
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
          className="
            w-full

            resize-none

            bg-transparent

           px-4
pt-4

sm:px-5
sm:pt-5

lg:px-6

            text-sm
lg:text-[18px]
            text-(--text-primary)

            outline-none

            placeholder:text-(--text-secondary)

            max-h-44

            transition-colors
          "
        />

        <div
          className="
            flex
            items-center
            justify-between

           px-3
pb-3
pt-2

sm:px-4
sm:pb-4
          "
        >

          {/* Left */}

          <div className="flex items-center gap-2
sm:gap-3
lg:gap-4">

            <button
              className="
                rounded-xl

                p-2
sm:p-2.5

                text-(--text-secondary)
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
                className="
                  hidden
                  sm:block
                  text-xs
                  text-(--text-secondary)
                "
              >
                {message.length}/{MAX_CHARACTERS}
              </span>

            )}

            <span
              className="
                hidden
                md:block

                text-xs
                text-(--text-secondary)
              "
            >
              Ctrl + Enter
            </span>

            <Button
              variant="primary"
              onClick={handleSend}
              disabled={loading}
              className="
                rounded-2xl

                px-3
py-3

sm:px-4

                transition-all
                duration-300

                hover:scale-105
              "
            >
              <SendHorizontal size={16}  
              className = "text-black dark:text-white sm:size[18]"/>
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
});

ChatInput.displayName = "ChatInput";

export default ChatInput;