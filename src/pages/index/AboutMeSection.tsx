import type { ReactElement } from "react";
import SectionTitle from "../../components/SectionTitle.astro";

export const AboutMeSection = (): ReactElement => {
  return (
    <section id="about-me">
      <SectionTitle title="About Me" />
      <p>
        <b>Self-taught Web Developer</b>, just enjoying writing code. I worked
        on several commercial projects with customers from Great Britain and
        Spain, developing both frontend and backend parts. Most proficient with
        React and its environment. Self-reliant at work, familiar with macOS and
        Linux. Confident in working with git/GitHub, CLI, CI/CD tools, and Cloud
        Computing services. Striving to stay up to date with bleeding edge
        technologies.
      </p>
    </section>
  );
};
