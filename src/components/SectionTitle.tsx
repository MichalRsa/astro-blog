import clsx from "clsx";
import type { ReactElement } from "react";

interface SectionTitleProps {
  title: string;
  color?: "primary" | "secondary";
  underlineFullWidth?: boolean
}

export const SectionTitle = ({
  title,
  color = "secondary",
  underlineFullWidth = false
}: SectionTitleProps): ReactElement => {
  const titleColor = {
    primary: "border-primary-500 text-primary-500",
    secondary: "border-secondary-500 text-secondary-500",
  };

  return (
    <h2
      className={clsx(
        "mb-8  text-2xl md:text-4xl",
        underlineFullWidth ? 'border-b-2 pb-1' : 'underline decoration-2 underline-offset-8',
        titleColor[color],
      )}
    >
      {title}
    </h2>
  );
};
