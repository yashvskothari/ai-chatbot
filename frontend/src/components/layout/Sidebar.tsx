import { useEffect, useState, useRef } from "react";
import {
  Download,
  ChevronDown,
  ChevronRight,
  Cpu,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  MessageSquare,
  Search,
  FileDown,
  FileText,
  Volume2,
  Settings as SettingsIcon,
} from "lucide-react";

import { useVoice } from "../../hooks/useVoice";
import { useModel } from "../../hooks/useModel";
import { MODELS } from "../../constants/models";
import ThemeToggle from "../ui/ThemeToggle";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { Conversation } from "../../types/conversation";
import RenameModal from "../ui/RenameModal";
import DeleteModal from "../ui/DeleteModal";

interface SidebarProps {
  

  conversations: Conversation[];
  activeConversationId: string | null;
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  // onMenuClick: () => void;
  onExportMarkdown?: () => void;
  onExportPDF?: () => void;
  exportDisabled?: boolean;

  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

const Sidebar = ({
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  open,
  onClose,
  onExportMarkdown,
  onExportPDF,
  exportDisabled,

  voiceEnabled,
  onToggleVoice,
}: SidebarProps) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [renameValue, setRenameValue] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const voiceRef = useRef<HTMLDivElement>(null);
  useClickOutside(voiceRef, () => setVoiceOpen(false));

  const modelRef = useRef<HTMLDivElement>(null);
  useClickOutside(modelRef, () => setModelOpen(false));

  const exportRef = useRef<HTMLDivElement>(null);
  useClickOutside(exportRef, () => setExportOpen(false));

  const { selectedModel, setSelectedModel } = useModel();
  const { voices, selectedVoice, setSelectedVoice } = useVoice();

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const filteredConversations = conversations.filter((conversation) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    if (conversation.title.toLowerCase().includes(query)) return true;
    return conversation.messages.some((message) =>
      message.content.toLowerCase().includes(query),
    );
  });

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Mobile backdrop - tap to close */}
      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className={`
          fixed
          inset-0
          z-40
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-300
          md:hidden
        `}
        />
      )}

                {/* <button
            onClick={onMenuClick}
            className="
              flex
              md:hidden

              h-10
              w-10

              items-center
              justify-center

              rounded-xl

              border
              border-(--border-color)

              bg-(--bg-card)

              text-(--text-primary)

              transition-all
              duration-300

              hover:bg-blue-500/10
            "
          >
            <Menu size={22} />
          </button> */}

      <aside
        className={`
      fixed
      inset-y-0
      left-0
      z-50
      w-60
      flex
      flex-col
      border-r
      border-(--border-color)
      bg-(--bg-secondary)
      transition-transform
      duration-300

      ${open ? "translate-x-0" : "-translate-x-full"}
      md:relative
      md:translate-x-0
    `}
      >


        {/* New Chat */}
        <div className="p-4">
          <button
            onClick={() => {
              onNewChat();
              // onClose();
            }}
            className="
            cursor-pointer
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-linear-to-r
            from-blue-600
            to-cyan-500
            px-4
            py-3
            font-medium
            text-black
            shadow-lg
            shadow-blue-500/20
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-blue-500/40
          "
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div
            className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-(--border-color)
      bg-(--bg-card)
      px-3
      py-2.5
      transition-all
      duration-300
      focus-within:border-blue-500/40
      focus-within:shadow-(--shadow-soft)
    "
          >
            <Search size={16} className="text-(--text-secondary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="
        w-full
        bg-transparent
        text-sm
        text-(--text-primary)
        placeholder:text-(--text-secondary)
        outline-none
      "
            />
          </div>
        </div>
        <hr className="mx-4 mb-4 border-(--border-color)" />

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredConversations.length === 0 ? (
            <div
              className="
              rounded-xl
              p-4
              text-center
              text-sm
              text-(--text-secondary)
            "
            >
              {searchQuery
                ? "No matching conversations found."
                : "No conversations yet."}
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div key={conversation.id} className="relative mb-2">
                <button
                  onClick={() => {
                    onSelect(conversation.id);
                    // onClose();
                  }}
                  className={`
                  group
                  cursor-pointer
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-2xl
                  px-3
                  py-2.5
                  transition-all
                  duration-300
                  ${
                    activeConversationId === conversation.id
                      ? "bg-(--bg-card) shadow-(--shadow-soft)"
                      : "hover:bg-(--bg-card)"
                  }
                `}
                >
                  <MessageSquare size={18} className="text-blue-500 shrink-0" />
                  <span
                    className="
                    flex-1
                    truncate
                    text-left
                    text-(--text-primary)
                  "
                  >
                    {conversation.title}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === conversation.id ? null : conversation.id,
                      );
                    }}
                    className="
  cursor-pointer
  rounded-lg
  p-1.5
  text-(--text-secondary)
  transition-all
  duration-200
  group-hover:opacity-100
  hover:bg-(--hover)
  hover:text-(--text-primary)
"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </button>

                {/* Menu */}
                {openMenuId === conversation.id && (
                  <div
                    className="
                    absolute
                    right-2
                    top-14
                    z-50
                    w-40
                    overflow-hidden
                    rounded-xl
                    border
                    border-(--border-color)
                    bg-(--bg-card)
                    shadow-2xl
                    backdrop-blur-xl
                  "
                  >
                    <button
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setRenameValue(conversation.title);
                        setRenameOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-(--text-primary)
                      transition
                      hover:bg-black/10
                      dark:hover:bg-white/10
                    "
                    >
                      <Pencil size={16} />
                      Rename
                    </button>

                    <button
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setDeleteOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-red-500
                      transition
                      hover:bg-red-500/10
                    "
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* ================= BOTTOM SETTINGS (pinned to bottom, collapsible) ================= */}
        <div className="mt-auto border-t border-(--border-color) p-3">
          {/* Toggle button */}
          <button
            onClick={() => setSettingsOpen((v) => !v)}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-between
              rounded-xl
              bg-(--bg-card)
              px-3
              py-3
              text-sm
              text-(--text-primary)
              transition-all
              duration-300
              hover:bg-(--hover)
            "
          >
            <span className="flex items-center gap-2 font-medium">
              <SettingsIcon size={16} />
              Settings
            </span>
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${
                settingsOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Collapsible panel */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ${settingsOpen ? "mt-3 max-h-150 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="space-y-3">
              {/* App info */}
              <div
                className="
                  rounded-xl
                  bg-(--bg-card)
                  px-3
                  py-3
                  text-xs
                  text-(--text-secondary)
                "
              >
                <div className="font-medium text-(--text-primary)">Flux AI</div>
                <div className="mt-1">Version 1.0</div>
              </div>

              {/* Model selector */}
              <div className="relative" ref={modelRef}>
                <button
                  onClick={() => setModelOpen(!modelOpen)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-2
                    rounded-xl
                    border
                    border-(--border-color)
                    bg-(--bg-card)
                    px-4
                    py-2.5
                    text-sm
                    text-(--text-primary)
                    transition-all
                    hover:border-blue-500/40
                  "
                >
                  <span className="flex items-center gap-2 truncate">
                    <Cpu size={16} className="shrink-0" />
                    <span className="truncate">{selectedModel.name}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition ${modelOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {modelOpen && (
                  <div
                    className="
                      absolute
                      bottom-full
                      left-0
                      right-0
                      mb-2
                      max-h-64
                      overflow-y-auto
                      rounded-2xl
                      border
                      border-(--border-color)
                      bg-(--bg-card)
                      shadow-2xl
                      backdrop-blur-xl
                      z-50
                    "
                  >
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setModelOpen(false);
                        }}
                        className={`
                          w-full
                          px-4
                          py-3
                          text-left
                          transition-all
                          hover:bg-blue-500/10
                          ${selectedModel.id === model.id ? "bg-blue-500/10" : ""}
                        `}
                      >
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-(--text-secondary)">
                          {model.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Export */}
              {(onExportMarkdown || onExportPDF) && (
                <div className="relative" ref={exportRef}>
                  <button
                    onClick={() => setExportOpen((v) => !v)}
                    disabled={exportDisabled}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-2
                      rounded-xl
                      border
                      border-(--border-color)
                      bg-(--bg-card)
                      px-4
                      py-2.5
                      text-sm
                      text-(--text-primary)
                      transition-all
                      duration-300
                      hover:bg-blue-500/10
                      disabled:opacity-40
                      disabled:pointer-events-none
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Download size={16} />
                      Export
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition ${exportOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {exportOpen && (
                    <div
                      className="
                        absolute
                        bottom-full
                        left-0
                        right-0
                        mb-2
                        overflow-hidden
                        rounded-2xl
                        border
                        border-(--border-color)
                        bg-(--bg-card)
                        shadow-2xl
                        backdrop-blur-xl
                        z-50
                      "
                    >
                      <button
                        onClick={() => {
                          onExportMarkdown?.();
                          setExportOpen(false);
                        }}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-4
                          py-3
                          text-sm
                          text-(--text-primary)
                          transition
                          hover:bg-black/10
                          dark:hover:bg-white/10
                        "
                      >
                        <FileText size={16} />
                        Export as Markdown
                      </button>

                      <button
                        onClick={() => {
                          onExportPDF?.();
                          setExportOpen(false);
                        }}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-4
                          py-3
                          text-sm
                          text-(--text-primary)
                          transition
                          hover:bg-black/10
                          dark:hover:bg-white/10
                        "
                      >
                        <FileDown size={16} />
                        Export as PDF
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Voice toggle */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-(--border-color)
                  bg-(--bg-card)
                  px-4
                  py-2.5
                "
              >
                <span className="flex items-center gap-2 text-sm text-(--text-primary)">
                  <Volume2
                    size={18}
                    className={
                      voiceEnabled ? "text-blue-500" : "text-slate-400"
                    }
                  />
                  Voice
                </span>

                <button
                  onClick={onToggleVoice}
                  className={`
                    relative
                    h-6
                    w-11
                    rounded-full
                    transition-all
                    duration-300
                    ${voiceEnabled ? "bg-blue-600" : "bg-slate-400"}
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-0.5
                      left-0.5
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      transition-all
                      duration-300
                      ${voiceEnabled ? "translate-x-5" : ""}
                    `}
                  />
                </button>
              </div>

              {/* Voice selector */}
              <div className="relative" ref={voiceRef}>
                <button
                  onClick={() => setVoiceOpen((v) => !v)}
                  disabled={!voiceEnabled}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-2
                    rounded-xl
                    border
                    border-(--border-color)
                    bg-(--bg-secondary)
                    px-4
                    py-2.5
                    text-sm
                    text-(--text-primary)
                    transition-all
                    hover:bg-blue-500/10
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <span className="truncate">
                    {selectedVoice?.name ?? "Select Voice"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition ${voiceOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {voiceOpen && (
                  <div
                    className="
                      absolute
                      bottom-full
                      left-0
                      right-0
                      mb-2
                      max-h-64
                      overflow-y-auto
                      rounded-2xl
                      border
                      border-(--border-color)
                      bg-(--bg-card)
                      shadow-2xl
                      backdrop-blur-xl
                      z-50
                    "
                  >
                    {voices.map((voice) => (
                      <button
                        key={voice.name}
                        onClick={() => {
                          setSelectedVoice(voice);
                          setVoiceOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-all hover:bg-blue-500/10
                          ${selectedVoice?.name === voice.name ? "bg-blue-500/10" : ""}
                        `}
                      >
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-xs text-(--text-secondary)">
                          {voice.lang}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-(--border-color)
                  bg-(--bg-card)
                  px-4
                  py-2.5
                "
              >
                <span className="text-sm text-(--text-primary)">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <RenameModal
        open={renameOpen}
        value={renameValue}
        onChange={setRenameValue}
        onClose={() => setRenameOpen(false)}
        onSave={() => {
          if (!selectedConversation) return;
          if (renameValue.trim()) {
            onRename(selectedConversation.id, renameValue.trim());
          }
          setRenameOpen(false);
        }}
      />

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={() => {
          if (!selectedConversation) return;
          onDelete(selectedConversation.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
};

export default Sidebar;
