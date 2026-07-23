import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

interface Props {
  content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-4xl font-bold text-(--text-primary)">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mt-7 mb-3 text-3xl font-semibold text-(--text-primary)">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mt-6 mb-3 text-2xl font-semibold text-(--text-primary)">
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
      text-(--text-primary)
    "
  >
    {children}
  </p>
),

        ul: ({ children }) => (
          <ul className="my-4 list-disc pl-6 space-y-3">{children}</ul>
        ),

        ol: ({ children }) => (
          <ol className="my-4 list-decimal pl-6 space-y-3">{children}</ol>
        ),

        li: ({ children }) => <li className="leading-7">{children}</li>,

        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-500/5 px-4 py-3 italic rounded-r-xl">
            {children}
          </blockquote>
        ),

        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-2xl border border-(--border-color)">
            <table className="min-w-full border-collapse">{children}</table>
          </div>
        ),

        thead: ({ children }) => (
          <thead className="bg-blue-500/15 sticky top-0">{children}</thead>
        ),

        tbody: ({ children }) => <tbody>{children}</tbody>,

        tr: ({ children }) => (
          <tr className="border-b border-(--border-color) even:bg-black/5 dark:even:bg-white/5">{children}</tr>
        ),

        th: ({ children }) => (
          <th className="border border-(--border-color) px-4 py-3 text-left font-semibold text-(--text-primary)">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border border-(--border-color) px-4 py-3 align-top text-(--text-primary)">
            {children}
          </td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="
      text-blue-500
      hover:text-blue-600
      underline
      underline-offset-2
      break-all
    "
          >
            {children}
          </a>
        ),
        hr: () => (
          <hr className="my-8 border-0 border-t border-(--border-color)" />
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="
      my-6
      rounded-2xl
      border
      border-(--border-color)
      shadow-lg
      max-w-full
      mx-auto
    "
          />
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-(--text-primary)">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-(--text-primary)">{children}</em>
        ),

        code({ children, className, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (!match) {
            return (
              <code
                className="
        
rounded-md
bg-slate-200
dark:bg-slate-800
px-2
py-1
font-mono
text-[0.92em]
text-pink-600
dark:text-pink-300
"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
              language={match[1]}
              code={String(children).replace(/\n$/, "")}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
