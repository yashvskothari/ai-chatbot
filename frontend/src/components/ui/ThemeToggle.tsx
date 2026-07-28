import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="
        flex
        items-center
        gap-1
        rounded-full
        border
        border-(--border-color)
        bg-(--bg-secondary)
        p-1
      "
      role="radiogroup"
      aria-label="Theme"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        onClick={() => setTheme("light")}
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${
            theme === "light"
              ? "bg-linear-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30"
              : "text-(--text-secondary) hover:bg-(--hover)"
          }
        `}
      >
        <Sun size={15} />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        onClick={() => setTheme("dark")}
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${
            theme === "dark"
              ? "bg-linear-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30"
              : "text-(--text-secondary) hover:bg-(--hover)"
          }
        `}
      >
        <Moon size={15} />
      </button>
    </div>
  );
};

export default ThemeToggle;
