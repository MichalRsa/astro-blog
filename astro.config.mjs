import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import partytown from "@astrojs/partytown";
const options = {
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    if (node.properties.className === undefined) node.properties.className = [];
    node.properties.className?.push("highlighted");
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://michalrosa.dev",
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind(),
    // partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  markdown: {
    syntaxHighlight: false,
    // Disable syntax built-in syntax hightlighting from astro
    extendDefaultPlugins: true,
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

