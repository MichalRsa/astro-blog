import type { ReactElement } from "react";
import type { data } from "./../../consts.ts";

export const MainSection = ({
  favIcons,
}: {
  favIcons: typeof data.favIcons;
}): ReactElement => {
  return (
    <div className="flex flex-col self-stretch max-w-full z-10">
      <div className="rounded-3xl md:bg-slate-100 md:pr-6 md:p-8 lg:min-w-[460px] sm:min-w-[276px] md:mr-[-150px] lg:mr-0">
        <h1 className="lg:mb-16 lg:text-5xl mb-2 text-2xl font-bold">
          Hi! I am <br />
          Michał Rosa
        </h1>
        <p className="text-xl lg:text-3xl mb-2">
          I make web apps with <br />
          modern frontend frameworks and node.js
        </p>
      </div>
      <div className="flex-1 md:flex hidden flex-center flex-col">
        <p className="md:py-8 py-2 md:pl-8 text-2xl lg:text-3xl">
          Favorite stack
        </p>
        <ul className="flex flex-1 flex-wrap justify-center items-center">
          {favIcons.map((icon) => (
            <li key="" className="basis-[36%]">
              <div className="px-8 py-4 w-36 m-auto">
                <img
                  src={`/tech-icons/${icon.src}.webp`}
                  alt={`${icon.alt} icon`}
                  title="icon.alt"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
