import {
  Bot,
  FileText,
  Image,
  Mic,
  Download,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Multiple AI Models",
    description:
      "Switch between powerful AI models instantly to get the best response for every task.",
  },
  {
    icon: FileText,
    title: "Document Understanding",
    description:
      "Upload PDFs and chat naturally with your documents using contextual AI.",
  },
  {
    icon: Image,
    title: "Image Analysis",
    description:
      "Upload screenshots, diagrams and photos to receive detailed AI explanations.",
  },
  {
    icon: Mic,
    title: "Voice Conversations",
    description:
      "Talk with Flux AI using natural speech and receive voice responses.",
  },
  {
    icon: Download,
    title: "Export Conversations",
    description:
      "Download chats as Markdown or PDF for notes, reports and documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Authentication powered by Clerk with secure sessions and user management.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-(--bg-secondary) py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Everything you need in
            <span className="text-blue-400"> one AI workspace</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Flux AI combines modern AI capabilities with a beautiful interface,
            making conversations faster, smarter and more productive.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group

                  rounded-3xl

                  border
                  border-white/10

                  bg-white/5

                  p-8

                  backdrop-blur-xl

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:border-blue-500/30
                  hover:shadow-xl
                  hover:shadow-blue-500/10
                "
              >
                <div
                  className="
                    mb-6

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
                  "
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}