import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

const ChatPage = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />

        <div className="flex flex-col flex-1">

          <ChatWindow />

          <ChatInput />

        </div>

      </div>

    </div>
  );
};

export default ChatPage;