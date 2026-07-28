import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-(--bg-secondary) py-28">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[150px]" />

        <div className="absolute right-30 top-30 h-75 w-75 rounded-full bg-cyan-500/15 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-5xl px-6">

        <div
          className="
            rounded-4xl

            border
            border-white/10

            bg-white/5

            px-8
            py-20

            text-center

            backdrop-blur-2xl

            shadow-2xl
            shadow-blue-500/10
          "
        >

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Ready to start?
          </span>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-6xl">
            Experience the future
            <br />
            of AI conversations
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Chat with powerful AI models, upload documents,
            analyze images, use voice interaction,
            and export conversations —
            all from one modern workspace.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <Link
              to="/chat"
              className="
                group

                inline-flex
                items-center
                gap-3

                rounded-2xl

                bg-blue-600

                px-8
                py-4

                font-semibold
                text-white

                transition-all
                duration-300

                hover:scale-105
                hover:bg-blue-700
              "
            >
              Start Chatting

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              to="/sign-in"
              className="
                rounded-2xl

                border
                border-white/10

                bg-white/5

                px-8
                py-4

                font-medium
                text-white

                transition-all

                hover:border-blue-500/30
                hover:bg-blue-500/10
              "
            >
              Login
            </Link>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-slate-500">

            <span>✓ Fast</span>

            <span>✓ Secure</span>

            <span>✓ Responsive</span>

            <span>✓ Free to Try</span>

          </div>

        </div>

      </div>

    </section>
  );
}