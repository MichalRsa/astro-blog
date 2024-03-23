import { type ReactElement, useState } from "react";
import { Button } from "../components/Button.tsx";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
const links = [
  {
    label: "about me",
    url: "/",
  },
  {
    label: "freelancing",
    url: "/freelancing",
  },
  {
    label: "blog",
    url: "/blog",
  },
];

export const Header = (): ReactElement => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClick = (): void => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header>
      <nav className="fixed z-50 flex w-full flex-col-reverse max-lg:bottom-0 lg:top-0">
        <div className="z-50 box-border flex items-center justify-between bg-secondary-500 px-4 py-2 text-ternary-500 sm:justify-center sm:px-12 sm:py-2  lg:justify-between">
          <a href="/" className=" max-lg:hidden">
            <h2 className="text-3xl">Michał Rosa | Frontend Developer</h2>
          </a>
          {isMobile && (
            <button
              aria-label="open navigation menu"
              className={clsx("hamburger-menu", showMobileMenu && "active")}
              onClick={() => {
                handleClick();
              }}
            >
              <span
                className={clsx("hamburger-menu", showMobileMenu && "active")}
              />
            </button>
          )}
          <ul className="z-50 flex items-center">
            {!isMobile &&
              links.map((link) => (
                <li className="mx-2 text-base capitalize" key={link.label}>
                  <a
                    href={link.url}
                    className="p-3 hover:underline hover:decoration-2 hover:underline-offset-8"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            <li className="mx-2">
              <Button
                text="Contact Me"
                fontSize="text-base"
                classes={clsx(isMobile && "py-1 px-6")}
                href="/contact-me"
              />
            </li>
          </ul>
        </div>
        {isMobile && (
          <ul
            className={clsx(
              showMobileMenu && "active",
              "dropdown",
              "bg-secondary-400 text-center",
            )}
          >
            {links.map((link) => (
              <li
                className="p-3 text-base capitalize text-ternary-500"
                key={link.label}
              >
                <a
                  href={link.url}
                  className="block py-2 hover:underline hover:decoration-2 hover:underline-offset-8"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};
