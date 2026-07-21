import { useState } from "react";
import {
  Plus,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Conversation } from "../../types/conversation";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const Sidebar = ({
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
  onDelete,
  onRename
}: SidebarProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition p-3"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Heading */}
      <div className="px-4 text-xs text-slate-400 uppercase tracking-wider">
        Conversations
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto mt-2 px-2">

        {conversations.length === 0 ? (

          <div className="px-3 py-2 text-sm text-slate-500">
            No conversations yet.
          </div>

        ) : (

          conversations.map((conversation) => (

            <div
              key={conversation.id}
              className="relative group mb-1"
            >

              {/* Conversation Button */}
              <div
                onClick={() => {
                  onSelect(conversation.id);
                  setOpenMenuId(null);
                }}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  px-3
                  py-3
                  transition
                  ${
                    activeConversationId === conversation.id
                      ? "bg-slate-700"
                      : "hover:bg-slate-800"
                  }
                `}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={18} />

                  <span className="truncate">
                    {conversation.title}
                  </span>
                </div>

                {/* Three Dots */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setOpenMenuId(
                      openMenuId === conversation.id
                        ? null
                        : conversation.id
                    );
                  }}
                  className="
                    opacity-0
                    group-hover:opacity-100
                    transition
                    rounded-md
                    p-1
                    hover:bg-slate-600
                  "
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>

              {/* Dropdown Menu */}
              {openMenuId === conversation.id && (

                <div
                  className="
                    absolute
                    right-3
                    top-14
                    z-50
                    w-40
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    shadow-2xl
                    overflow-hidden
                  "
                >

<button
  onClick={() => {
    const title = window.prompt(
      "Rename conversation",
      conversation.title
    );

    if (title && title.trim()) {
      onRename(conversation.id, title.trim());
    }

    setOpenMenuId(null);
  }}
  className="
    w-full
    flex
    items-center
    gap-3
    px-4
    py-3
    text-sm
    hover:bg-slate-800
  "
>
  <Pencil size={16} />
  Rename
</button>

             <button
  onClick={() => {
    const ok = window.confirm(
      "Delete this conversation?"
    );

    if (ok) {
      onDelete(conversation.id);
    }

    setOpenMenuId(null);
  }}
  className="
    w-full
    flex
    items-center
    gap-3
    px-4
    py-3
    text-sm
    text-red-400
    hover:bg-slate-800
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
  );
};

export default Sidebar;