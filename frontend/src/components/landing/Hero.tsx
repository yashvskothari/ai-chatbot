import {
  ArrowRight,
  FolderGit2,
  Bot,
  FileText,
  Mic,
  Download,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Multiple AI Models",
    desc: "Switch between powerful models instantly.",
  },
  {
    icon: FileText,
    title: "Document Chat",
    desc: "Upload PDFs and chat with your documents.",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    desc: "Talk naturally with AI using speech.",
  },
  {
    icon: Download,
    title: "Export Chats",
    desc: "Download conversations as Markdown or PDF.",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-(--bg-primary)">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-37.5 top-30 h-105 w-105 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-37.5 bottom-37.5 h-112.5 w-112.5 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />

      </div>

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.03]">

        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">

        <div className="w-full">

          {/* Badge */}

          <div className="mb-8 flex justify-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">

              <Sparkles size={16} />

              Modern AI Workspace

            </div>

          </div>

          {/* Heading */}

          <h1 className="mx-auto max-w-5xl text-center text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">

            Meet{" "}

            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">

              Flux AI

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-slate-300 sm:text-xl">

            An intelligent AI workspace built for conversations, document
            understanding, image analysis, voice interaction, and seamless
            productivity — all in one beautiful interface.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <a
              href="/chat"
              className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Get Started

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </a>

            <a
              href="https://github.com/yashvskothari"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-(--border-color) bg-(--bg-card) px-8 py-4 text-white transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10"
            >
              <FolderGit2 size={18} />

              View Source

            </a>

          </div>
                    {/* Floating Cards */}

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group

                    relative

                    overflow-hidden

                    rounded-3xl

                    border
                    border-white/10

                    bg-white/5

                    p-6

                    backdrop-blur-xl

                    transition-all
                    duration-500

                    hover:-translate-y-2
                    hover:border-blue-500/40
                    hover:bg-white/10
                    hover:shadow-2xl
                    hover:shadow-blue-500/20
                  "
                >
                  <div
                    className="
                      absolute

                      inset-0

                      opacity-0

                      transition-opacity
                      duration-500

                      group-hover:opacity-100

                      bg-linear-to-br
                      from-blue-500/10
                      via-cyan-500/5
                      to-indigo-500/10
                    "
                  />

                  <div className="relative">

                    <div
                      className="
                        mb-5

                        flex
                        h-14
                        w-14

                        items-center
                        justify-center

                        rounded-2xl

                        bg-linear-to-br
                        from-blue-600
                        to-cyan-500

                        text-white

                        shadow-lg
                        shadow-blue-500/20
                      "
                    >
                      <Icon size={26} />
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {feature.desc}
                    </p>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Stats */}

          <div className="mt-20 flex flex-wrap items-center justify-center gap-10">

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">4+</h3>
              <p className="mt-2 text-sm text-slate-400">
                AI Features
              </p>
            </div>

            <div className="hidden h-10 w-px bg-white/10 md:block" />

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">100%</h3>
              <p className="mt-2 text-sm text-slate-400">
                Responsive
              </p>
            </div>

            <div className="hidden h-10 w-px bg-white/10 md:block" />

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">FastAPI</h3>
              <p className="mt-2 text-sm text-slate-400">
                Backend
              </p>
            </div>

            <div className="hidden h-10 w-px bg-white/10 md:block" />

            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">React</h3>
              <p className="mt-2 text-sm text-slate-400">
                Frontend
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;