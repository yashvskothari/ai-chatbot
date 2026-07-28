import { useEffect, useRef, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import type { ChatInputHandle } from "../components/chat/ChatInput";
import { cleanMarkdown } from "../utils/cleanMarkdown";
import { useAuth } from "@clerk/clerk-react";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { streamChatMessage } from "../services/api";
import { useConversations } from "../hooks/useConversations";
import { exportToMarkdown, exportToPDF } from "../utils/export";
import { useVoice } from "../hooks/useVoice";
// import ExportDocument from "../components/export/ExportDocument";

import type { Message, MessageAttachment } from "../types/chat";
import type { PendingAttachment } from "../types/attachment";
import type { ChatMessagePayload } from "../services/api";

const MAX_HISTORY_MESSAGES = 20;

const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const { selectedVoice } = useVoice();
  const {
    speak,
    stop,
    speaking,
  } = useSpeechSynthesis(selectedVoice);
  
  
  const handleSpeak = (message: Message) => {
    
    if(!voiceEnabled) return;
    const cleaned = cleanMarkdown(message.content);
    speak(cleaned);
  };
  
  const handleStopSpeaking = () => {
    stop();
  };
  const abortControllerRef = useRef<AbortController | null>(null);
  const { getToken } = useAuth();

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    conversations,
    activeConversation,
    activeConversationId,
    createConversation,
    selectConversation,
    updateMessages,
    deleteConversation,
    renameConversation,
    addDocuments,
  } = useConversations();
  const inputRef = useRef<ChatInputHandle>(null);
  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message.id);

    inputRef.current?.setMessage(message.content);

    inputRef.current?.focus();
  };
  const handleRegenerate = (assistantMessage: Message) => {
    if (!activeConversation) return;

    const assistantIndex = activeConversation.messages.findIndex(
      (m) => m.id === assistantMessage.id,
    );

    if (assistantIndex <= 0) return;

    const userMessage = activeConversation.messages[assistantIndex - 1];

    if (userMessage.role !== "user") return;

    updateMessages(activeConversation.messages.slice(0, assistantIndex - 1));

    sendMessage(userMessage.content, []);
  };

  useEffect(() => {
    if (!voiceEnabled) {
      stop();
    }
  }, [voiceEnabled, stop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== inputRef.current?.getElement()
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    }
  }, [conversations, createConversation]);

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
    stop();
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (prompt: string) => {
    inputRef.current?.setMessage(prompt);
    inputRef.current?.focus();
  };

  const sendMessage = async (
    text: string,
    attachments: PendingAttachment[],
  ) => {
    if (!activeConversation) return;
    let workingMessages = [...activeConversation.messages];

    if (editingMessageId !== null) {
      const editIndex = workingMessages.findIndex(
        (m) => m.id === editingMessageId,
      );

      if (editIndex !== -1) {
        workingMessages = workingMessages.slice(0, editIndex);
      }

      setEditingMessageId(null);
    }
    if (!text.trim() && attachments.length === 0) return;

    // Attachments to display on this specific message bubble.
    const messageAttachments: MessageAttachment[] = attachments.map((a) => ({
      id: a.remoteId ?? a.localId,
      filename: a.name,
      type: a.kind,
      size: a.size,
      preview: a.preview,
    }));

    // Persist extracted content into the conversation's long-lived memory
    // so future turns can still reference documents/images uploaded earlier.
    addDocuments(
      attachments
        .filter((a) => a.content)
        .map((a) => ({
          id: a.remoteId ?? a.localId,
          filename: a.name,
          type: a.kind,
          content: a.content as string,
        })),
    );

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content:
        text ||
        (attachments.length
          ? `Sent ${attachments.length} attachment${attachments.length > 1 ? "s" : ""}.`
          : ""),
      attachments: messageAttachments.length ? messageAttachments : undefined,
    };

    const historyForRequest: ChatMessagePayload[] = activeConversation.messages
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content }));

    const documentContext = [
      ...activeConversation.documents,
      ...attachments
        .filter((a) => a.content)
        .map((a) => ({
          id: a.remoteId ?? a.localId,
          filename: a.name,
          type: a.kind,
          content: a.content as string,
        })),
    ]
      // dedupe by filename, latest wins
      .reduce<typeof activeConversation.documents>((acc, doc) => {
        const filtered = acc.filter((d) => d.filename !== doc.filename);
        return [...filtered, doc];
      }, []);

    const assistantMessageId = Date.now() + 1;
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      streaming: true,
    };

    let updatedMessages = [...workingMessages, userMessage];
    updateMessages(updatedMessages);

    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Add the (initially empty) streaming assistant message.
    updatedMessages = [...updatedMessages, assistantMessage];
    updateMessages(updatedMessages);

    let streamedContent = "";

    const applyToken = (token: string) => {
      streamedContent += token;

      updatedMessages = updatedMessages.map((m) =>
        m.id === assistantMessageId ? { ...m, content: streamedContent } : m,
      );

      updateMessages(updatedMessages);
    };

    const finish = (finalContent?: string) => {
      updatedMessages = updatedMessages.map((m) =>
        m.id === assistantMessageId
          ? {
              ...m,
              content: finalContent ?? streamedContent,
              streaming: false,
            }
          : m,
      );

      updateMessages(updatedMessages);

      const textToSpeak = finalContent ?? streamedContent;

      if (textToSpeak.trim()) {
        speak(textToSpeak);
      }

      setLoading(false);
      abortControllerRef.current = null;
      inputRef.current?.focus();
    };
const token = await getToken();
console.log("TOKEN =", token);

await streamChatMessage(
  {
    message: text,
    history: historyForRequest,
    attachments: documentContext.map((d) => ({
      filename: d.filename,
      type: d.type,
      content: d.content,
    })),
  },
  {
    onToken: applyToken,
    onDone: () => finish(),
    onError: (message) => {
      finish(
        streamedContent ||
          `Something went wrong: ${message || "please try again."}`,
      );
    },
  },
  controller.signal,
  token,
);
  };

  const handleExportMarkdown = () => {
    if (activeConversation) exportToMarkdown(activeConversation);
  };

  const handleExportPDF = () => {
    if (activeConversation) exportToPDF(activeConversation);
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
      <Navbar
       onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          exportDisabled={
            !activeConversation || activeConversation.messages.length === 0
          }
          
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onExportMarkdown={handleExportMarkdown}
          voiceEnabled={voiceEnabled}
          onToggleVoice={() => setVoiceEnabled((v) => !v)}
          onExportPDF={handleExportPDF}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelect={selectConversation}
          onNewChat={createConversation}
          onRename={renameConversation}
          onDelete={deleteConversation}
        />

        <div className="flex flex-1 flex-col">
          <ChatWindow
            messages={activeConversation?.messages ?? []}
            loading={loading}
            onSuggestionClick={handleSuggestionClick}
            onEditMessage={handleEditMessage}
            onRegenerate={handleRegenerate}
            onSpeak={handleSpeak}
            onStopSpeaking={handleStopSpeaking}
            speaking={speaking}
            voiceEnabled={voiceEnabled}
          />

          <div className="border-t-2 border-(--border-color)">
            <ChatInput
              ref={inputRef}
              onSend={sendMessage}
              onStop={stopGeneration}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
  // const exportRef = useRef<HTMLDivElement>(null);
  //   <div
  //     ref={exportRef}
  //     style={{
  //         position: "fixed",
  //         left: "-99999px",
  //         top: 0
  //     }}
  // >
  //     {/* <ExportDocument
  //         conversation={activeConversation}
  //     /> */}
  // </div>
};

export default ChatPage;
