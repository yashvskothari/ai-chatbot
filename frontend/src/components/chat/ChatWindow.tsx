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
}

const ChatWindow = ({
  messages,
  loading,
}: Props) => {
  const bottomRef = useAutoScroll([
    messages,
    loading,
  ]);

  return (
  <main
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

<Card
className="
     cursor-pointer

    rounded-3xl

    border
    border-(--border-color)

    bg-white
    dark:bg-(--bg-card)

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40

    hover:shadow-xl

    shadow-lg
"
>

                <Code2
                  className="mb-4 text-blue-400"
                  size={26}
                />

<h3
  className="
    font-semibold
    text-(--text-primary)
  "
>
                  Generate Code
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Build React, Python,
                  FastAPI and more.
                </p>

              </Card>

              <Card
className="
    cursor-pointer

    rounded-3xl

    border
    border-(--border-color)

    bg-white
    dark:bg-(--bg-card)

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40

    hover:shadow-xl

    shadow-lg
"
>

                <FileText
                  className="mb-4 text-emerald-400"
                  size={26}
                />

                <h3
  className="
    font-semibold
    text-(--text-primary)
  "
>
                  Summarize Documents
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Extract insights from PDFs,
                  reports and notes.
                </p>

              </Card>

              <Card
className="
    cursor-pointer

    rounded-3xl

    border
    border-(--border-color)

    bg-white
    dark:bg-(--bg-card)

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40

    hover:shadow-xl

    shadow-lg
"
>

                <Brain
                  className="mb-4 text-purple-400"
                  size={26}
                />

                <h3
  className="
    font-semibold
    text-(--text-primary)
  "
>
                  Brainstorm Ideas
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Explore creative solutions
                  and project concepts.
                </p>

              </Card>

              <Card
className="
    cursor-pointer

    rounded-3xl

    border
    border-(--border-color)

    bg-white
    dark:bg-(--bg-card)

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40

    hover:shadow-xl

    shadow-lg
"
>

                <Search
                  className="mb-4 text-cyan-400"
                  size={26}
                />

                <h3
  className="
    font-semibold
    text-(--text-primary)
  "
>
                  Research Topics
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Learn, compare,
                  and understand
                  complex subjects.
                </p>

              </Card>

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

            {loading && (
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