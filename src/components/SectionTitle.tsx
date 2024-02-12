import type { ReactElement } from "react";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps): ReactElement => (
  <h2 className="mb-8 text-2xl md:text-4xl underline decoration-2 underline-offset-8">
    {title}
  </h2>
);
