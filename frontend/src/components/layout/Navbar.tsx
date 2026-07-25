import { useRef, useState } from "react";
import {
  Menu,
  Download,
  FileText,
  FileDown,
  ChevronDown,
  Cpu,
  Volume2,
} from "lucide-react";

import { VOICES } from "../../constants/voices";
import { useModel } from "../../hooks/useModel";
import { MODELS } from "../../constants/models";
import logo from "../../assets/logo.png";
import ThemeToggle from "../ui/ThemeToggle";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { VoiceOption } from "../../constants/voices";

interface NavbarProps {
  onMenuClick: () => void;
  onExportMarkdown?: () => void;
  onExportPDF?: () => void;
  exportDisabled?: boolean;

  voiceEnabled: boolean;
  onToggleVoice: () => void;

  selectedVoice: VoiceOption;
  onVoiceChange: (voice: VoiceOption) => void;
}

const Navbar = ({
  onMenuClick,
  onExportMarkdown,
  onExportPDF,
  exportDisabled,

  voiceEnabled,
  onToggleVoice,

  selectedVoice,
  onVoiceChange,
}: NavbarProps) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const voiceRef = useRef<HTMLDivElement>(null);

  useClickOutside(voiceRef, () => setVoiceOpen(false));

  const modelRef = useRef<HTMLDivElement>(null);

  const { selectedModel, setSelectedModel } = useModel();
  useClickOutside(modelRef, () => setModelOpen(false));
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
          <div className="relative hidden md:block" ref={modelRef}>
            <button
              onClick={() => setModelOpen(!modelOpen)}
              className="
      flex
      items-center
      gap-2

      rounded-full

      border
      border-(--border-color)

      bg-(--bg-card)

      px-4
      py-2

      text-sm

      text-(--text-primary)

      transition-all

      hover:border-blue-500/40
    "
            >
              <Cpu size={16} />

              {selectedModel.name}

              <ChevronDown
                size={16}
                className={`transition ${modelOpen ? "rotate-180" : ""}`}
              />
            </button>

            {modelOpen && (
              <div
                className="
        absolute
        right-0
        mt-2

        w-72

        overflow-hidden

        rounded-2xl

        border
        border-(--border-color)

        bg-(--bg-card)

        shadow-2xl

        backdrop-blur-xl

        z-50
      "
              >
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      setModelOpen(false);
                    }}
                    className={`
            w-full

            px-4
            py-3

            text-left

            transition-all

            hover:bg-blue-500/10

            ${selectedModel.id === model.id ? "bg-blue-500/10" : ""}
          `}
                  >
                    <div className="font-medium">{model.name}</div>

                    <div
                      className="
              text-xs

              text-(--text-secondary)
            "
                    >
                      {model.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
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

          <div
            className="
    hidden
    md:flex

    items-center
    gap-3

    rounded-full

    border
    border-(--border-color)

    bg-(--bg-card)

    px-4
    py-2
  "
          >
            <Volume2
              size={18}
              className={voiceEnabled ? "text-blue-500" : "text-slate-400"}
            />

            <span
              className="
      text-sm
      text-(--text-primary)
    "
            >
              Voice
            </span>

            <button
              onClick={onToggleVoice}
              className={`
      relative

      h-6
      w-11

      rounded-full

      transition-all
      duration-300

      ${voiceEnabled ? "bg-blue-600" : "bg-slate-400"}
    `}
            >
              <span
                className={`
        absolute

        top-0.5
        left-0.5

        h-5
        w-5

        rounded-full

        bg-white

        transition-all
        duration-300

        ${voiceEnabled ? "translate-x-5" : ""}
      `}
              />
            </button>
            
          </div>
          <div className="relative ml-2" ref={voiceRef}>
  <button
    onClick={() => setVoiceOpen((v) => !v)}
    disabled={!voiceEnabled}
    className="
      flex
      items-center
      gap-2

      rounded-lg

      border
      border-(--border-color)

      bg-(--bg-secondary)

      px-3
      py-1.5

      text-sm

      transition-all

      hover:bg-blue-500/10

      disabled:opacity-50
      disabled:cursor-not-allowed
    "
  >
    {selectedVoice.name}

    <ChevronDown
      size={15}
      className={`transition ${voiceOpen ? "rotate-180" : ""}`}
    />
  </button>

  {voiceOpen && (
    <div
      className="
        absolute

        right-0
        top-11

        z-50

        w-52

        overflow-hidden

        rounded-xl

        border
        border-(--border-color)

        bg-(--bg-card)

        shadow-xl
      "
    >
      {VOICES.map((voice) => (
        <button
          key={voice.id}
          onClick={() => {
            onVoiceChange(voice);
            setVoiceOpen(false);
          }}
          className="
            flex

            w-full

            items-center

            justify-between

            px-4
            py-3

            text-left

            hover:bg-blue-500/10

            transition
          "
        >
          <div>
            <div>{voice.name}</div>

            <div className="text-xs text-slate-400">
              {voice.gender}
            </div>
          </div>

          {selectedVoice.id === voice.id && (
            <span className="text-blue-500">✓</span>
          )}
        </button>
      ))}
    </div>
  )}
</div>
          
          <div className="shrink-0">
            
            <ThemeToggle />
            
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
