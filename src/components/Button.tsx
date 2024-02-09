import type { ReactElement } from "react";
import clsx from "clsx";

interface ButtonProps {
  text?: string;
  fontSize?: string;
  classes?: string;
}

export const Button = ({
  text = "Let's work together",
  fontSize,
  classes,
}: ButtonProps): ReactElement => (
  <button
    className={clsx(
      "bg-primary-500 text-secondary-500 text-xl capitalize py-3 px-12 rounded-lg",
      fontSize,
      classes
    )}
  >
    {text}
  </button>
);
