import { useState, useEffect, useRef } from "react";

import {
  Sun,
  Moon,
  Monitor,
  ChevronDown,
} from "lucide-react";

import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const currentIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={18} />;
      case "dark":
        return <Moon size={18} />;
      default:
        return <Monitor size={18} />;
    }
  };

  const optionClass = `
    cursor-pointer
    flex
    w-full
    items-center
    gap-3

    px-4
    py-3

    text-[var(--text-primary)]

    transition-all
    duration-200

    hover:bg-blue-500/10
    hover:text-blue-500
  `;

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* Toggle */}

      <button
        onClick={() => setOpen(!open)}
        className="
        cursor-pointer
          flex
          items-center
          gap-2

          rounded-2xl

          border
          border-(--border-color)

          bg-(--bg-card)

          px-4
          py-2

          text-(--text-primary)

          backdrop-blur-xl

          shadow-(--shadow-soft)

          transition-all
          duration-300

          hover:shadow-(--shadow-glow)
          hover:border-blue-500/30
        "
      >
        {currentIcon()}

        <ChevronDown
          size={16}
          className={`
            transition-transform
            duration-300

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Menu */}

      {open && (

        <div
          className="
            absolute
            right-0
            mt-3

            w-44

            overflow-hidden

            rounded-2xl

            border
            border-(--border-color)

            bg-(--bg-card)

            backdrop-blur-2xl

            shadow-2xl

            z-50
          "
        >

          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className={optionClass}
          >
            <Sun size={18} />

            <span className="flex-1 text-left">
              Light
            </span>

            {theme === "light" && "✓"}
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className={optionClass}
          >
            <Moon size={18} />

            <span className="flex-1 text-left">
              Dark
            </span>

            {theme === "dark" && "✓"}
          </button>

          <button
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className={optionClass}
          >
            <Monitor size={18} />

            <span className="flex-1 text-left">
              System
            </span>

            {theme === "system" && "✓"}
          </button>

        </div>

      )}

    </div>
  );
};

export default ThemeToggle;