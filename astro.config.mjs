// @ts-check
import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import solidJs from "@astrojs/solid-js"
import cloudflare from "@astrojs/cloudflare"
import config from "./config.mjs"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { spawnSync } from "child_process"

// https://astro.build/config
export default defineConfig({
  site: config.url,
  base: "/",
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  devToolbar: {
    enabled: false,
  },
  server: {
    host: "0.0.0.0",
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
  build: {},
  integrations: [
    configSchema(),
    solidJs(),
    starlight({
      title: "Prompter CLI",
      lastUpdated: true,
      expressiveCode: { themes: ["github-light", "github-dark"] },
      social: [
        { icon: "github", label: "GitHub", href: config.github },
      ],
      editLink: {
        baseUrl: config.githubDocs,
      },
      markdown: {
        headingLinks: false,
      },
      customCss: ["./src/styles/custom.css"],
      // logo: {
      //   light: "./src/assets/logo-light.svg",
      //   dark: "./src/assets/logo-dark.svg",
      //   replacesTitle: true,
      // },
      sidebar: [
        "intro",
        "usage",
        "configuration",
        "interactive-mode",
        "custom-templates",
        {
          label: "Commands",
          items: [
            "commands/prompts",
            "commands/add",
            "commands/list",
          ],
        },
        {
          label: "Advanced",
          items: [
            "advanced/template-syntax",
            "advanced/local-templates",
            "advanced/multiple-locations",
            "advanced/best-practices",
          ],
        },
        {
          label: "Reference",
          items: [
            "reference/config-file",
            "reference/flags",
            "reference/template-variables",
            "reference/examples",
          ],
        },
        "troubleshooting",
      ],
      components: {
        Hero: "./src/components/Hero.astro",
        Head: "./src/components/Head.astro",
        Header: "./src/components/Header.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      plugins: [
      ],
    }),
  ],
})

function configSchema() {
  return {
    name: "configSchema",
    hooks: {
      "astro:build:done": async () => {
        console.log("generating config schema")
        spawnSync(["./dist/config.json"])
      },
    },
  }
}
