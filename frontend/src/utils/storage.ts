import type { Conversation } from "../types/conversation";

const STORAGE_KEY = "ai-chatbot-conversations";

export const loadConversations = (): Conversation[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    const parsed = JSON.parse(data) as Conversation[];

    // Backfill `documents` for conversations saved before this field existed.
    return parsed.map((chat) => ({
      ...chat,
      documents: chat.documents ?? [],
    }));
  } catch {
    return [];
  }
};

export const saveConversations = (data: unknown) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
