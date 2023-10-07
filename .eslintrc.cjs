module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "plugin:react/recommended",
    // "standard-with-typescript",
    // "plugin:astro/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  // ignorePatterns: ['*.astro'],
  overrides: [
    {
      files: ["*.tsx", "*.ts"],

      extends: [
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier",
      ],
      rules: {
        // add any additional rules specific to .ts files
        "react/react-in-jsx-scope": "off",
      },
    },
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      extends: ["plugin:astro/recommended"],
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    // ...
  ],
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-console": 1,
  },
};
