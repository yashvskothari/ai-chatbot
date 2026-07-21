const ChatInput = () => {
  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none"
      />
    </div>
  );
};

export default ChatInput;