const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div
        className="
          flex
          gap-2

          rounded-2xl

          border
          border-(--border-color)

          bg-(--bg-card)

          px-5
          py-3
        "
      >
        <span className="animate-bounce text-(--text-secondary)">•</span>
        <span
          className="animate-bounce text-(--text-secondary)"
          style={{ animationDelay: "0.15s" }}
        >
          •
        </span>
        <span
          className="animate-bounce text-(--text-secondary)"
          style={{ animationDelay: "0.3s" }}
        >
          •
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;
