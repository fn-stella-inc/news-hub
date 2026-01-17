// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://lc-nixos.space",
  output: "server",
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/api/"),
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["lucide-astro"],
    },
  },
});
