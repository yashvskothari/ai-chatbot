import { useEffect, useRef, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import api from "../services/api";
import { useConversations } from "../hooks/useConversations";

import type { Message } from "../types/chat";

const ChatPage = () => {
 const [loading, setLoading] = useState(false);

const {
  conversations,
  activeConversation,
  activeConversationId,
  createConversation,
  selectConversation,
  updateMessages,
  deleteConversation,
  renameConversation
} = useConversations();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
  if (conversations.length === 0) {
    createConversation();
  }
}, [conversations, createConversation]);

  const sendMessage = async (text: string) => {
  if (!text.trim() || !activeConversation) return;

  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: text,
  };

  // Add the user's message
  const updatedMessages = [
    ...activeConversation.messages,
    userMessage,
  ];

  updateMessages(updatedMessages);

  setLoading(true);

  try {
    const response = await api.post("/chat", {
      message: text,
    });

    const aiMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: response.data.response,
    };

    // Add the AI's response
    updateMessages([
      ...updatedMessages,
      aiMessage,
    ]);

  } catch {
    updateMessages([
      ...updatedMessages,
      {
        id: Date.now() + 2,
        role: "assistant",
        content: "Something went wrong.",
      },
    ]);

  } finally {
    setLoading(false);
    inputRef.current?.focus();
  }
};

  return (
    <div
  className="
    h-screen
    flex
    flex-col

    bg-(--bg-primary)
    text-(--text-primary)
    
    transition-colors
    duration-300
  "
>
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
  conversations={conversations}
  activeConversationId={activeConversationId}
  onSelect={selectConversation}
  onNewChat={createConversation}
  onRename={renameConversation}
  onDelete={deleteConversation}
/>

        <div className="flex flex-col flex-1">
          <ChatWindow
  messages={activeConversation?.messages ?? []}
  loading={loading}
/>
        <div className = "border-t-2 border-(--border-color)">
          <ChatInput
            ref={inputRef}
            onSend={sendMessage}
            loading={loading}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;