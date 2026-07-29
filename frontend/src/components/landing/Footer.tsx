import {
  FolderGit2,
  Link,
  Mail,
  Heart,
  ArrowUpRight,
} from "lucide-react";

import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-(--bg-primary)">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  bg-linear-to-br
                  from-blue-600
                  via-indigo-600
                  to-cyan-500
                "
              >
                <img
                  src={logo}
                  alt="Flux AI"
                  className="h-16 w-16 object-contain"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-(--text-primary)">
                  Flux AI
                </h2>

                <p className="text-sm text-(--text-secondary)">
                  Intelligent AI Workspace
                </p>

              </div>

            </div>

            <p className="mt-6 max-w-sm leading-7 text-(--text-secondary)">
              A modern AI workspace combining document intelligence,
              voice interaction, image understanding and powerful
              language models into one beautiful experience.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-(--text-primary)">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <a
                href="/"
                className="text-slate-400 transition hover:text-(--text-secondary)"
              >
                Home
              </a>

              <a
                href="/chat"
                className="text-slate-400 transition hover:text-(--text-secondary)"
              >
                Chat
              </a>

              <a
                href="/sign-in"
                className="text-slate-400 transition hover:text-(--text-secondary)"
              >
                Login
              </a>

              <a
                href="/sign-up"
                className="text-slate-400 transition hover:text-(--text-secondary)"
              >
                Register
              </a>

            </div>

          </div>

          {/* Connect */}

          <div>

            <h3 className="mb-6 text-lg font-semibold text-(--text-primary)">
              Connect
            </h3>

            <div className="flex flex-col gap-5">

              <a
                href="https://github.com/yashvskothari"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-slate-400 transition hover:text-(--text-secondary)"
              >
                <FolderGit2 size={18} />

                GitHub

                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://linkedin.com/in/yashvskothari"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-slate-400 transition hover:text-(--text-secondary)"
              >
                <Link size={18} />

                LinkedIn

                <ArrowUpRight size={16} />
              </a>

              <a
                href="mailto:your@email.com"
                className="flex items-center gap-3 text-slate-400 transition hover:text-(--text-secondary)"
              >
                <Mail size={18} />

                Contact
              </a>

            </div>

          </div>

        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-5 text-center text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Flux AI.
            All rights reserved.
          </p>

          <p className="flex items-center gap-2">

            Built with

            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />

            using React, TypeScript & FastAPI

          </p>

        </div>

      </div>

    </footer>
  );
}