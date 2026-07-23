import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({
  open,
  title,
  children,
  onClose,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-999

        flex
        items-center
        justify-center

        bg-black/50

        backdrop-blur-sm

        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md

          rounded-3xl

          border
          border-(--border-color)

          bg-(--bg-card)

          shadow-2xl

          backdrop-blur-xl

          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-(--border-color)

            px-6
            py-5
          "
        >
          <h2
            className="
              text-xl
              font-semibold

              text-(--text-primary)
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-xl

              p-2

              text-(--text-secondary)

              transition

              hover:bg-black/10
              dark:hover:bg-white/10
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;