import { Check, X } from "lucide-react";

const rows = [
  {
    feature: "Multiple AI Models",
    normal: false,
    flux: true,
  },
  {
    feature: "Chat with PDFs",
    normal: false,
    flux: true,
  },
  {
    feature: "Image Understanding",
    normal: false,
    flux: true,
  },
  {
    feature: "Voice Conversations",
    normal: false,
    flux: true,
  },
  {
    feature: "Export as Markdown",
    normal: false,
    flux: true,
  },
  {
    feature: "Export as PDF",
    normal: false,
    flux: true,
  },
  {
    feature: "Beautiful Modern UI",
    normal: false,
    flux: true,
  },
  {
    feature: "Authentication",
    normal: false,
    flux: true,
  },
];

export default function Comparison() {
  return (
    <section className="bg-(--bg-primary) py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            Why Flux AI?
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
            Built for a modern AI experience
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Flux AI combines powerful capabilities into one beautiful workspace
            instead of making you use multiple tools.
          </p>

        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <div className="grid grid-cols-3 bg-white/5">

            <div className="p-6 text-white font-semibold">
              Feature
            </div>

            <div className="p-6 text-center font-semibold text-slate-400">
              Traditional AI
            </div>

            <div className="p-6 text-center font-semibold text-blue-400">
              Flux AI
            </div>

          </div>

          {rows.map((row) => (

            <div
              key={row.feature}
              className="grid grid-cols-3 border-t border-white/10 hover:bg-white/5 transition-all"
            >

              <div className="p-6 text-white">
                {row.feature}
              </div>

              <div className="flex items-center justify-center">

                {row.normal ? (
                  <Check className="text-green-500" size={20} />
                ) : (
                  <X className="text-red-500" size={20} />
                )}

              </div>

              <div className="flex items-center justify-center">

                {row.flux ? (
                  <Check className="text-green-500" size={20} />
                ) : (
                  <X className="text-red-500" size={20} />
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
