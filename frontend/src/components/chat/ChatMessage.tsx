import { useState } from "react";
import {
  Bot,
  User,
  FileText,
  ImageIcon,
  Copy,
  Check,
  Pencil,
  RotateCcw,
  Volume2,
  Square,
} from "lucide-react";
import { Card } from "../ui";
import type { Message } from "../../types/chat";
import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  message: Message;

  onEdit?: (message: Message) => void;
  onRegenerate?: (message: Message) => void;

  onSpeak?: (message: Message) => void;
  onStopSpeaking?: () => void;

  speaking?: boolean;
  voiceEnabled?: boolean;
}

const ChatMessage = ({
  message,
  onEdit,
  onRegenerate,
  onSpeak,
  onStopSpeaking,
  speaking,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}
      
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
            <User size={16} className="sm:size-4.5" />
          ) : (
            <Bot size={16} className="sm:size-4.5" />
          )}
        </div>

        {/* Message */}

        <div className="flex flex-col">
          <Card
            className={`
    rounded-2xl

lg:rounded-[26px]
    text-lg
    px-1

sm:px-4

lg:px-6
    py-1

lg:py-3

    leading-7

lg:leading-10
sm:leading-6

    whitespace-pre-wrap

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
            {message.attachments && message.attachments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={`
                      flex
                      items-center
                      gap-2

                      rounded-xl

                      border

                      px-2.5
                      py-1.5

                      text-xs

                      ${
                        isUser
                          ? "border-white/20 bg-white/10"
                          : "border-(--border-color) bg-(--bg-secondary)"
                      }
                    `}
                  >
                    {attachment.type === "image" && attachment.preview ? (
                      <img
                        src={attachment.preview}
                        alt={attachment.filename}
                        className="h-6 w-6 rounded object-cover"
                      />
                    ) : attachment.type === "image" ? (
                      <ImageIcon size={14} />
                    ) : (
                      <FileText size={14} />
                    )}
                    <span className="max-w-32 truncate">
                      {attachment.filename}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <MarkdownRenderer content={message.content} />

            {message.streaming && (
              <span
                className="
      inline-block
      ml-1

      text-blue-500
      dark:text-cyan-400

      animate-pulse

      select-none
    "
              >
                ▋
              </span>
            )}
          </Card>

          <div
            className="
    mt-2
    flex
    items-center
    gap-2
  "
          >
            {/* Assistant actions */}

            {!isUser && (
              <button
                onClick={handleCopy}
                className="
        flex
        items-center
        gap-1.5

        rounded-lg

        px-2
        py-1

        text-xs

        text-slate-500
        dark:text-slate-400

        transition-all
        duration-200

        hover:bg-slate-100
        dark:hover:bg-slate-800

        hover:text-blue-600
      "
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => {
                if (speaking) {
                  onStopSpeaking?.();
                } else {
                  onSpeak?.(message);
                }
              }}
              className="
    flex
    items-center
    gap-1.5

    rounded-lg

    px-2
    py-1

    text-xs

    text-slate-500
    dark:text-slate-400

    transition-all
    duration-200

    hover:bg-slate-100
    dark:hover:bg-slate-800

    hover:text-emerald-600
  "
            >
              {speaking ? (
                <>
                  <Square size={14} />
                  Stop
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  Speak
                </>
              )}
            </button>
            

            {!isUser && onRegenerate && (
              <button
                onClick={() => onRegenerate(message)}
                className="
      flex
      items-center
      gap-1.5

      rounded-lg

      px-2
      py-1

      text-xs

      text-slate-500
      dark:text-slate-400

      transition-all
      duration-200

      hover:bg-slate-100
      dark:hover:bg-slate-800

      hover:text-violet-600
    "
              >
                <RotateCcw size={14} />
                Regenerate
              </button>
            )}

            {/* User actions */}

            {isUser && onEdit && (
              <button
                onClick={() => onEdit(message)}
                className="
        flex
        items-center
        gap-1.5

        rounded-lg

        px-2
        py-1

        text-xs

        text-slate-500
        dark:text-slate-400

        transition-all
        duration-200

        hover:bg-slate-100
        dark:hover:bg-slate-800

        hover:text-emerald-600
      "
              >
                <Pencil size={14} />
                Edit
              </button>
            )}
          </div>
          <span
            className={`
          mt-1.5

sm:mt-2
              

              text-xs

              text-(--text)

              ${isUser ? "text-right" : "text-left"}
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
