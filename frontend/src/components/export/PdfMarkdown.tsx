interface Props {
  content: string;
}

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const parseInline = (text: string) => {
  return escapeHtml(text)
    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    )
    .replace(
      /\*(.*?)\*/g,
      "<em>$1</em>"
    )
    .replace(
      /`(.*?)`/g,
      `<code
      style="
      background:#f3f4f6;
      padding:2px 6px;
      border-radius:4px;
      font-family:monospace;
      ">
      $1
      </code>`
    );
};

interface Props {
  content: string;
}

const PdfMarkdown = ({
  content,
}: Props) => {
  const lines = content.split("\n");

  return (
    <div>
      {lines.map((line, index) => {
        const text = line.trim();

        if (!text) {
          return (
            <div
              key={index}
              style={{
                height: 8,
              }}
            />
          );
        }

        if (text.startsWith("# ")) {
          return (
            <h1
              key={index}
              style={{
                fontSize: 30,
                marginBottom: 12,
              }}
            >
              {text.substring(2)}
            </h1>
          );
        }

        if (text.startsWith("## ")) {
          return (
            <h2
              key={index}
              style={{
                fontSize: 24,
                marginBottom: 10,
              }}
            >
              {text.substring(3)}
            </h2>
          );
        }

        if (text.startsWith("### ")) {
          return (
            <h3
              key={index}
              style={{
                fontSize: 20,
                marginBottom: 8,
              }}
            >
              {text.substring(4)}
            </h3>
          );
        }

        if (text.startsWith("- ")) {
          return (
            <div
              key={index}
              style={{
                marginLeft: 18,
                marginBottom: 6,
              }}
            >
              • {text.substring(2)}
            </div>
          );
        }

        if (text.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              style={{
                borderLeft:
                  "4px solid #2563eb",
                paddingLeft: 12,
                color: "#4b5563",
                fontStyle: "italic",
                margin: "10px 0",
              }}
            >
              {text.substring(2)}
            </blockquote>
          );
        }

        if (text === "---") {
          return (
            <hr
              key={index}
              style={{
                margin: "20px 0",
              }}
            />
          );
        }

        return (
          <p
            key={index}
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 10,
            }}
            dangerouslySetInnerHTML={{
              __html: parseInline(text),
            }}
          />
        );
      })}
    </div>
  );
};

export default PdfMarkdown;