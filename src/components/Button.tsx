import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text?: string;
  fontSize?: string;
  classes?: string;
  type?: "primary" | "secondary";
  withShadow?: boolean;
}

export const Button = ({
  text = "Let's work together",
  type = "primary",
  withShadow = false,
  fontSize,
  classes,
}: ButtonProps): ReactElement => (
  <button
    className={twMerge(
      "bg-primary-500 text-secondary-500 text-xl capitalize py-3 px-12 rounded-lg",
      type === "secondary" && "bg-transparent border-primary-500 border-4",
      fontSize,
      classes,
      withShadow && "shadow-2xl shadow-primary-500",
    )}
  >
    {text}
  </button>
);
