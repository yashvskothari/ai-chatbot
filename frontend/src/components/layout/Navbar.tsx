import { useRef, useState } from "react";
import { Menu, Download, FileText, FileDown } from "lucide-react";

import logo from "../../assets/logo.png";
import ThemeToggle from "../ui/ThemeToggle";
import { useClickOutside } from "../../hooks/useClickOutside";

interface NavbarProps {
  onMenuClick: () => void;
  onExportMarkdown?: () => void;
  onExportPDF?: () => void;
  exportDisabled?: boolean;
}

const Navbar = ({
  onMenuClick,
  onExportMarkdown,
  onExportPDF,
  exportDisabled,
}: NavbarProps) => {
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useClickOutside(exportRef, () => setExportOpen(false));
  return (
    <header
      className="
        sticky
        top-0
        z-50

        h-16
        lg:h-18

        px-4
        sm:px-6
        lg:px-8

        border-b
        border-(--border-color)

        bg-(--bg-secondary)/80

        backdrop-blur-2xl

        transition-all
        duration-300
      "
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">

        {/* Left */}

        <div
          className="
            flex
            items-center

            gap-2
            sm:gap-3
            lg:gap-4
          "
        >

          {/* Mobile Hamburger */}

          <button
            onClick={onMenuClick}
            className="
              flex
              md:hidden

              h-10
              w-10

              items-center
              justify-center

              rounded-xl

              border
              border-(--border-color)

              bg-(--bg-card)

              text-(--text-primary)

              transition-all
              duration-300

              hover:bg-blue-500/10
            "
          >
            <Menu size={22} />
          </button>

          {/* Logo */}

          <div
            className="
              flex

              h-9
              w-9

              sm:h-10
              sm:w-10

              lg:h-11
              lg:w-11

              items-center
              justify-center

              rounded-2xl

              bg-linear-to-br
              from-blue-600
              via-indigo-600
              to-cyan-500

              shadow-lg
              shadow-blue-500/20
            "
          >
            <img
              src={logo}
              alt="Flux AI"
              className="
                h-16
                w-16

                sm:h-18
                sm:w-18

                lg:h-20
                lg:w-20

                object-contain
                scale-110
              "
            />
          </div>

          <div>
            <h1
              className="
                text-lg
                sm:text-xl
                lg:text-2xl

                font-semibold
                tracking-wide

                text-(--text-primary)

                transition-colors
              "
            >
              Flux AI
            </h1>

            <p
              className="
                hidden
                sm:block

                text-xs
                lg:text-sm

                text-(--text-primary)

                transition-colors
              "
            >
              Intelligent AI Workspace
            </p>
          </div>
        </div>

        {/* Right */}

        <div
          className="
            flex
            items-center

            gap-2
            sm:gap-3
            lg:gap-4
          "
        >
          <div
            className="
              hidden
              md:flex

              rounded-full

              border
              border-(--border-color)

              bg-(--bg-card)

              px-3
              lg:px-4

              py-2

              text-sm
              text-(--text-primary)

              backdrop-blur-lg

              transition-all
            "
          >
            React • FastAPI • Groq
          </div>

          {(onExportMarkdown || onExportPDF) && (
            <div className="relative shrink-0" ref={exportRef}>
              <button
                onClick={() => setExportOpen((v) => !v)}
                disabled={exportDisabled}
                className="
                  flex
                  h-10
                  w-10

                  sm:h-11
                  sm:w-11

                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-(--border-color)

                  bg-(--bg-card)

                  text-(--text-primary)

                  transition-all
                  duration-300

                  hover:bg-blue-500/10

                  disabled:opacity-40
                  disabled:pointer-events-none
                "
                aria-label="Export conversation"
              >
                <Download size={18} />
              </button>

              {exportOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-13

                    z-50

                    w-48

                    overflow-hidden

                    rounded-2xl

                    border
                    border-(--border-color)

                    bg-(--bg-card)

                    shadow-2xl

                    backdrop-blur-xl
                  "
                >
                  <button
                    onClick={() => {
                      onExportMarkdown?.();
                      setExportOpen(false);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3

                      px-4
                      py-3

                      text-sm
                      text-(--text-primary)

                      transition

                      hover:bg-black/10
                      dark:hover:bg-white/10
                    "
                  >
                    <FileText size={16} />
                    Export as Markdown
                  </button>

                  <button
                    onClick={() => {
                      onExportPDF?.();
                      setExportOpen(false);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3

                      px-4
                      py-3

                      text-sm
                      text-(--text-primary)

                      transition

                      hover:bg-black/10
                      dark:hover:bg-white/10
                    "
                  >
                    <FileDown size={16} />
                    Export as PDF
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;