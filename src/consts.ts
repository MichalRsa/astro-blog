// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

const BASE_TITLE = "Michał Rosa Frontend developer | ";

export const TITLE = {
  HOME: BASE_TITLE + "Home",
  BLOG: BASE_TITLE + "Blog",
  FREELANCING: BASE_TITLE + "Freelancing",
  CONTACT_ME: BASE_TITLE + "Contact me",

  BLOG_POST: (description: string) => BASE_TITLE + description,
};

export const DESCRIPTION = {
  HOME: "Michał Rosa - Frontend developer, with commercial experience in making web apps using technologies like React.js, Node.js, and Express.js",
  BLOG: "Welcome to my blog! As a web developer proficient in JavaScript, TypeScript, React.js and Node.js. I share insightful articles, tutorials, and tips on these topics.",
  FREELANCING:
    "I build custom, responsive, acessible and editable webistes for small business.",
  CONTACT_ME:
    "Contact me if you need developer for your team or freelancer to make you website.",
};

export const data = {
  socialIcons: [
    {
      src: "linkedin.png",
      alt: "linkedin icon",
      link: "https://www.linkedin.com/in/rosa-michal/",
    },
    {
      src: "discord.png",
      alt: "x icon",
      link: "https://discord.com/channels/@me/1210565324693315644",
    },
    {
      src: "github.webp",
      alt: "github icon",
      link: "https://github.com/MichalRsa",
    },
  ],
  favIcons: [
    {
      src: "/src/images/tech-icons/react.webp",
      alt: "react",
    },
    {
      src: "/src/images/tech-icons/nextjs.png",
      alt: "nextjs",
    },
    {
      src: "/src/images/tech-icons/typescript.webp",
      alt: "typescript",
    },
    {
      src: "/src/images/tech-icons/node.webp",
      alt: "node.js",
    },
  ],
  techIcons: [
    {
      src: "postgresql",
      alt: "postgresql",
      link: "https://www.postgresql.org/",
    },
    {
      src: "express",
      alt: "express",
      link: "https://expressjs.com/",
    },
    {
      src: "react",
      alt: "react",
      link: "https://reactjs.org/",
    },
    {
      src: "node",
      alt: "node.js",
      link: "https://nodejs.org/",
    },

    {
      src: "typeorm",
      alt: "typeorm",
      link: "https://typeorm.io/",
    },
    {
      src: "typescript",
      alt: "typescript",
      link: "https://www.typescriptlang.org/",
    },
    {
      src: "vue",
      alt: "vue.js",
      link: "https://vuejs.org/",
    },
    {
      src: "firebase",
      alt: "firebase",
      link: "https://firebase.google.com/",
    },
    {
      src: "gcp",
      alt: "google cloud platform",
      link: "https://cloud.google.com/",
    },
    {
      src: "github",
      alt: "github",
      link: "https://github.com/",
    },
    {
      src: "ghactions",
      alt: "github actions",
      link: "https://github.com/features/actions",
    },
  ],
};
