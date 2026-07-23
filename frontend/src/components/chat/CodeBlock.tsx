import { useState } from "react";

import { Copy, Check } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { useTheme } from "../../hooks/useTheme";

interface Props {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: Props) => {
  const [copied, setCopied] = useState(false);

  const { theme } = useTheme();

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className="
        my-5
        overflow-hidden

        rounded-2xl

        border
        border-(--border-color)

        shadow-xl
hover:shadow-2xl
transition-shadow
duration-300
      "
    >
      <div
        className="
    flex
    items-center
    justify-between

    px-5
    py-3.5

    bg-linear-to-r
    from-(--bg-secondary)
    to-(--bg-card)

    border-b
    border-(--border-color)
  "
      >
        <span
          className="
    rounded-full

    bg-blue-500/10

    px-3
    py-1

    text-[11px]
    font-semibold
    uppercase
    tracking-widest

    text-blue-500
  "
        >
          {language || "text"}
        </span>

        <button
          onClick={copyCode}
          className="
    flex
    items-center
    gap-2

    rounded-xl

    px-3
    py-2

    text-sm
    font-medium

    transition-all
    duration-200

    hover:bg-blue-500/10
    hover:scale-105
    active:scale-95
  "
        >
          {copied ? (
            <>
              <Check size={15} />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
  language={language}
  style={theme === "light" ? oneLight : oneDark}
  showLineNumbers
  wrapLongLines
  wrapLines
  lineNumberStyle={{
    color: "#6b7280",
    minWidth: "2.8em",
    paddingRight: "18px",
  }}
  customStyle={{
    margin: 0,
    borderRadius: 0,
    background: "transparent",
    padding: "24px",
    fontSize: "14px",
    lineHeight: "1.7",
    overflowX: "auto",
  }}
>
  {code}
</SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
