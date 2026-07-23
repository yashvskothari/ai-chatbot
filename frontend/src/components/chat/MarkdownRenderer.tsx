import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

interface Props {
  content: string;
}

const MarkdownRenderer = ({
  content,
}: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      
      components={{
        code({
          children,
          className,
          ...props
        }) {
          const match = /language-(\w+)/.exec(
            className || ""
          );

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