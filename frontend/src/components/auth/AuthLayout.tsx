import logo from "../../assets/logo.png";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div
      className="
      relative
      flex
      min-h-screen
      items-center
      lg:items-center
      pt-6
      pb-6
      justify-center

      overflow-hidden

      bg-(--bg-primary)


      px-4
      py-8

      sm:px-6
      lg:px-8
    "
    >
      {/* Background Glow */}

      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute -right-40 bottom-0 h-105 w-105 rounded-full bg-cyan-500/20 blur-[160px]" />

      {/* Grid */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.04]

        bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
      "
      />

      <div
        className="
  relative

  flex
  flex-col

  lg:flex-row

  w-full
  max-w-6xl

  min-h-162.5
  lg:min-h-180

  max-h-[92vh]

  overflow-y-auto

  rounded-[36px]

  border
  border-(--border-color)

  bg-(--bg-card)

  backdrop-blur-3xl

  shadow-(--shadow-glow)
"
      >
        {/* Left */}

        <div
          className="
          hidden
          lg:flex

          w-1/2

          flex-col
          justify-center

          px-12
          py-10
        "
        >
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Flux AI"
              className="h-28 w-auto object-contain"
            />

            <h1
              className="
      mt-3
      text-5xl
      font-bold
      text-(--text-primary)
      text-center
    "
            >
              Flux AI
            </h1>

            <p
              className="
      mt-5
      max-w-md
      text-center
      text-lg
      leading-8
      text-(--text-secondary)
    "
            >
              Intelligent AI Workspace powered by Groq. Chat with PDFs, images,
              code and documents using one beautiful AI assistant.
            </p>
          </div>
        </div>

        {/* Right */}
        <div
          className="
  flex-1

  flex
  items-center
  justify-center

  px-6
  py-8

  sm:px-10
  sm:py-12

  lg:px-14
"
        >
          <div
            className="
    flex

    w-full
    max-w-md

    flex-col

    items-center

    text-center
    "
          >
            {/* Mobile Logo */}

            <div
              className="
      mb-8

      flex
      flex-col
      items-center

      lg:hidden
      "
            >
              <img
                src={logo}
                alt="Flux AI"
                className="
        h-20
        w-auto

        object-contain
        "
              />

              <h1
                className="
        mt-3

        text-3xl
        font-bold

        text-(--text-primary)
      "
              >
                Flux AI
              </h1>

              <p
                className="
        mt-2

        text-sm

        text-(--text-secondary)
      "
              >
                Intelligent AI Workspace
              </p>
            </div>

            <h2
              className="
      text-3xl

      font-bold

      text-(--text-primary)
    "
            >
              {title}
            </h2>

            <p
              className="
      mt-3
      mb-8

      max-w-sm

      text-base

      leading-7

      text-(--text-secondary)
    "
            >
              {subtitle}
            </p>

            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
