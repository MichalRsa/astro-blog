import type { ReactElement } from "react";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps): ReactElement => (
  <h2 className="text-3xl my-8">{title}</h2>
);
