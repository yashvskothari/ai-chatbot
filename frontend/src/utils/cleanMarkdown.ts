export function cleanMarkdown(text: string): string {
  return text
    // ---------- CODE BLOCKS ----------
    .replace(
      /```(\w+)?[\s\S]*?```/g,
      (_, lang) =>
        lang
          ? `Here's a ${lang} code example.`
          : "Here's a code example."
    )

    // ---------- INLINE CODE ----------
    .replace(/`([^`]*)`/g, "$1")

    // ---------- HEADINGS ----------
    .replace(/^######\s+/gm, "")
    .replace(/^#####\s+/gm, "")
    .replace(/^####\s+/gm, "")
    .replace(/^###\s+/gm, "")
    .replace(/^##\s+/gm, "")
    .replace(/^#\s+/gm, "")

    // ---------- BOLD ----------
    .replace(/\*\*(.*?)\*\*/g, "$1")

    // ---------- ITALIC ----------
    .replace(/\*(.*?)\*/g, "$1")

    // ---------- STRIKETHROUGH ----------
    .replace(/~~(.*?)~~/g, "$1")

    // ---------- LINKS ----------
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")

    // ---------- IMAGES ----------
    .replace(/!\[(.*?)\]\((.*?)\)/g, "")

    // ---------- BLOCKQUOTE ----------
    .replace(/^>\s?/gm, "")

    // ---------- BULLETS ----------
    .replace(/^\s*[-*+]\s+/gm, "• ")

    // ---------- NUMBERED LISTS ----------
    .replace(/^\s*1\.\s+/gm, "First, ")
    .replace(/^\s*2\.\s+/gm, "Second, ")
    .replace(/^\s*3\.\s+/gm, "Third, ")
    .replace(/^\s*4\.\s+/gm, "Fourth, ")
    .replace(/^\s*5\.\s+/gm, "Fifth, ")
    .replace(/^\s*6\.\s+/gm, "Sixth, ")
    .replace(/^\s*7\.\s+/gm, "Seventh, ")
    .replace(/^\s*8\.\s+/gm, "Eighth, ")
    .replace(/^\s*9\.\s+/gm, "Ninth, ")
    .replace(/^\s*10\.\s+/gm, "Tenth, ")

    // ---------- TABLES ----------
    .replace(/\|/g, " ")

    // ---------- HORIZONTAL RULE ----------
    .replace(/---+/g, "")

    // ---------- HTML TAGS ----------
    .replace(/<[^>]*>/g, "")

    // ---------- MULTIPLE NEWLINES ----------
    .replace(/\n{3,}/g, "\n\n")

    // ---------- MULTIPLE SPACES ----------
    .replace(/[ \t]{2,}/g, " ")

    .replace(/AI/g, "A I")
.replace(/API/g, "A P I")
.replace(/UI/g, "U I")
.replace(/UX/g, "U X")
.replace(/SQL/g, "S Q L")
.replace(/HTML/g, "H T M L")
.replace(/CSS/g, "C S S")
.replace(/JS/g, "JavaScript")
.replace(/TS/g, "TypeScript")
.replace(/GPT/g, "G P T")

    .replace(/#/g, "")
    .replace(/\*/g, "")
    .replace(/_/g, "")
    .replace(/`/g, "")

    .trim();
}