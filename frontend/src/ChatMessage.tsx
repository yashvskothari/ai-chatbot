import { Bot, User } from "lucide-react";
import { Card } from "../ui";
import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          flex
          max-w-[78%]
          gap-3
          ${isUser ? "flex-row-reverse" : ""}
        `}
      >
        {/* Avatar */}

        <div
          className={`
            mt-1

            flex
            h-10
            w-10

            shrink-0

            items-center
            justify-center

            rounded-full

            ${
              isUser
                ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                : "bg-gradient-to-br from-emerald-500 to-cyan-500"
            }

            text-white

            shadow-lg
          `}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        {/* Message */}

        <div className="flex flex-col">

          <Card
            style={
              isUser
                ? undefined
                : {
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }
            }
            className={`
              rounded-3xl

              px-5
              py-4

              leading-7

              whitespace-pre-wrap
              wrap-break-word

              transition-all
              duration-300

              ${
                isUser
                  ? `
                    bg-gradient-to-br
                    from-blue-600
                    to-indigo-600

                    text-white

                    shadow-lg
                    shadow-blue-500/20
                  `
                  : `
                    border

                    shadow-[var(--shadow-soft)]
                  `
              }
            `}
          >
            {message.content}
          </Card>

          <span
            style={{ color: "var(--text-secondary)" }}
            className={`
              mt-2

              text-xs

              ${
                isUser
                  ? "text-right"
                  : "text-left"
              }
            `}
          >
            {currentTime}
          </span>

        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
