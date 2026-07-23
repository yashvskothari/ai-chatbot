import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import type { Conversation, ConversationDocument } from "../types/conversation";
import {
  loadConversations,
  saveConversations,
} from "../utils/storage";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    loadConversations(),
  );

  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(() => {
    const chats = loadConversations();
    return chats.length > 0 ? chats[0].id : null;
  });

  // Save automatically whenever conversations change
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  // Create new conversation
  const createConversation = () => {
    const newConversation: Conversation = {
      id: uuid(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      documents: [],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  // Delete conversation
  const deleteConversation = (id: string) => {
    const updated = conversations.filter((chat) => chat.id !== id);

    setConversations(updated);

    if (activeConversationId === id) {
      setActiveConversationId(updated.length ? updated[0].id : null);
    }
  };

  // Select conversation
  const selectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  // Update messages inside a conversation
  const updateMessages = (messages: Conversation["messages"]) => {
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeConversationId) return chat;

        return {
          ...chat,
          messages,
          updatedAt: new Date().toISOString(),

          // First user message becomes title
          title:
            chat.title === "New Chat" && messages.length > 0
              ? messages[0].content.slice(0, 35) || "Attachment"
              : chat.title,
        };
      }),
    );
  };

  // Merge newly-uploaded documents into the active conversation's
  // persistent memory (deduped by filename, latest wins).
  const addDocuments = (docs: ConversationDocument[]) => {
    if (docs.length === 0) return;

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeConversationId) return chat;

        const existing = chat.documents.filter(
          (d) => !docs.some((nd) => nd.filename === d.filename),
        );

        return {
          ...chat,
          documents: [...existing, ...docs],
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const renameConversation = (id: string, title: string) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              title,
              updatedAt: new Date().toISOString(),
            }
          : chat,
      ),
    );
  };

  const activeConversation =
    conversations.find((chat) => chat.id === activeConversationId) || null;

  return {
    conversations,
    activeConversation,
    activeConversationId,
    renameConversation,
    createConversation,
    deleteConversation,
    selectConversation,
    updateMessages,
    addDocuments,
  };
};
