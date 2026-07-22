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

  const cardStyle = {
    backgroundColor: "var(--bg-card)",
    borderColor: "var(--border-color)",
  };

  return (
  <main
  style={{ backgroundColor: "var(--bg-primary)" }}
  className="
    flex-1
    overflow-y-auto

    px-8
    py-8

    transition-colors
    duration-300
  "
>
      <div className="mx-auto max-w-5xl">

        {messages.length === 0 && !loading ? (

          <div
            className="
              flex
              min-h-[70vh]
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
                h-20
                w-20

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
  style={{ color: "var(--text-primary)" }}
  className="
    text-4xl
    font-bold
    tracking-tight

    transition-colors
  "
>
              How can I help today?
            </h1>

            <p
              style={{ color: "var(--text-secondary)" }}
              className="
                mt-4
                max-w-xl
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

                max-w-4xl

                grid-cols-2

                gap-5
              "
            >

<Card
  style={cardStyle}
  className="
    cursor-pointer

    rounded-3xl

    border

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40
    hover:shadow-[var(--shadow-soft)]
  "
>

                <Code2
                  className="mb-4 text-blue-400"
                  size={26}
                />

<h3
  style={{ color: "var(--text-primary)" }}
  className="font-semibold"
>
                  Generate Code
                </h3>

                <p
                  style={{ color: "var(--text-secondary)" }}
                  className="mt-2 text-sm"
                >
                  Build React, Python,
                  FastAPI and more.
                </p>

              </Card>

              <Card
  style={cardStyle}
  className="
    cursor-pointer

    rounded-3xl

    border

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40
    hover:shadow-[var(--shadow-soft)]
  "
>

                <FileText
                  className="mb-4 text-emerald-400"
                  size={26}
                />

                <h3
  style={{ color: "var(--text-primary)" }}
  className="font-semibold"
>
                  Summarize Documents
                </h3>

                <p
                  style={{ color: "var(--text-secondary)" }}
                  className="mt-2 text-sm"
                >
                  Extract insights from PDFs,
                  reports and notes.
                </p>

              </Card>

              <Card
  style={cardStyle}
  className="
    cursor-pointer

    rounded-3xl

    border

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40
    hover:shadow-[var(--shadow-soft)]
  "
>

                <Brain
                  className="mb-4 text-purple-400"
                  size={26}
                />

                <h3
  style={{ color: "var(--text-primary)" }}
  className="font-semibold"
>
                  Brainstorm Ideas
                </h3>

                <p
                  style={{ color: "var(--text-secondary)" }}
                  className="mt-2 text-sm"
                >
                  Explore creative solutions
                  and project concepts.
                </p>

              </Card>

              <Card
  style={cardStyle}
  className="
    cursor-pointer

    rounded-3xl

    border

    p-6

    transition-all
    duration-300

    hover:-translate-y-1
    hover:border-blue-500/40
    hover:shadow-[var(--shadow-soft)]
  "
>

                <Search
                  className="mb-4 text-cyan-400"
                  size={26}
                />

                <h3
  style={{ color: "var(--text-primary)" }}
  className="font-semibold"
>
                  Research Topics
                </h3>

                <p
                  style={{ color: "var(--text-secondary)" }}
                  className="mt-2 text-sm"
                >
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
