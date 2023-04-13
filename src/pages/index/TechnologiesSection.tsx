import type { ReactElement } from "react";
import { SectionTitle } from "../../components/SectionTitle.tsx";
import type { data } from "./../../consts.ts";

export const TechnologiesSection = ({
  techIcons,
}: {
  techIcons: typeof data.techIcons;
}): ReactElement => {
  return (
    <div>
      <SectionTitle title="Technologies I used in comercial projects" />
      <ul className="flex flex-wrap justify-center items-stretch w-full m-auto">
        {techIcons.map((icon, index) => (
          <li key={index} className="sm:m-8">
            <a target="_blank" href={icon.link} rel="noreferrer">
              <div className="px-4 py-2 h-full hover:bg-slate-50 rounded-3xl flex items-center">
                <img
                  src={`/tech-icons/${icon.src}.webp`}
                  alt={`${icon.alt} icon`}
                  title={icon.alt}
                  className="object-cover w-14"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
