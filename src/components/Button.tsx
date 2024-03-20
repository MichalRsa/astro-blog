import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text?: string;
  fontSize?: string;
  classes?: string;
  type?: "primary" | "secondary";
  withShadow?: boolean;
  href?: string;
}

export const Button = ({
  text = "Let's work together",
  type = "primary",
  withShadow = false,
  fontSize,
  classes,
  href,
}: ButtonProps): ReactElement => (
  <a
    className={twMerge(
      "text-center block w-fit transition-all bg-primary-500 text-secondary-500 text-xl capitalize py-1 px-4 md:py-3 md:px-12 rounded-lg hover:bg-primary-600 hover:scale-110 focus:outline-none focus:border-primary-900 focus:ring focus:ring-primary-900",
      type === "secondary" && "bg-transparent border-primary-500 border-4",
      fontSize,
      classes,
      withShadow && "shadow-2xl shadow-primary-500",
    )}
    href={href ?? ""}
  >
    {text}
  </a>
);
