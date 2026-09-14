import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "out/**",
      ".next/**",
      ".vercel/**",
      "node_modules/**",
      "scripts/pages-next-on-pages-shim/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  prettier,
);
