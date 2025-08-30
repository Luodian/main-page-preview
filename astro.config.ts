import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig, envField } from "astro/config";
import { siteConfig } from "./src/site.config";

// Remark plugins
import remarkDirective from "remark-directive"; /* handle ::: directives as nodes */
import { remarkAdmonitions } from "./src/plugins/remark-admonitions"; /* add admonitions */
import { remarkReadingTime } from "./src/plugins/remark-reading-time";
import { remarkCollapsible } from "./src/plugins/remark-collapsible"; /* add collapsible sections */
import remarkMath from "remark-math"; /* handle LaTeX math */

// Rehype plugins
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeKatex from "rehype-katex"; /* render LaTeX math */

import rehypePrettyCode from "rehype-pretty-code";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["webmention.io"],
    service: process.env.VERCEL
      ? {
          // Default Sharp service (used automatically on Vercel)
          entrypoint: "astro/assets/services/sharp",
        }
      : {
          // No-op service (for local dev or special cases)
          entrypoint: "astro/assets/services/noop",
        },
  },
  integrations: [
    icon(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap(),
    mdx(),
    robotsTxt(),
    webmanifest({
      // See: https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md
      /**
       * required
       **/
      name: siteConfig.title,
      /**
       * optional
       **/
      // short_name: "Astro_Citrus",
      description: siteConfig.description,
      lang: siteConfig.lang,
      icon: "public/assets/logo.png", // the source for generating favicon & icons
      icons: [
        {
          src: "icons/apple-touch-icon.png", // used in src/components/BaseHead.astro L:26
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      start_url: "/",
      background_color: "#1d1f21",
      theme_color: "#2bbc8a",
      display: "standalone",
      config: {
        insertFaviconLinks: false,
        insertThemeColorMeta: false,
        insertManifestLink: false,
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,

    remarkPlugins: [
      remarkReadingTime,
      remarkDirective,
      remarkAdmonitions,
      remarkCollapsible,
      remarkMath,
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
      footnoteBackContent: "⤴",
    },

    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow", "noreferrer"],
          target: "_blank",
        },
      ],

      [
        rehypePrettyCode,
        {
          theme: {
            light: "rose-pine-dawn", // after changing the theme, the server needs to be restarted
            dark: "rose-pine", // after changing the theme, the server needs to be restarted
          },

          transformers: [transformerNotationDiff(), transformerMetaHighlight()],
        },
      ],
      rehypeUnwrapImages,
      rehypeKatex,
    ],
  },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  // ! Please remember to replace the following site property with your own domain
  site: "http://astrocitrus.artemkutsan.pp.ua/",
  vite: {
    build: {
      sourcemap: true, // Source maps generation
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [rawFonts([".ttf", ".woff"])],
  },
  env: {
    schema: {
      WEBMENTION_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      WEBMENTION_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      WEBMENTION_PINGBACK: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  server: {
    // port: 1234,
    host: true,
  },
});

function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    // @ts-expect-error:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
