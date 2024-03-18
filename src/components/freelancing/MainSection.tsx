import type { ReactElement } from "react";
import { Button } from "../../components/Button";

export const MainSection = (): ReactElement => {
  return (
    <section className="mx-auto lg:px-12 px-2 overflow-hidden">
      <div className="max-lg:relative lg:h-screen items-center lg:flex  sm:py-24 pt-24 pb-16 gap-x-4 justify-center">
        <div className="md:pr-6 md:p-8 max-[520px]:max-w-[18rem] max-lg:max-w-sm lg:min-w-[460px] sm:min-w-[276px]">
          <h1 className="lg:mb-16 lg:text-5xl mb-2 text-2xl font-bold">
            Creating appealing websites
            <br />
            for small business
          </h1>
          <p className="text-xl lg:text-3xl lg:mb-16 mb-2 max-[432px]:mb-[200px]">
            I am a software developer with 4 years of experience who will
            design, create, and make your website fast and editable.
          </p>
          <div className="lg:mb-16 mb-2">
            <Button
              href="/contact-me/hire-freelancer"
              withShadow
              text="Contact me"
            />
          </div>
        </div>
        <div className="max-lg:scale-[.7] max-lg:w-[600px] max-lg:absolute max-[720px]:right-[-93px] max-[620px]:right-[-192px] relative z-[-10] right-0 top-0 max-w-lg rounded-3xl overflow-hidden lg:min-w-[512px] h-[500px] bg-ternary-200 max-[432px]:top-[174px]">
          <div className="text-center">placeholder</div>
        </div>
      </div>
    </section>
  );
};
