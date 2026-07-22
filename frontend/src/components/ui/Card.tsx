import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl",
        "border border-white/10",
        "bg-slate-900/70",
        "backdrop-blur-xl",
        "shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;