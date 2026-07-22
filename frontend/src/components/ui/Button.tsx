import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        "rounded-xl px-4 py-2 font-medium transition-all duration-200",
        "disabled:opacity-50 disabled:pointer-events-none",

        variant === "primary" &&
          "bg-linear-to-r from-blue-600 to-indigo-600 hover:brightness-110",

        variant === "secondary" &&
          "bg-slate-800 hover:bg-slate-700",

        variant === "ghost" &&
          "hover:bg-white/5",

        variant === "danger" &&
          "bg-red-600 hover:bg-red-700",

        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;