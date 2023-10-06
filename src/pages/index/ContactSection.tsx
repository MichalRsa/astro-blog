import type { ReactElement } from "react";
import type { data } from "./../../consts.ts";
import { SectionTitle } from "../../components/SectionTitle.tsx";

export const ContactSection = ({
  socialIcons,
}: {
  socialIcons: typeof data.socialIcons;
}): ReactElement => {
  return (
    <section id="find-me">
      <SectionTitle title="Find me on" />
      <ul className="flex flex-wrap justify-center items-stretch md:w-10/12 w-full m-auto">
        {socialIcons.map((icon, index) => (
          <li key={index} className="sm:m-2">
            <a target="_blank" href={icon.link} rel="noreferrer">
              <div className="px-12 py-8 h-full hover:bg-orange-400 hover:bg-opacity-20 rounded-3xl flex items-center">
                <img
                  src={`/${icon.src}`}
                  alt={`${icon.alt} icon`}
                  title={icon.alt}
                  className="object-cover w-8"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
