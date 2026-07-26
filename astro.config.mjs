import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Update this to your custom domain once connected.
const site = process.env.SITE_URL ?? "https://keelibelotti.com";

export default defineConfig({
  site,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
