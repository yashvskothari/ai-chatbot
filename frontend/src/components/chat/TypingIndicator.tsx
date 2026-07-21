const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-700 rounded-2xl px-5 py-3 flex gap-2">
        <span className="animate-bounce">•</span>
        <span
          className="animate-bounce"
          style={{ animationDelay: "0.15s" }}
        >
          •
        </span>
        <span
          className="animate-bounce"
          style={{ animationDelay: "0.3s" }}
        >
          •
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;