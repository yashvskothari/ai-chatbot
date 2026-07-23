import type { Message } from "./chat";

export interface ConversationDocument {
  id: string;
  filename: string;
  type: "document" | "image";
  content: string; // extracted text (docs) or AI description (images)
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  // Accumulated memory of every document/image uploaded in this
  // conversation, sent as context on every subsequent chat request.
  documents: ConversationDocument[];
}
