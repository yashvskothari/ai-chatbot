import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";

import ExportDocument from "../components/export/ExportDocument";

import type { Conversation } from "../types/conversation";

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

  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.background = "#ffffff";
  container.style.zIndex = "-9999";

  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(
    React.createElement(ExportDocument, {
      conversation,
    })
  );

  // wait for rendering

  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  const element =
    container.firstElementChild as HTMLElement;
    console.log(element);
console.log(element.innerHTML);

  if (!element) {
    root.unmount();
    container.remove();
    return;
  }

  //---------------------------------------

const clone = element.cloneNode(true) as HTMLElement;

// Remove every Tailwind class from cloned tree
clone.querySelectorAll("*").forEach((el) => {
  el.removeAttribute("class");
});

clone.style.position = "fixed";
clone.style.left = "0";
clone.style.top = "0";
clone.style.background = "#ffffff";
clone.style.zIndex = "-99999";

document.body.appendChild(clone);

const canvas = await html2canvas(clone, {
  scale: 2,
  useCORS: true,
  backgroundColor: "#ffffff",
  logging: false,
});

clone.remove();
  document.body.appendChild(canvas);
  console.log(canvas.width);
console.log(canvas.height);

  //---------------------------------------

  const pdf = new jsPDF({

    orientation: "portrait",

    unit: "mm",

    format: "a4",

  });

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;

  const imgHeight =
    (canvas.height * imgWidth) /
    canvas.width;

  let heightLeft = imgHeight;

  let position = 0;

  const imgData =
    canvas.toDataURL("image/png");

  //---------------------------------------

  pdf.addImage(

    imgData,

    "PNG",

    0,

    position,

    imgWidth,

    imgHeight

  );

  heightLeft -= pdfHeight;

  while (heightLeft > 0) {

    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(

      imgData,

      "PNG",

      0,

      position,

      imgWidth,

      imgHeight

    );

    heightLeft -= pdfHeight;

  }

  //---------------------------------------

  pdf.save(`${sanitizeFilename(conversation.title)}.pdf`);

  root.unmount();

  container.remove();

};