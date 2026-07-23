import { Bot, User } from "lucide-react";
import { Card } from "../ui";
import type { Message } from "../../types/chat";
import MarkdownRenderer from "./MarkdownRenderer";

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
      }
      
    animate-in
    fade-in
    slide-in-from-bottom-2
    duration-300
      `}
    >
      <div
        className={`
          flex
          w-fit

max-w-[92%]

sm:max-w-[85%]

lg:max-w-3xl

xl:max-w-4xl
          gap-2

sm:gap-3
          ${isUser ? "flex-row-reverse" : ""}
        `}
      >
        {/* Avatar */}

        <div
          className={`
            mt-1

            flex
            h-9
w-9

sm:h-10
sm:w-10

            shrink-0

            items-center
            justify-center

            rounded-full

            ${
              isUser
                ? "bg-linear-to-br from-blue-600 to-indigo-600"
                : "bg-linear-to-br from-emerald-500 to-cyan-500"
            }

            text-white

            shadow-lg
          `}
        >
          {isUser ? (
            <User
  size={16}
  className="sm:size-4.5"
/>
          ) : (
            <Bot
  size={16}
  className="sm:size-4.5"
/>
          )}
        </div>

        {/* Message */}

        <div className="flex flex-col">

<Card
  className={`
    rounded-2xl

lg:rounded-[26px]
    text-lg
    px-4

sm:px-5

lg:px-6
    py-3

lg:py-4

    leading-7

lg:leading-8

    whitespace-pre-wrap
    overflow-hidden

    border

    transition-all
    duration-300

    ${
      isUser
        ? `
          border-blue-400/25

          bg-linear-to-br
          from-blue-600
          via-indigo-600
          to-violet-700

          text-white

          shadow-md
          shadow-blue-500/20
        `
        : `
          border-var(--border-color)

          bg-linear-to-br
         from-white
via-sky-50
to-blue-50

          dark:from-slate-800
          dark:via-slate-900
          dark:to-slate-900

          text-slate-800
          dark:text-slate-100

          backdrop-blur-xl

          shadow-md
          shadow-slate-200/40
          dark:shadow-black/20

          hover:border-cyan-400/30
          hover:shadow-xl
          hover:-translate-y-0.5
        `
    }
  `}
>
            <MarkdownRenderer
            content = {message.content}
            />
          </Card>

          <span
            className={`
          mt-1.5

sm:mt-2
              

              text-xs

              text-(--text)

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