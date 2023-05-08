import type { ReactElement } from "react";
import { SectionTitle } from "../../components/SectionTitle";

export const Timeline = (): ReactElement => {
  return (
    <section id="timeline">
      <SectionTitle title="Career Timeline" />
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="relative col-span-12 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:dark:bg-gray-700">
              <div className="flex flex-col sm:relative">
                <div className="absolute w-10 -translate-x-12 bg-white">
                  <img
                    src="/tech-icons/github.webp"
                    alt="skygate icon"
                    title="skygate icon"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold tracking-wide">
                  First commit pushed to Github
                </h2>
                <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                  Dec 2020
                </time>
                <p className="mt-3">
                  After 9 months of coding I push my first commits to Github
                  repo.
                </p>
              </div>
              <div className="flex flex-col relative">
                <div className="absolute w-10 -translate-x-12">
                  <img
                    src="/skygate.webp"
                    alt="skygate icon"
                    title="skygate icon"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl underline font-semibold tracking-wide">
                  <a
                    href="https://skygate.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sky Gate
                  </a>
                </h2>
                <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                  Nov 2021 - Oct 2022
                </time>
                <p className="mt-3">
                  Here I get real experience in writing web apps. I joined a
                  team of 3, as a Backend developer which tremendously improved
                  my backend skills. I was working on an indie food delivery
                  app, with real customers across multiple UK cities and daily
                  purchases. Using Koa.js and Postgres for the first time. I was
                  mainly supporting mobile Flutter devs, and writing
                  functionalities for a brand-new mobile app. I integrated
                  third-party API for bikers which delivered food to customers.
                  I gained experience with real-time functionalities eg.
                  webhooks that sent firebase notifications triggered by a
                  delivery person based on his geolocation. Here I experienced
                  the first production crash, hotfixes, debugging
                  customers&apos; payments, and all the wild stuff
                </p>
              </div>
              <div className="flex flex-col relative">
                <div className="w-10 absolute -translate-x-12">
                  <img
                    src="/bh-logo.png"
                    alt="skygate icon"
                    title="skygate icon"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl underline font-semibold tracking-wide">
                  <a
                    href="https://brainhub.eu/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Brainhub
                  </a>
                </h2>
                <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                  Nov 2022 - Currently
                </time>
                <p className="mt-3">
                  I was very excited to join this company known for its
                  craftsmanship, and a lot of senior devs on board with huge
                  experience.
                  <br />
                  My first time where I worked on the app from its beginning.
                  Working as a React developer on an e-commerce site for the
                  construction industry in a multinational team of POs, devs,
                  and designers. Implementing views for admin panels with
                  multi-step forms and data grids. I gained a lot of experience
                  when planning and consulting the mechanics of the app with BE
                  devs and designers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
