import { type ReactElement, useState } from 'react';
import { Button } from '../components/Button.tsx';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
const links = [
  {
    label: 'about me',
    url: '/',
  },
  {
    label: 'blog',
    url: '/blog/',
  },
];

export const Header = (): ReactElement => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClick = (): void => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header>
      <nav className="fixed z-50 flex w-full flex-col-reverse max-lg:bottom-0 lg:top-0">
        <div className="z-50 box-border flex items-center justify-between bg-secondary-500 px-4 py-2 text-ternary-500 sm:justify-center sm:px-12 sm:py-5  lg:justify-between">
          <h2 className="text-3xl max-lg:hidden">
            Michał Rosa | Frontend Developer
          </h2>
          {isMobile && (
            <button
              className={clsx('hamburger-menu', showMobileMenu && 'active')}
              onClick={() => {
                handleClick();
              }}
            >
              <span
                className={clsx('hamburger-menu', showMobileMenu && 'active')}
              />
            </button>
          )}
          <ul className="z-50 flex items-center">
            {!isMobile &&
              links.map((link) => (
                <li className="mx-2 text-xl capitalize" key={link.label}>
                  <a
                    href={link.url}
                    className="p-3 hover:underline hover:decoration-2 hover:underline-offset-8"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            <li className="mx-2 text-xl">
              <Button
                text="Let's work together"
                fontSize="text-xl"
                classes={clsx(isMobile && 'py-1 px-6')}
              />
            </li>
          </ul>
        </div>
        {isMobile && (
          <ul
            className={clsx(
              showMobileMenu && 'active',
              'dropdown',
              'bg-secondary-400 text-center',
            )}
          >
            {links.map((link) => (
              <li
                className="p-3 text-xl capitalize text-ternary-500"
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
