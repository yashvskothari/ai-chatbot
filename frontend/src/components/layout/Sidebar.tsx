import { useEffect, useState } from "react";
import {
  Plus,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Conversation } from "../../types/conversation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;

  conversations: Conversation[];
  activeConversationId: string | null;

  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const Sidebar = ({
  open,
  onClose,
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
}: SidebarProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="
        fixed
        inset-0

        z-40

        bg-black/40

        backdrop-blur-sm

        md:hidden
      "
        />
      )}

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

      transition-all
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
              onClose();
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

        {/* Heading */}

        <div
          className="
          px-4
          pb-2

          text-xs
          uppercase
          tracking-widest

          text-(--text-primary)
        "
        >
          Conversations
        </div>

        {/* Conversation List */}

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {conversations.length === 0 ? (
            <div
              className="
              rounded-xl
              p-4
              text-center
              text-sm

              text-(--text-secondary)
            "
            >
              No conversations yet.
            </div>
          ) : (
            conversations.map((conversation) => (
              <div key={conversation.id} className="relative mb-2">
                <button
                  onClick={() => {
                    onSelect(conversation.id);
                    onClose();
                  }}
                  className={`
                  group
                  cursor-pointer
                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-2xl

                  px-4
                  py-3

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

                    rounded-2xl

                    border
                    border-(--border-color)

                    bg-(--bg-card)

                    shadow-2xl

                    backdrop-blur-xl
                  "
                  >
                    <button
                      onClick={() => {
                        const title = prompt(
                          "Rename conversation",
                          conversation.title,
                        );
                        if (title?.trim()) {
                          onRename(conversation.id, title.trim());
                          onClose();
                        }

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
                        if (confirm("Delete this conversation?")) {
                          onDelete(conversation.id);
                          onClose();
                        }

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
      </aside>
    </>
  );
};

export default Sidebar;
