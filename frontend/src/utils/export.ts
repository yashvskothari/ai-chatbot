import html2pdf from "html2pdf.js";
import { createRoot } from "react-dom/client";
import ExportDocument from "../components/export/ExportDocument";
import type { Conversation } from "../types/conversation";
import React from "react";
const sanitizeFilename = (title: string) =>
  (title || "conversation")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "conversation";

const downloadBlob = (
  content: string,
  filename: string,
  mime: string,
) => {
  const blob = new Blob([content], {
    type: mime,
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};

export const exportToMarkdown = (
  conversation: Conversation,
) => {
  const lines: string[] = [];

  lines.push(`# ${conversation.title}`);
  lines.push("");
  lines.push(
    `_Exported ${new Date().toLocaleString()}_`,
  );
  lines.push("");

  if (conversation.documents.length) {
    lines.push("## Attachments");
    lines.push("");

    conversation.documents.forEach((doc) => {
      lines.push(`- ${doc.filename} (${doc.type})`);
    });

    lines.push("");
  }

  lines.push("---");
  lines.push("");

  conversation.messages.forEach((message) => {
    lines.push(
      `### ${
        message.role === "user"
          ? "You"
          : "Flux AI"
      }`,
    );

    lines.push("");

    if (message.attachments?.length) {
      message.attachments.forEach((file) => {
        lines.push(`📎 ${file.filename}`);
      });

      lines.push("");
    }

    lines.push(message.content);
    lines.push("");
  });

  downloadBlob(
    lines.join("\n"),
    `${sanitizeFilename(
      conversation.title,
    )}.md`,
    "text/markdown",
  );
};

export const exportToPDF = async (
  conversation: Conversation,
) => {
  const container =
    document.createElement("div");

  container.id = "flux-export-container";

  Object.assign(container.style, {
    position: "fixed",
    left: "-99999px",
    top: "0",
    width: "210mm",
    background: "#ffffff",
    zIndex: "-9999",
    overflow: "hidden",
  });

  document.body.appendChild(container);

  const root = createRoot(container);

  try {
  root.render(
  React.createElement(ExportDocument, {
    conversation,
  })
);

    await new Promise((resolve) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(resolve),
      ),
    );

    const worker = html2pdf();

    await worker
      .set({
        filename: `${sanitizeFilename(
          conversation.title,
        )}.pdf`,

        margin: [8, 8, 8, 8],

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2.5,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      } as never)
      .from(container)
      .save();
  } catch (err) {
    console.error(err);
  } finally {
    root.unmount();

    container.remove();
  }
};