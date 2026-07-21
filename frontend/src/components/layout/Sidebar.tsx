import { Plus, MessageSquare } from "lucide-react";

import type { Conversation } from "../../types/conversation";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

const Sidebar = ({
  conversations,
  activeConversationId,
  onSelect,
  onNewChat,
}: SidebarProps) => {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition p-3"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Section Heading */}
      <div className="px-4 text-xs text-slate-400 uppercase tracking-wider">
        Conversations
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto mt-2 px-2">

        {conversations.length === 0 ? (

          <div className="px-3 py-2 text-sm text-slate-500">
            No conversations yet.
          </div>

        ) : (

          conversations.map((conversation) => (

            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={`
                w-full
                text-left
                flex
                items-center
                gap-3
                rounded-lg
                p-3
                transition
                mb-1
                ${
                  activeConversationId === conversation.id
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }
              `}
            >
              <MessageSquare size={18} />

              <span className="truncate">
                {conversation.title}
              </span>

            </button>

          ))

        )}

      </div>

    </aside>
  );
};

export default Sidebar;