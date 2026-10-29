// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  // v7 の既定は JSX と同じ空白削除。v5 の HTML 圧縮に合わせる。
  compressHTML: true,
  integrations: [react()],
  redirects: {
    "/": "/2026",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
