import { SignInButton } from "@clerk/clerk-react";
import { X, Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginRequiredModal = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="relative w-[92%] max-w-md rounded-3xl border border-white/10 bg-(--bg-secondary) p-8 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-2 hover:bg-white/10"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20">

          <Sparkles
            className="text-blue-400"
            size={30}
          />

        </div>

        <h2 className="text-center text-3xl font-bold text-white">

          Continue chatting

        </h2>

        <p className="mt-4 text-center leading-7 text-(--text-secondary)">

          You've reached the guest limit.

          <br />

          Sign in to continue your conversation,

          save chats and unlock all features.

        </p>

        <SignInButton mode="modal">

          <button
            className="
              mt-8

              w-full

              rounded-2xl

              bg-blue-600

              py-4

              font-semibold

              text-white

              transition-all

              hover:scale-[1.02]
              hover:bg-blue-700
            "
          >
            Continue with Login
          </button>

        </SignInButton>

      </div>

    </div>
  );
};

export default LoginRequiredModal;