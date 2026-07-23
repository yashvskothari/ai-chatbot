import {
  Code2,
  FileText,
  Brain,
  Search,
} from "lucide-react";
import logo from "../../assets/logo.png";

import type { Message } from "../../types/chat";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { Card } from "../ui";

interface Props {
  messages: Message[];
  loading: boolean;
  onSuggestionClick?: (prompt: string) => void;
}

const SUGGESTIONS = [
  {
    icon: Code2,
    color: "text-blue-400",
    title: "Generate Code",
    description: "Build React, Python, FastAPI and more.",
    prompt:
      "Write a well-documented function that solves the following problem: ",
  },
  {
    icon: FileText,
    color: "text-emerald-400",
    title: "Summarize Documents",
    description: "Extract insights from PDFs, reports and notes.",
    prompt:
      "Please summarize the key points of the document I've attached.",
  },
  {
    icon: Brain,
    color: "text-purple-400",
    title: "Brainstorm Ideas",
    description: "Explore creative solutions and project concepts.",
    prompt: "Help me brainstorm ideas for ",
  },
  {
    icon: Search,
    color: "text-cyan-400",
    title: "Research Topics",
    description: "Learn, compare, and understand complex subjects.",
    prompt: "Explain, with pros and cons, the differences between ",
  },
];

const ChatWindow = ({
  messages,
  loading,
  onSuggestionClick,
}: Props) => {
const { containerRef, bottomRef } = useAutoScroll([
  messages,
  loading,
]);
  return (
  <main
  ref={containerRef}
  className="
    flex-1
    overflow-y-auto

    bg-(--bg-primary)

    px-4
py-4

sm:px-6
sm:py-6

lg:px-8
lg:py-8

    transition-colors
    duration-300
  "
>
      <div className="mx-auto max-w-full

xl:max-w-5xl">

        {messages.length === 0 && !loading ? (

          <div
            className="
              flex
              min-h-[60vh]

lg:min-h-[70vh]
              flex-col
              items-center
              justify-center
              text-center
            "
          >

            {/* Logo */}

            <div
              className="
                mb-8

                flex
                h-14
w-14

sm:h-16
sm:w-16

lg:h-20
lg:w-20
                items-center
                justify-center

                rounded-2xl

                bg-linear-to-br
                from-blue-600
                via-indigo-600
                to-cyan-500

                shadow-2xl
                shadow-blue-500/30
              "
            >
               <img
              src={logo}
              alt="Flux AI"
              className="h-20 w-20 scale-120 object-contain"
            />
            </div>

            {/* Heading */}

          <h1
  className="
    text-2xl

sm:text-3xl

lg:text-4xl
    font-bold
    tracking-tight

    text-(--text-primary)

    transition-colors
  "
>
              How can I help today?
            </h1>

            <p
              className="
                mt-4
                max-w-md

sm:max-w-lg

lg:max-w-xl
                text-slate-500 dark:text-slate-400
              "
            >
              Ask questions, generate code,
              summarize documents,
              analyze data, or brainstorm ideas.
            </p>

            {/* Suggestion Cards */}

            <div
              className="
                mt-12

                grid

                w-full

                max-w-full

xl:max-w-4xl

                grid-cols-1

sm:grid-cols-2

                gap-4

lg:gap-5
              "
            >
              {SUGGESTIONS.map((suggestion) => {
                const Icon = suggestion.icon;

                return (
                  <Card
                    key={suggestion.title}
                    onClick={() => onSuggestionClick?.(suggestion.prompt)}
                    className="
                      cursor-pointer

                      rounded-3xl

                      border
                      border-(--border-color)

                      bg-white
                      dark:bg-(--bg-card)

                      p-6

                      text-left

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-blue-500/40

                      hover:shadow-xl

                      shadow-lg
                    "
                  >
                    <Icon className={`mb-4 ${suggestion.color}`} size={26} />

                    <h3
                      className="
                        font-semibold
                        text-(--text-primary)
                      "
                    >
                      {suggestion.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {suggestion.description}
                    </p>
                  </Card>
                );
              })}
            </div>

          </div>

        ) : (

          <div
  className="
    space-y-8

    animate-in
    fade-in
    duration-300
  "
>

            {messages.map((message) => (

              <ChatMessage
                key={message.id}
                message={message}
              />

            ))}

            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <TypingIndicator />
            )}

            <div ref={bottomRef} />

          </div>

        )}

      </div>

    </main>
  );
};

export default ChatWindow;
