import { useEffect, useRef } from "react";

export const useAutoScroll = <T,>(dependency: T) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const shouldStickToBottom = useRef(true);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const distance =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      shouldStickToBottom.current = distance < 120;
    };

    container.addEventListener("scroll", handleScroll);

    return () =>
      container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!shouldStickToBottom.current) return;

    bottomRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  }, [dependency]);

  return {
    containerRef,
    bottomRef,
  };
};