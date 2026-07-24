import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

interface Props {
  content: string;
  pdf?: boolean;
}

const MarkdownRenderer = ({ content, pdf = false }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-4xl font-bold text-white">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mt-7 mb-3 text-3xl font-semibold text-white">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mt-6 mb-3 text-2xl font-semibold text-white">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p
            className="
      my-4
      text-[17px]
      lg:text-[18px]
      leading-8
      text-white
    "
          >
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="my-4 list-disc pl-6 space-y-3 text-white">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="my-4 list-decimal pl-6 space-y-3 text-white">
            {children}
          </ol>
        ),

        li: ({ children }) => (
          <li className="leading-7 text-white">{children}</li>
        ),

        blockquote: ({ children }) => (
          <blockquote
            className="
      my-6
      border-l-4
      border-blue-500
      bg-blue-500/5
      px-4
      py-3
      italic
      rounded-r-xl
      text-white
    "
          >
            {children}
          </blockquote>
        ),

        thead: ({ children }) => (
          <thead className="bg-blue-500/15 sticky top-0 text-white">
            {children}
          </thead>
        ),

        tbody: ({ children }) => (
          <tbody className="text-white">{children}</tbody>
        ),

        tr: ({ children }) => (
          <tr
            className="
      border-b
      border-(--border-color)
      even:bg-black/5
      dark:even:bg-white/5
      text-white
    "
          >
            {children}
          </tr>
        ),

        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="
      text-blue-400
      hover:text-blue-300
      underline
      underline-offset-2
      break-all
    "
          >
            {children}
          </a>
        ),

        strong: ({ children }) => (
          <strong className="font-bold text-white">{children}</strong>
        ),

        em: ({ children }) => <em className="italic text-white">{children}</em>,

        code({ children, className, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          // Inline Code
          if (!match) {
            return (
              <code
                className="
          rounded-md
          bg-black/10
          dark:bg-white/10
          px-1.5
          py-0.5
          text-sm
        "
                {...props}
              >
                {children}
              </code>
            );
          }

          const code = String(children).replace(/\n$/, "");

          // PDF Mode
          if (pdf) {
            return (
              <pre
                style={{
                  background: "#111827",
                  color: "#f9fafb",
                  padding: "16px",
                  borderRadius: "10px",
                  overflowX: "auto",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  margin: "18px 0",
                }}
              >
                <code>{code}</code>
              </pre>
            );
          }

          // Chat Mode
          return <CodeBlock language={match[1]} code={code} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
