// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  integrations: [react()],
  redirects: {
    "/": "/2026",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
