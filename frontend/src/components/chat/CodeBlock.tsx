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

const CodeBlock = ({
  language,
  code,
}: Props) => {
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

        shadow-(--shadow-soft)
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          px-4
          py-3

          bg-(--bg-secondary)

          border-b
          border-(--border-color)
        "
      >
        <span
          className="
            text-xs
            uppercase
            tracking-wider
            font-semibold

            text-(--text-secondary)
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

            rounded-lg

            px-3
            py-1.5

            text-sm

            transition

            hover:bg-blue-500/10
          "
        >
          {copied ? (
            <>
              <Check size={15} />
              Copied
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
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "transparent",
          padding: "20px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;