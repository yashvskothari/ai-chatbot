import clsx from "clsx";
import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className, ...props }: CardProps) => {
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
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;