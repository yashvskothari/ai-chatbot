import { useEffect, useRef, useState } from "react";

export const useAutoScroll = <T,>(dependency: T) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Whether auto-scroll is currently enabled.
  const autoScrollEnabled = useRef(true);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const distance =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      // If the user is close to the bottom,
      // enable auto-scroll again.
      const atBottom = distance < 120;

autoScrollEnabled.current = atBottom;

setShowScrollButton(!atBottom);
    };

    handleScroll();

    container.addEventListener("scroll", handleScroll);

    return () =>
      container.removeEventListener(
        "scroll",
        handleScroll,
      );
  }, []);

  useEffect(() => {
    if (!autoScrollEnabled.current) return;

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [dependency]);

  const scrollToBottom = () => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });

  autoScrollEnabled.current = true;

  setShowScrollButton(false);
};
  return {
    containerRef,
    bottomRef,
      showScrollButton,

  scrollToBottom,
  };
};