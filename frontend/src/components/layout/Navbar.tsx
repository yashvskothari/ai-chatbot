import logo from "../../assets/logo.png";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-20
        px-8

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

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-11
              w-11
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
              className="h-20 w-20 scale-120 object-contain"
            />
          </div>

          <div>

            <h1
              className="
                text-lg
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
                text-sm
                text-(--text-primary)

                transition-colors
              "
            >
              Intelligent AI Workspace
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div
            className="
              rounded-full

              border
              border-(--border-color)

              bg-(--bg-card)

              px-4
              py-2

              text-sm
              text-(--text-primary)

              backdrop-blur-lg

              transition-all
            "
          >
            React • FastAPI • Groq
          </div>

          <ThemeToggle />

        </div>

      </div>
    </header>
  );
};

export default Navbar;