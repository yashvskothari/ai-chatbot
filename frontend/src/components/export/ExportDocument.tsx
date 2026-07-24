import type { Conversation } from "../../types/conversation";
import PdfMarkdown from "./PdfMarkdown";


interface Props {
  conversation: Conversation;
}

const ExportDocument = ({ conversation }: Props) => {
  return (
    <div
      id="pdf-export"
      style={{
        width: "794px", // A4 @96dpi
        background: "#ffffff",
        color: "#111827",
        padding: "50px",
        fontFamily: "Segoe UI, Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}

      <div
        style={{
          borderBottom: "3px solid #2563eb",
          paddingBottom: "18px",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          {conversation.title}
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Generated using <strong>Flux AI</strong>

          <br />

          {new Date().toLocaleString()}
        </p>
      </div>

      {/* Messages */}

      {conversation.messages.map((message, index) => (
        <div
          key={message.id}
          style={{
            marginBottom: "35px",
            pageBreakInside: "avoid",
          }}
        >
          {/* Top */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
 <div
  style={{
    width: 44,
    height: 44,

    borderRadius: "50%",

    background:
      message.role === "user"
        ? "#2563eb"
        : "#10b981",

    color: "#ffffff",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1,

    paddingBottom: 20,
    margin: 0,

    flexShrink: 0,

    boxSizing: "border-box",
  }}
>
  {message.role === "user" ? "Y" : "F"}
</div>

            <div
              style={{
                marginLeft: "12px",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "17px",
                }}
              >
                {message.role === "user"
                  ? "You"
                  : "Flux AI"}
              </div>

              <div
                style={{
                  color: "#6b7280",
                  fontSize: "12px",
                }}
              >
                Message {index + 1}
              </div>
            </div>
          </div>

          {/* Bubble */}

          <div
            style={{
              background:
                message.role === "user"
                  ? "#eff6ff"
                  : "#ffffff",

              border:
                message.role === "user"
                  ? "1px solid #bfdbfe"
                  : "1px solid #e5e7eb",

              borderRadius: "16px",

              padding: "22px",

              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",

              fontSize: "15px",
              lineHeight: 1.8,
            }}
          >
            {message.attachments?.length ? (
              <div
                style={{
                  marginBottom: "18px",
                  padding: "12px",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              >
                <strong>Attachments</strong>

                <ul
                  style={{
                    marginTop: "8px",
                    marginBottom: 0,
                  }}
                >
                  {message.attachments.map((file) => (
                    <li key={file.id}>
                      {file.filename}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <PdfMarkdown
  content={message.content}
  
/>

          </div>
        </div>
      ))}

      {/* Footer */}

      <div
        style={{
          marginTop: "60px",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "18px",
          textAlign: "center",
          color: "#6b7280",
          fontSize: "12px",
        }}
      >
        Export generated using Flux AI
      </div>
    </div>
  );
};

export default ExportDocument;