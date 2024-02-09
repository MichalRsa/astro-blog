/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Oswald", "Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#fefbed",
          100: "#faf4c8",
          200: "#f8eeae",
          300: "#f5e789",
          400: "#f3e272",
          500: "#f0db4f",
          600: "#dac748",
          700: "#aa9b38",
          800: "#84782b",
          900: "#655c21",
        },
        secondary: {
          50: "#ebebea",
          100: "#bfc0bf",
          200: "#a1a1a0",
          300: "#767674",
          400: "#5b5c59",
          500: "#323330",
          600: "#2e2e2c",
          700: "#242422",
          800: "#1c1c1a",
          900: "#151514",
        },
        ternary: {
          50: "#fcfeff",
          100: "#f6fbff",
          200: "#f1f9ff",
          300: "#ebf6fe",
          400: "#e7f5fe",
          500: "#e1f2fe",
          600: "#cddce7",
          700: "#a0acb4",
          800: "#7c858c",
          900: "#5f666b",
        },
        success: {
          50: "#eff4ef",
          100: "#cedece",
          200: "#b7ceb6",
          300: "#96b794",
          400: "#81a980",
          500: "#629460",
          600: "#598757",
          700: "#466944",
          800: "#365135",
          900: "#293e28",
        },

        danger: {
          50: "#fceced",
          100: "#f5c3c7",
          200: "#f0a5ac",
          300: "#e97c86",
          400: "#e5636f",
          500: "#de3c4b",
          600: "#ca3744",
          700: "#9e2b35",
          800: "#7a2129",
          900: "#5d1920",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
